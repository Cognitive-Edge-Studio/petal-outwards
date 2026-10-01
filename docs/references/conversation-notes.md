# Conversation notes

Working notes for our discussion of an AI character with a shared identity, private relationships, memory, and gradual growth. Update this file as the conversation develops; keep decisions separate from proposals and open questions.

## Reference

- [One Self, Many Faces](https://claude.ai/artifact/3kvkcjiCU6W2ubLdKMqj5L), discussed on September 29, 2026.
- The artifact proposes a layered character architecture: a shared core identity, evolving knowledge and skills, private histories for each relationship, and an agenda for commitments. Fast classifiers guide conversation handling; a slower language model generates replies; a separate consolidation process proposes longer-term changes.

## Decisions and current direction

- Whether the character should change what she believes will be decided later. No choice has been made between fixed beliefs and evolving beliefs.
- The user finds this question interesting and wants it preserved for further discussion.

## Open topic: growth, beliefs, and continuity

**Question:** Should her core values remain fixed while her understanding deepens, or should experience be able to change what she believes?

Related questions to revisit:

- What distinguishes improving skills and judgment from changing identity?
- If beliefs may change, who defines the boundaries and approves changes?
- What evidence would justify a change, and how would we preserve continuity over time?
- How do we distinguish genuine growth from adapting to the loudest users or pleasing an evaluator?

**Status:** Deferred for later discussion.

## Initial analysis — discussion points, not decisions

- Separating shared identity from private relationship histories is a promising way to personalize behavior without letting each conversation rewrite the character.
- The artifact combines Pi, Laya/Jev, and RRSI into a proposed character architecture. Their technical capabilities do not by themselves demonstrate successful character growth.
- Defining "better" is the central unresolved issue. Memory accuracy, promise keeping, and task performance are easier to evaluate than becoming "more herself."
- A classifier used as a conscience can inherit the assumptions and biases of its labels. Calibrated confidence does not establish that a moral judgment is sound.
- Consistency and privacy need separate checks. A reply may align with the character's principles while containing information that other people should never see.
- Removing names from information learned across relationships may still leave identifying details. Shared learning needs explicit privacy boundaries.

## Technical references checked

- [Pi](https://pi.dev/): extensible harness, context management, and conversation trees.
- [Laya](https://github.com/NandhaKishorM/laya): typed classification and scoring decisions.
- [RRSI](https://regularized-rsi.com/): regularized harness improvement and evaluation on held-out tasks.

## Platform concept: professional personas over WhatsApp

### User's proposed direction

- The platform supports multiple professions; the initial concept is not restricted to a particular profession.
- Professionals have profiles on the platform and can manage their own persona, data, and information.
- Users can view an overview of a professional. Where and how they discover that overview is not yet specified.
- A platform where users reach professionals for services, initially through WhatsApp for simplicity.
- WhatsApp is the initial user communication interface, with integration through the WhatsApp API as the intended direction. API setup and implementation have not been discussed or validated.
- Maya can manage client interactions on a professional's behalf. The later Session 2 decision removes absence as the required trigger: Maya evaluates incoming messages immediately and responds according to the question and persona settings.
- Proposed capabilities include replying to messages, creating and forwarding documents, sharing information, and sending voice replies.
- The persona should support roughly 100 concurrent interactions. This is a desired capability, not a verified capacity.
- Professionals need mechanisms to manage their persona's information, configuration, and data.
- Proper onboarding, technical details, and implementation mechanisms are deferred.
- The user subsequently asked for architecture. A conceptual technical proposal is now recorded in [architecture.md](architecture.md); technology selection and implementation are not finalized, and onboarding remains deferred.

### Analysis and proposals — not settled decisions

- The artifact's layered identity model fits this concept, with the professional supplying the persona's identity and authority boundaries.
- Within a professional's persona, different client relationships can have different tone and context while sharing accurate service information and authorized policies.
- Across different professionals, identities, private data, and authority need to remain separate, even if the platform shares underlying software or models.
- Add a delegation layer to the artifact's concept: what the persona may communicate, create, send, or commit to independently, and what requires the professional's review.
- Distinguish communication capacity from service capacity. Many parallel conversations must respect the professional's shared availability and existing commitments.
- Define growth initially in terms of service quality: accurate answers, useful intake, correct documents, reliable commitments, and effective handoff. Whether beliefs evolve remains deferred.
- Make representation clear to clients, including in voice interactions; the user has not requested voice cloning or impersonation.
- Professional takeover should preserve the conversation, documents, pending requests, and commitments made by the persona.

### Open product questions

- How are Maya's immediate-response, review, and human-takeover rules configured, and how does the professional resume a conversation?
- How much authority should a professional be able to delegate to their persona?
- Which actions may run independently, which need review, and which should always be handled by the professional?
- How should clients experience a transition between the persona and the professional?

## Architecture discussion

- See [the proposed architecture](architecture.md) for components, message flow, data boundaries, parallel processing, documents/voice, and handoff.
- Proposed starting shape: a modular application backend with background workers, private state per professional and client, and a single controlled outbound messaging path.
- Persona configuration, professional-approved knowledge, client memory, and operational commitments are separate records.
- Concurrent conversations run independently, with sequential processing within each conversation and shared resource checks for availability.
- Human takeover changes conversation ownership and prevents obsolete persona jobs from sending afterward.
- The WhatsApp addressing model is open: each professional's business number versus a shared platform number with explicit selection and routing.
- Verified channel considerations include the 24-hour messaging window, approved templates outside it, and a clear escalation route. Current AI-provider platform terms still need verification before launch; the current terms page was inaccessible without login during this discussion.
- These are assistant proposals and researched constraints, not user-approved implementation decisions.

## Harness growth and professional control

Preserved from the earlier harness explanation at the user's request. At that time, automated proposals and belief evolution were not settled decisions. The 1 October extension recorded below brings bounded proposal/evaluation into the MVP; autonomous publication and belief changes remain deferred.

A professional can improve Maya by correcting knowledge, refining instructions, adding capabilities, or adjusting workflows. Those changes update the harness without retraining the underlying model.

The earlier proposal was that Maya could later suggest improvements based on experience—for example, asking for a missing detail earlier in intake. The user has since requested a complete bounded MVP loop, with explicit professional publication and evaluation rules proposed in Document 07. Whether Maya can change core beliefs remains open.

The professional portal lets someone configure this harness. WhatsApp carries its conversations. The harness makes those conversations informed, continuous, and governed by the professional's authority.

## Documentation programme

Seven working sessions, in order:

1. The Story — explain the idea to the director; no request for approval or funding.
2. Maya MVP Scope.
3. Petal Product Requirements and MVP Scope.
4. Technical Architecture and Engineering Guidelines.
5. Implementation Roadmap, Pilot Plan, and Launch Criteria.
6. Business Model and Road to Revenue.
7. Financial Projection and Unit Economics Workbook.

Work through decision questions and revisions in each session before moving to the next. Sessions 2, 3, and 4—Maya MVP Scope, Petal Product Requirements and MVP Scope, and Technical Architecture and Engineering Guidelines—are confirmed. Current session: 5, Implementation Roadmap, Pilot Plan, and Launch Criteria.

### Session 1 decision register

| ID | Topic | Status | Decision or open point | Implication |
|---|---|---|---|---|
| S1-01 | Naming | Confirmed by user | Petal is the platform; Maya is the persona system. | Apply consistently across the documents. |
| S1-02 | Leading value | Confirmed by user | Lead with extending professional presence while preserving identity and relationships; explain time savings and growth as outcomes. | This is the narrative emphasis of The Story. |
| S1-03 | Discovery vision | Confirmed by user; MVP choice later set in S3-01 | Broader vision includes both existing relationships through shared profiles and discovery of new professionals. | The MVP uses shared profile links; a searchable directory comes later. |
| S1-04 | Client-facing identity | Confirmed by user | Maya appears as the professional, with a brief AI notice when she responds. | Describe the professional's continuing identity and relationship while making Maya's role clear. |
| S1-05 | Document format | Superseded by user | The user first requested a Google Doc in shibly.work@gmail.com, then changed the working format to Markdown. | Continue The Story and later written documents in Markdown in the workspace. An earlier Google Doc draft exists but is no longer the working copy. |

The Session 1 document is [The Story](docs/01-the-story.md). It has been updated as later product decisions were confirmed.

### Revision to The Story during Session 2

- Lead with Maya as a configurable persona system that can extend a person's presence across many relationships; introduce Petal afterward as one implementation of Maya among many possible applications.
- Use three illustrative applications before the Petal section: a care coordinator supporting roughly 100 older adults with reminders and tracked responses; an IELTS band-8 tutor offering daily voice-based speaking practice and review; and a teacher supporting hundreds of students through course-material questions, guided practice, and progress review.
- Maya's broader communication possibilities include written replies, voice messages, and live calls; channel availability remains implementation-specific and is not settled for Petal's first release.
- Keep these examples illustrative. They do not decide Petal's first-release scope, health-service boundaries, or voice capabilities.

### Session 2 decision register

| ID | Topic | Status | Decision | Implication |
|---|---|---|---|---|
| S2-01 | Product boundary | Superseded by S2-06 | The initial approach specified Petal's MVP with Maya as a component. | The user subsequently changed the development sequence. |
| S2-02 | Workspace ownership | Confirmed by user | One professional has one workspace at launch. | Team and organization accounts are outside initial scope. |
| S2-03 | Initial Petal communication | Confirmed by user | Start Petal with WhatsApp text and sharing existing approved documents; voice messages and live calls come in later stages. | Voice is not an initial Petal release requirement. |
| S2-04 | Response timing | Confirmed by user | Maya evaluates incoming messages immediately and responds depending on the question and professional's persona settings. | Do not require an away switch or scheduled absence to activate Maya. |
| S2-05 | Independent authority | Confirmed by user | Maya may answer from approved information, gather details, and share approved materials. Personalized documents and commitments require professional review. | Define response, review, and takeover behavior around these boundaries. |
| S2-06 | Maya-first development | Clarified by S2-19 | Add development of Maya to the MVP scope first. | Specify Maya separately, then document Petal; implement and validate Maya before Petal implementation. |
| S2-07 | Maya product form | Confirmed by user | Build Maya first as a reusable system with a small interface to configure and test personas, without a separate public launch. | Keep the foundation independent of Petal-specific profile and WhatsApp flows. |
| S2-08 | Maya communication sequence | Confirmed by user | Maya's first version proves text conversations; voice messages follow, then live calls. | Neither voice stage is required for the Maya MVP or Petal's first release. |
| S2-09 | Maya validation cases | Confirmed by user | Test two distinct personas with multiple private relationships each, using general professional and teaching scenarios. | Demonstrate reuse and relationship isolation without launching separate vertical products. |
| S2-10 | Maya functional gate | Clarified by S2-19 | Demonstrate approved-knowledge accuracy, private-history separation, permission enforcement, human takeover, and action history. | Turn these into observable checks before Petal implementation; Petal requirements can be documented first. |
| S2-11 | Maya configuration | Confirmed by user | The represented person can review and approve persona identity, knowledge, and permissions in the small interface; the project team may assist in the pilot. | Owner authority remains visible even with assisted setup. |
| S2-12 | Relationship memory | Confirmed by user | Keep conversation histories separate per relationship; make longer-term facts inspectable and correctable by the represented person. | A client's statement must not silently become general approved knowledge. |
| S2-13 | Maya MVP actions | Confirmed by user | Prove text replies, collecting missing details, proposing or sharing approved items, and human escalation. Custom document generation comes later. | Limit first action set and test authorization for each action. |
| S2-14 | Human handoff | Confirmed by user | Maya acknowledges a review-needed request promptly, then pauses that conversation until the person acts or returns control. | Prevent competing Maya messages while a human owns the conversation. |
| S2-15 | Capacity sequence | Clarified by S2-19 | Prove core behavior before Petal implementation; validate the roughly 100-conversation concurrency ambition before a Petal pilot. | Treat functional and capacity gates separately without delaying the Petal documentation session. |
| S2-16 | Long-term client memory | Confirmed by user | Maya may save source-linked client facts as private relationship memory; the owner can inspect and correct them. Only the owner can approve changes to knowledge shared across relationships. | Keep private memory distinct from owner-approved general knowledge. |
| S2-17 | Unsupported answers | Confirmed by user | Maya says she cannot confirm an unsupported service fact and hands the question to the owner rather than guessing. | Include this case in Maya's functional validation. |
| S2-18 | Persona publishing | Confirmed by user | Persona changes move through draft, test, owner approval, and publish; the previous published version can be restored. | Live behavior uses an approved version with an auditable change history. |
| S2-19 | Documentation sequence | Confirmed by user | Confirm the Maya MVP scope document, then hold one additional session and document for Petal. | Seven sessions total; document Petal next while retaining Maya-first implementation and validation. |

The [Maya MVP Scope](docs/02-product-requirements-and-mvp-scope.md) records the confirmed Session 2 product boundary. Later session decisions are recorded below.

### Session 3 decision register

| ID | Topic | Status | Decision or open point | Implication |
|---|---|---|---|---|
| S3-01 | Client entry | Confirmed by user | Professionals share a link to their public Petal profile in the MVP; searchable directory discovery comes later. | A direct profile-to-contact journey is sufficient for the first release. |
| S3-02 | WhatsApp identity | Confirmed by user | Clients message the professional's own business number. | Preserve a direct relationship; validate the connection and onboarding mechanism in the architecture session. |
| S3-03 | Professional onboarding | Confirmed by user | Use guided setup for the first pilot; the professional approves their profile, knowledge, and Maya settings before going live. | Self-service onboarding is a later step. |
| S3-04 | Earlier context for existing clients | Confirmed by user | A professional can add a private relationship brief before an existing client's first Petal-connected message; Maya can clarify uncertain details with the client. Automatic old-chat import is not required for the MVP. | Seed private relationship state without defining memory as chat import. |
| S3-05 | Handoff workspace | Clarified by S3-10 | The professional can review and answer escalations in a Petal inbox. | Keep the human reply and return of control in the case record alongside WhatsApp directions. |
| S3-06 | Relationship continuity | Confirmed by user after artifact review | Each client has private, continuing relationship state with relevant facts, preferences, episodes, and follow-ups. Maya combines this with the professional's approved identity and knowledge for each message. | Separate each client's context and update it through ongoing interaction. |
| S3-07 | Public profile minimum | Confirmed by user | Require name, short service description, local or remote service mode, and WhatsApp contact action; photo, credentials, and detailed offerings are optional initially. | Keep the shareable profile simple. |
| S3-08 | AI notice timing | Confirmed by user | Give a brief notice on Maya's first reply and when she resumes after a professional reply, not on every message. | Disclose the AI role without repeating it on each turn. |
| S3-09 | Go-live check | Confirmed by user | Require approved profile and service information, published Maya settings, tested WhatsApp connection, and successful handoff test before real client use. | Guided onboarding has an explicit completion gate. |
| S3-10 | Professional WhatsApp control | Confirmed by user | Maya sends escalation alerts to the professional through a separate WhatsApp account to be designed later; the professional can direct Maya naturally by talking to the persona. | Design a professional-facing conversation channel and record directions and outcomes with the client case; email is not the initial alert method. |
| S3-11 | Natural-language case authorization | Confirmed by user | A clear professional instruction may authorize a routine reply or sharing an existing approved item within current permissions; price, appointment, or other commitments require explicit approval. | Interpret owner directions in case context without treating casual text as a general permission or policy change. |
| S3-12 | WhatsApp control scope | Confirmed by user | The professional-facing Maya chat initially supports case directions and status questions. Broader profile, knowledge, or persona changes may be requested there as drafts but must be tested and published in the Petal workspace. | Preserve conversational control without silently changing standing behavior for every client. |
| S3-13 | Client account | Confirmed by user | Clients use the shared profile and WhatsApp without creating a Petal account. | Keep the first client journey simple. |
| S3-14 | Case reference in alerts | Confirmed by user | Each professional-facing WhatsApp escalation alert identifies its client and case; a reply to that alert applies to that case. Maya asks for clarification when a new instruction is ambiguous. | Avoid routing a direction to the wrong client when multiple cases are active. |
| S3-15 | Inbox states and reminders | Confirmed by user | Show waiting for professional, professional handling, Maya resumed, and resolved states; send an initial WhatsApp alert and a reminder for an unanswered case. | Define reminder timing and delivery details in later technical and delivery work. |

The confirmed Session 3 scope is [Petal Product Requirements and MVP Scope](docs/03-petal-product-requirements-and-mvp-scope.md).

The [One Self, Many Faces](https://claude.ai/artifact/3kvkcjiCU6W2ubLdKMqj5L) artifact was revisited in Session 3. Its relevant pattern is one stable self plus a distinct face and private history for each relationship; the context for a message combines core identity, that relationship's face, and relevant episodes. It also keeps commitments and follow-ups in an agenda. The artifact describes ongoing memory and continuity, not a requirement to import conversations from before a service is connected. The prior Session 3 question incorrectly presented history as a binary import-versus-start-fresh decision.

### Session 4 decision register

| ID | Topic | Status | Decision or open point | Implication |
|---|---|---|---|---|
| S4-01 | Technology selection | Confirmed by user | Keep a separate section listing tools, technologies, and AI model providers. | Do not conflate architecture boundaries with vendor or framework selection; constraints and shortlist remain to be determined. |
| S4-02 | Maya–Petal boundary | Confirmed by user | Maya is an independently deployable service with a versioned API; Petal owns profiles, workspace, and WhatsApp integration. | Define a clear service contract and separate deployment lifecycle. |
| S4-03 | Infrastructure tenancy | Confirmed by user | Use shared infrastructure for professionals initially. | Enforce isolation per professional and client relationship in data access, storage, and jobs. |
| S4-04 | Professional control number | Confirmed by user | Use one Petal-managed WhatsApp number for professional alerts and directions, separate from each professional's client-facing number. | Bind professional identities and case references to the shared control channel. |
| S4-05 | Market and cloud | Confirmed by user | Petal is intended as an international product; lean toward GCP as the starting cloud. | Do not assume one national launch market; the initial Southeast Asian data-region preference is recorded in S4-08. |
| S4-06 | Primary data ownership | Confirmed by user | Maya owns persona versions and private relationship memory; Petal owns professional profiles, WhatsApp connections, cases, and message delivery. | Specify scoped service APIs and decide ownership of approved knowledge, transcripts, files, and audit records separately. |
| S4-07 | Model connection | Confirmed by user | Use an external AI model API initially. | Keep the provider replaceable and evaluate data terms, quality, latency, and cost before selecting one. |
| S4-08 | Initial data region | Confirmed by user | Petal is international without a country-specific launch; an initial data region near Asia is acceptable, with Singapore or Malaysia preferred. | Singapore is a verified GCP region and the initial deployable candidate; verify Malaysia region availability and service coverage before treating it as an option. |
| S4-09 | Remaining data ownership | Confirmed by user | Maya owns approved knowledge and persona-related audit records; Petal owns WhatsApp transcripts, files sent through the channel, and delivery records. | Link records across the services with case/correlation IDs; resolve storage of original approved documents and retention separately. |
| S4-10 | Commitment confirmation | Confirmed by user | The professional can explicitly confirm a proposed price, appointment, or other commitment in the case-linked WhatsApp control conversation; Petal records the confirmation. | Verify professional identity and case binding, show the exact proposed action, and retain an auditable approval record. |
| S4-11 | Approved document ownership | Confirmed by user | Maya owns authoritative approved source documents and their approval status; Petal keeps copies sent through WhatsApp and their delivery records. | A send must identify the approved source version and retain a record of the exact delivered copy. |
| S4-12 | Model or Maya outage | Confirmed by user | Petal holds incoming messages durably when Maya or its external model API is unavailable; it does not invent replies and alerts the professional if disruption persists. | Define retry, escalation timing, and freshness checks before delayed dispatch. |
| S4-13 | External model data safeguards | Confirmed by user | Send only context needed for a request; select a provider whose terms prohibit training on client content without explicit opt-in. | Verify provider retention and processing terms and keep credentials and unrelated client data out of requests. |
| S4-14 | Data lifecycle | Confirmed by user | Professionals can inspect, correct, export, and request deletion of client relationship data; exact retention periods will be set before the pilot after a policy review. | Coordinate the workflow across Maya and Petal, including transcripts and sent copies, and define separate audit retention. |
| S4-15 | Professional access | Confirmed by user | Use strong workspace sign-in and extra verification for sensitive standing changes; routine case directions remain available in the registered professional WhatsApp control chat. | Select the authentication mechanism and audit sensitive changes without moving ordinary case control out of WhatsApp. |
| S4-16 | Application stack | Confirmed by user | Use Python/FastAPI for Maya, TypeScript/NestJS for the Petal backend, and TypeScript/Next.js/React for the public profile and workspace. The user can handle both languages. | Maintain a versioned OpenAPI contract and independent builds for Maya and Petal; choose cloud services and model provider separately. |
| S4-17 | Initial GCP services | Confirmed by user | Use Cloud Run for the applications; Cloud SQL for PostgreSQL with separate Maya and Petal databases and credentials; separate Cloud Storage buckets; Cloud Tasks for retries and reminders; Secret Manager for credentials. | Enforce per-conversation order in database state because Cloud Tasks does not guarantee it; size and backup settings remain open. |
| S4-18 | WhatsApp integration route | Confirmed direction, subject to feasibility | Target direct Meta Cloud API integration behind a Petal adapter, retaining a partner option. | Validate current professional-number onboarding, webhook and delivery flows, and the control number against Meta's changed account model and Embedded Signup before committing to launch. |
| S4-19 | Initial model selection | Confirmed by user | Evaluate external models on Maya's two-persona cases, privacy requirements, latency, and cost; select one primary model before pilot and keep its adapter replaceable. | Do not select a vendor by brand alone or require a second live provider in the MVP. |
| S4-20 | Initial recovery posture | Confirmed by user | Start in one Singapore GCP region with automated backups and a tested restore procedure; defer active multi-region deployment until demand or customer requirements justify it. | Define backup retention, recovery targets, and restore exercises in the delivery plan. |
| S4-21 | Client notice during sustained outage | Confirmed by user | Where WhatsApp permits, send a short preapproved receipt to the client and alert the professional; do not claim the request has been resolved. | Choose timing and wording, and route the receipt through the audited dispatcher. |
| S4-22 | Capacity gate definition | Confirmed by user | Test at least 100 distinct client conversations for one persona under representative simultaneous load; measure response time, errors, handoffs, and cost. | Set numerical thresholds after the Maya prototype baseline and before the Petal pilot. |
| S4-23 | Search and retrieval | Confirmed by user | Begin with scoped PostgreSQL metadata and text search; add pgvector in Cloud SQL only if Maya evaluation shows that semantic retrieval helps. | Avoid a separate search service initially and preserve professional/client access checks before retrieval. |
| S4-24 | Workspace authentication product | Confirmed starting choice, subject to checks | Use Google Identity Platform with TOTP verification for sensitive workspace actions. | Verify cost and data-location terms before implementation. |
| S4-25 | Operations tooling | Confirmed by user | Use Cloud Logging, Monitoring, and tracing; Cloud Build and Terraform for repeatable deployments. | Define redacted telemetry, staged releases, and infrastructure review in implementation work. |

The confirmed Session 4 baseline is [Technical Architecture and Engineering Guidelines](docs/04-technical-architecture-and-engineering-guidelines.md). The earlier [architecture.md](architecture.md) is a discussion proposal; use the Session 4 document for current decisions.

### Session 5 decision register

| ID | Topic | Status | Decision or open point | Implication |
|---|---|---|---|---|
| S5-01 | Build sequence | Confirmed by user | Check WhatsApp onboarding and external model feasibility early; develop and functionally validate Maya before implementing Petal; complete integration, capacity, and recovery gates before pilot. | Arrange parallel feasibility work without reversing the Maya-first implementation dependency. |
| S5-02 | Delivery model | Confirmed by user | Use parallel agentic development as a team, with agents managing assigned responsibilities and documenting their work so the roles can later be staffed by recruited people. | Define workstream ownership, integration contracts, review gates, handoff artifacts, and future human role descriptions in the roadmap. |
| S5-03 | Pilot versus delivery team | Confirmed by user | Keep the pilot and agentic development model as separate concepts. The pilot will use a small set of real users after the system is ready. | Agentic workstreams build and support the product; pilot participants use it. Exact participant mix, size, and duration remain open. |
| S5-04 | Pilot participant types | Confirmed by user | Invite a few real professionals and let their willing clients use Petal through WhatsApp. | Guided professional onboarding and real client interactions form the pilot; exact counts, service types, and duration remain open. |
| S5-05 | Pilot cohort and duration | Confirmed by user | Start with two real professionals, then expand to at most five after reviewing early results; each has a small group of willing clients. Plan for roughly four to six weeks. | Keep client counts and service mix open; stagger onboarding and define the pilot exit review. |
| S5-06 | Agentic workstreams | Confirmed by user | Divide parallel development into Maya and evaluation; Petal and WhatsApp; profile and workspace; platform quality and operations. | Each workstream owns its interfaces, test evidence, documentation, and future recruitment scope. |
| S5-07 | Human review and release owner | Confirmed by user | The user will review all workstream outputs and act as the initial integration and release owner. | Make agent submissions concise and evidence-backed, coordinate cross-workstream changes, and include user review capacity in the plan. |
| S5-08 | Two-month milestone | Confirmed by user | Target the start of the closed pilot within roughly two months from September 30, 2026, around late November 2026; this is not a wider launch deadline. | Work backward through Maya's functional gate, Petal implementation, and integrated capacity/recovery gates; reforecast promptly if a gate slips. |

The agentic team structure and the pilot plan are separate in the roadmap. Agents may support pilot operations in their respective areas, but pilot participants are real professionals and their clients. The pilot now starts with two professionals, may expand to five, and is planned for roughly four to six weeks; service mix and exact client counts remain open.

The Session 5 working draft is [Implementation Roadmap, Pilot Plan, and Launch Criteria](docs/05-implementation-roadmap-pilot-plan-and-launch-criteria.md).

## 1 October extension: bounded MVP self-improvement

The user requested “I want to add self improving loop in the MVP” in the “Access Architecture Document” chat and supplied its full version 1.0 specification in the document-review chat. The supplied research had access only to the engineering blueprint, so it is now reconciled against documents 01–06 in [Document 07](docs/07-self-improving-loop-design-and-mvp-scope.md) and the [integration review](docs/reviews/2026-10-01-self-improving-loop-review.md).

| Topic | Status | Current record |
|---|---|---|
| Include a complete self-improving loop in MVP | User-requested scope extension | Automatic feedback discovery, bounded candidate drafting/evaluation, professional review/publication, later observation and restore; distinguish it from private memory continuity. |
| Candidate categories and retrieval dual review | Proposed engineering/product detail | Instructions, one knowledge item, or allowlisted persona retrieval tuning; retrieval also requires engineering review. Fixed authority and scope filters remain application controls. |
| Publication/dispatch integration | Proposed reconciliation with existing SDD | Reuse existing effective manifest and coordinated mutation barrier; no new competing release pointer or five-second stale-token exception. Automatic incident holds, explicit owner restore. |
| Operating parameters and pilot completion | Proposed for review | Preserve source scan/suite/budget/retention defaults as unmeasured proposals, add synthetic gate and real per-pilot-persona cycle evidence, and reforecast the original delivery target. |

Earlier session registers remain historical. This extension does not confirm model selection, operating budgets, retention policy, autonomous belief evolution or production-code rewriting.
