# System Design Document review

Review date: 1 October 2026. Reviewed document: [System Design Document: Maya and Petal MVP](../06-system-design-document.md).

## Assessment and review basis

The SDD follows the confirmed Maya–Petal boundary, separate data ownership, starting stack, text/document scope, and Maya-first build sequence. It is useful as an architecture overview. It needs the behavioral corrections below before the affected API contracts, conversation coordinator, dispatcher, and data-lifecycle workflow are treated as implementation-ready.

This review cross-checked the Maya and Petal requirements, Session 4 architecture, delivery roadmap, conversation decision registers, and the engineering implementation blueprint. Findings describe gaps in the written design; there is no application implementation in this workspace to test. Proposed remedies are engineering recommendations, not new confirmed product decisions. Numerical service targets, exact retention periods, and model selection are appropriately still open.

P1 means the affected implementation should resolve the issue before being frozen because it can break a confirmed requirement or create an authorization/reliability failure. P2 means the design needs more detail to make implementation and verification consistent. These priorities do not prevent a bounded Maya prototype or provider feasibility spike.

## Findings

### R1 — P1: Accepted events can become permanently unscheduled

Location: SDD section 6.1, lines 102–104; also the outbound-intent path at lines 106–107.

The flow persists an inbound event, acknowledges the provider, and then schedules processing. A crash after acknowledgement but before task creation leaves a durable message with no worker scheduled to process it. A duplicate webhook mapping to the existing event does not repair that gap unless replay behavior is explicitly defined. The same gap exists between committing an outbound intent and creating its dispatch task, and between committing a case and scheduling its alert/reminder.

Recommended change: persist the event and a work/outbox record in the same database transaction. A recoverable publisher schedules Cloud Tasks from that record, with deterministic task identity and retry after uncertain task creation. A pending-work scan must also recover work whose task exhausted retries. The task is a wakeup; the database remains authoritative for whether work is still required. Google guarantees at-least-once task delivery only after a task has been successfully added; handlers must tolerate duplicate execution. [Cloud Tasks overview](https://docs.cloud.google.com/tasks/docs/dual-overview).

Acceptance check: terminate the process after each database commit and before task creation. On recovery, every accepted message and authorized intent is either processed once internally or appears in an explicit failed/manual-review state.

### R2 — P1: A final ownership check does not close the takeover/send race

Location: SDD section 6.1, line 107; invariant 5 at line 15.

A dispatcher can check ownership version 7, a professional can take over and commit version 8, and the dispatcher can then submit the version-7 reply. The design promises that takeover prevents pending Maya dispatch, but does not define the atomic boundary between the final check, takeover, and provider submission. Version comparison alone cannot enforce the promise across that interval.

Recommended change: define one per-conversation arbitration mechanism used by both takeover and dispatch. Document the point at which a send becomes in flight and how takeover is reported when a provider request has already started or has an unknown outcome. An implementation can use a carefully bounded dispatch lock/barrier, but must specify crash recovery and avoid holding a long model request inside a database transaction. A committed takeover must prevent new autonomous dispatch; an already-started provider request must be shown honestly as in flight or unknown.

Acceptance check: pause a dispatcher immediately after its final authorization check, trigger takeover, then resume it. Verify the documented winner and ensure the professional is not told that an in-flight message was cancelled.

### R3 — P1: Escalation omits the client acknowledgement and its authority

Location: SDD section 6.2, line 130, and turn-result contract at line 91.

Both product scopes require Maya to acknowledge a review-needed request promptly, then pause. The SDD escalation flow changes ownership and alerts the professional, but creates no client acknowledgement. Its result contract also leaves unclear whether an `escalate` result can include that acknowledgement. If an ordinary reply is generated under the previous ownership version, the escalation's version increment will make it stale. A similar ambiguity affects a professional-authorized one-off reply while Maya remains paused.

Recommended change: define an escalation result with a reason and permitted acknowledgement content. In one Petal transaction, commit the case, ownership transition, acknowledgement intent, and professional-alert work. Distinguish autonomous Maya replies, escalation receipts, and professional-authorized replies in outbound authority. Specify which paused-state sends remain valid and whether a one-off direction changes ownership. Preserve the separate explicit return-of-control action.

Acceptance check: an unsupported service question produces one client acknowledgement, one case, and one initial professional alert even after replay; subsequent client messages remain recorded without autonomous Maya responses. A one-off owner-authorized reply does not silently resume Maya.

### R4 — P1: Professional alerts lack independent channel-window and consent state

Location: SDD section 6.2, line 130; minimum records at lines 75–79.

The SDD uses a separate Petal control number, but treats channel eligibility as a generic check without specifying its persistent state or fallback. A client's message to the professional's business number does not open a messaging window between the Petal control number and the professional. Consequently an initial escalation or later reminder can require an approved template even while the client conversation is active. The current policy requires approved templates outside the 24-hour customer service window and requires honoring opt-out requests. [WhatsApp Business Messaging Policy](https://business.whatsapp.com/policy).

Recommended change: keep last inbound activity, window eligibility, opt-in/opt-out evidence, and template status per sending channel and recipient. Define initial-alert and reminder templates for the control channel, collect the professional's applicable messaging consent during onboarding, and define what the inbox shows when an alert cannot be sent. Reminder tasks must recheck whether the case is still unanswered and whether the channel can send. Do not use the client's window as evidence for the professional control channel.

Acceptance check: escalate when the professional has never messaged the control number, when its window has expired, when the template is unavailable, and when the case was answered just before a reminder task executes.

### R5 — P1: Correction and deletion can be undone by in-flight work

Location: SDD section 8, line 152, and relationship-memory record at line 72.

The document requires correction/deletion but defines no runtime boundary for active jobs. A turn can read old relationship context, the owner can correct or delete it, and the turn can then write that old fact back or dispatch a response based on it. An older transcript retained by Petal can also reintroduce a corrected fact during later context assembly. Ownership version does not detect a data correction when conversation control has not changed.

Recommended change: add a relationship data revision or epoch that changes on correction/deletion and is captured by turns and memory writes. Reject or recompute stale results. A deletion workflow needs a tombstone or processing block, cancellation of pending work, coordinated service acknowledgements, and prevention of re-extraction from deleted/corrected sources. Specify invalidation of summaries and derived indexes. Exact retention periods can remain open while this concurrency behavior is defined.

Acceptance check: correct or delete memory during generation and during retry. The old fact must not reappear in a memory write, summary, retrieval result, or new client response after the operation's documented completion boundary.

### R6 — P2: Serialization does not define message order or lease fencing

Location: SDD section 7, line 146.

A per-conversation mutex prevents simultaneous workers but does not determine which event runs first. If tasks for accepted messages A and B execute in reverse order, B can acquire the lock and reply before A. If a lease expires during a slow Maya request, another worker can start and the older worker can later commit unless its processing lease is fenced. Ownership version changes only on control transitions, so it does not distinguish those two workers.

Recommended change: assign a durable accepted sequence and process the next eligible event from database state, regardless of which task wakes the worker. Define the handling of genuinely late provider events without promising knowledge of messages not yet received. Use a processing token that changes when a lease is reassigned, and reject commits from an older token. Ensure outbound replies preserve the chosen conversation order. Current Cloud Tasks documentation confirms that execution ordering is not guaranteed and duplicate execution can occur. [Cloud Tasks limitations](https://docs.cloud.google.com/tasks/docs/common-pitfalls).

Acceptance check: deliver task B before task A; expire A's worker lease while Maya is running; then complete both workers. The transcript and memory must follow the chosen sequence, with only the current worker allowed to commit.

### R7 — P2: Maya has no defined continuity feed for human replies and actual outcomes

Location: SDD contract, lines 91–94, and runtime flow at lines 104–105.

Petal owns human replies, messages received during takeover, commitment confirmations, and delivery outcomes. Maya is called for active client turns, but the contract contains no defined way to ingest the other interactions into continuing relationship memory. Recent context might temporarily include them, but the SDD does not require that inclusion or a later durable memory update. Maya could eventually forget a professional's confirmation or retain a proposed reply as if it had actually been sent.

Recommended change: define an idempotent scoped interaction/outcome feed or equivalent reconciliation operation. Include professional replies, relevant client messages received during human control, confirmed commitments, and send results. Separate observed client facts, owner-approved facts, proposals, submitted messages, and confirmed outcomes. Feed these events to memory without authorizing an autonomous response during human control. Also define the professional-supplied relationship-brief creation operation required by the Petal scope.

Acceptance check: a professional answers a question during takeover, the conversation continues beyond the recent-transcript slice, and Maya still recalls the relevant sourced outcome. A cancelled or failed proposal is never remembered as a completed action.

### R8 — P2: The send state model has no place for an unknown provider outcome

Location: SDD section 7, line 146, and dispatch flow at line 107.

The SDD requires reconciliation before retry, but defines only submitted/delivered/failed language around sending. If a provider accepts a message and the HTTP response is lost, Petal may have neither a confirmed failure nor the provider message ID needed for a status match. No reconciliation operation or recovery rule is specified. Local idempotency keys cannot, by themselves, make external delivery exactly once or prove that it occurred at least once.

Recommended change: define a persistent `submission_unknown` state and durable send-attempt identity. During the Meta/partner feasibility spike, verify how callbacks or supported status operations correlate an ambiguous attempt, including one without a returned provider ID. Do not assume a lookup API exists. Specify a bounded reconciliation period, manual-review behavior when uncertainty remains, and monotonic handling of duplicate or late receipts. Never automatically resend an unresolved attempt merely because a task retries.

Acceptance check: simulate provider acceptance followed by connection loss. Verify that the attempt becomes unknown, replay does not duplicate it, and a late correlated receipt resolves it according to the adapter's demonstrated capabilities.

Verification limit: attempts to open Meta's direct message-reference pages during this review returned HTTP 429. This review does not assert a current Meta lookup or provider-idempotency capability.

### R9 — P2: Commitment confirmations need immutable action identity and consumption rules

Location: SDD section 6.2, line 132, and approval/commitment record at line 80.

Recording the exact action and recipient is a good start, but the SDD does not state what happens when a proposal is replaced or a confirmation is replayed. A case can contain several pending proposals; a generic confirmation must not approve whichever action happens to be current. A repeated confirmation must not reserve the same resource or create the commitment twice.

Recommended change: bind confirmation to an immutable action ID and revision/content digest, professional, client, recipient, and case. Record the exact proposal shown to the professional, its expiry and current validity, and a single consumption/execution record. Changed proposals need fresh confirmation. Commit approval consumption, resource checks, commitment state, and resulting outbound work transactionally where they share Petal storage.

Acceptance check: replay the same approval, replace a proposal before confirmation, and confirm two proposals in one case. Only the specifically approved, still-valid action may execute once internally.

## Smaller corrections and missing design coverage

- Invariant 2 at SDD line 12 says only approved knowledge can inform a live response, while section 6.1 correctly includes client messages and private memory. Reword it to require approved sources for service facts while permitting scoped client context as context or attributed claims.
- The turn result should identify the knowledge and permission revisions used. Petal's required current-permission check needs a Maya validation operation or other documented authority mechanism, with defined behavior after a publication or revocation. The same principle applies to document approval checks across the service boundary.
- Define the Maya-only test interface and caller/coordinator seam so takeover can be demonstrated before Petal implementation. Maya need not depend on WhatsApp cases to pass its gate.
- Add the guided go-live flow and its server-side readiness state: approved profile, approved knowledge, published persona, tested connection, and successful handoff. The SDD currently names `go-live state` without defining how the checks are recorded or revalidated after a relevant change.
- Add persona/knowledge lifecycle transitions and state the exact revision tested and approved. Define whether restoration creates a new publication revision pointing to earlier content. Also specify bounded document ingestion, searchable extraction, access checks, and how uploaded instructions remain untrusted content.
- Attach an operation/error matrix and requirement-to-test mapping when the contract is frozen. The current verification table names important scenarios but does not yet define their observable expected outcomes.

## Recommended revision order

1. Resolve durable scheduling, conversation ordering, takeover arbitration, and the escalation authority rules together; these define the coordinator and dispatcher contract.
2. Add the control-channel messaging state and immutable case/action binding.
3. Define Maya interaction/outcome ingestion and correction/deletion invalidation, then finish the scoped API contract.
4. Define ambiguous-send recovery from provider feasibility evidence; add the lifecycle/go-live flows and acceptance cases.

The engineering implementation blueprint repeats several of the same flows. Update its affected sections after the revised SDD is reviewed so the codebase plan and behavioral contract remain consistent.
