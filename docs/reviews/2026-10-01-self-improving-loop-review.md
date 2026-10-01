# Self-improving loop specification: integration review

Reviewed: 1 October 2026.

Source: the full user-supplied text of *Self improving loop for the Petal MVP*, version 1.0, “Proposed implementation,” sections 1–17. The original DOCX's layout and embedded diagram were not evaluated. Comparison sources: current documents 01–06, the engineering implementation blueprint, conversation notes, and the landing frontend's Markdown copies.

## Assessment

The source describes a complete, bounded improvement workflow and correctly separates automatic proposal/testing from human publication, private memory from standing knowledge, and operational failures from behavior improvements. Its scope is consistent with the user's later request to move the loop into the MVP.

The existing project documents are older on this point: the story calls proposals a future capability, the blueprint describes RRSI-inspired improvement as later research, and the MVP gates omit a complete loop. Those references require targeted updates. Most original engineering details are useful proposals; the following conflicts need reconciliation before implementation.

## Findings and resolutions

| ID | Priority | Source location and issue | Resolution in Document 07 |
|---|---|---|---|
| SI-R1 | P1 | §8: a five-second dispatch-validation token permits a pre-publication result to authorize a later send. The current SDD §§7.3/8.2 uses coordinated holds to prevent new stale dispatch claims after a standing change completes. | Reuse fresh manifest validation and the existing mutation barrier. Only a dispatch attempt atomically claimed before the hold is already in flight. No five-second stale-authority exception or new token endpoint. |
| SI-R2 | P1 | §8: automatic rollback activates prior content under a system incident actor, while the source's main decision and current MVP require owner-approved publication. Earlier content can also contain revoked sources or invalid permissions. | Automatic safety holds can stop affected autonomous processing. An explicit owner restore creates a new publication under current source, permission, deletion and readiness checks. No unattended content activation. |
| SI-R3 | P1 | §§1/8/9: a new persona-release pointer and epoch could become a second authority alongside existing persona publication and independent knowledge revisions. A composite manifest alone does not make multiple services or artifacts atomic. | Record an effective configuration manifest referencing existing publication, knowledge revision, retrieval-settings digest and runtime build. One candidate changes one category through its existing lifecycle. The adoption record is provenance, not a competing mutable pointer. |
| SI-R4 | P1 | §§6/16: a target uplift such as 6/10 to 9/10 can reward answering unsupported questions if baseline handoff is treated as incorrect. Fixed aggregate thresholds and model judges also cannot establish general safety. | Correct unsupported handoff remains a passing authority behavior. Separately measure useful supported answer coverage after authoritative knowledge is added. Require all hard gates, no critical regressions, repeated trials, human review and explicit uncertainty. Target counts are pilot decision aids. |
| SI-R5 | P2 | §§3/10/11: signals, actor references and learning outbox are proposed anew without access to the SDD's ordered canonical feed, source revisions, work records, idempotency and fencing. | Reuse existing durable feed/work contracts. Add explicit owner feedback and improvement-specific records only. Duplicate provider events, copied case feedback and retries do not inflate evidence. Unknown submission/delivery remains unknown. |
| SI-R6 | P2 | §§4/5/12: the source includes allowlisted retrieval tuning with professional and engineering review. Reducing the loop to knowledge/wording would omit an explicitly proposed category. | Retain persona-scoped tag/ranking candidates with exact dual review. Ranking settings are immutable persona configuration; tags use knowledge approval. SQL scope filters, algorithms, tools and credentials remain fixed application controls. |
| SI-R7 | P2 | §§6/13: the full fixture plan and repeated/model-graded trials may not fit US$2 per run, US$10 per persona/week or the chosen provider's latency. The values are proposed, not measured. | Preserve them as source proposals to benchmark. Reserve/charge all attempted calls and retries, enforce absolute budgets and mark partial suites incomplete. Do not truncate a suite and call it a pass. Missing caps keep model work paused. |
| SI-R8 | P2 | §14: source retention defaults and minimal summaries are sensible proposals, but all derivatives and already adopted changes need source-withdrawal/deletion handling. Name removal is not sufficient anonymization. | Store private evidence separately, require reviewed source-free summaries for improvement model calls, use synthetic tests, and track dependency invalidation through jobs/candidates/adoptions. Reapply deletion ledgers before restore. Final retention/purpose policy remains pre-pilot work. |
| SI-R9 | P2 | §§15/16: the 17–23 day estimate assumes already implemented platform foundations. This workspace has documentation and a landing frontend; the roadmap's original deadline excludes this added loop. | Treat the estimate as conditional historical planning input. Add loop work to Maya and integrated gates and reforecast after dependency/effort review. Require a real complete trace for every pilot persona, separately from synthetic demonstrations. |

## Preserved from the source

- Human-approved configuration improvement with no model-weight training or production-code rewriting.
- Explicit correction scope: case/reply, relationship or standing professional information.
- One open candidate per persona; five drafts/week; a daily, capped, 14-day scan; verified-case thresholds; rejection suppression and one automatic revision.
- Separate candidate progress and current/stale/withdrawn validity, immutable candidate/report approvals and no silent rebasing.
- Protected functional and adversarial suites, fictional fixtures, independently owned graders, repeated trials and human review.
- Workspace learning review, one release/configuration at a time, source provenance and restore limitations.
- Seven-day/30-turn observation with up to 21 days for sparse traffic and an explicit insufficient-evidence result.
- Scoped purpose/retention controls, bounded background queues and full pilot-loop completion evidence.

All numerical settings remain proposed. This review does not turn them into confirmed product promises, choose a model provider, claim legal compliance, or claim tests have run.

## Documentation changes

The integrated design is [07 — Self-Improving Loop: Design and MVP Scope](../07-self-improving-loop-design-and-mvp-scope.md). Documents 01–06, the blueprint and conversation notes need only scope references, service/lifecycle integration and gate alignment. The landing frontend currently consumes copies of documents 01 and 02; those copies must be synchronized and their build verified.

The existing context, client-message and deployment diagrams remain logical views of their respective paths. Document 07 adds the separate background improvement flow; no change to the client-facing WhatsApp topology is required.
