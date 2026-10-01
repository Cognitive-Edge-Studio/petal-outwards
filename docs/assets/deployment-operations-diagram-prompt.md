# Deployment and operations illustration

Generation method: built-in image generation tool. Basis: SDD sections 7 and 9 and the confirmed Session 4 deployment baseline. The runtime graph has sixteen directed connectors. Supporting control cards describe delivery, secrets, telemetry and recovery rather than additional runtime network links.

Final asset: [deployment-and-operations.png](deployment-and-operations.png). Generated and visually verified on 1 October 2026. All sixteen numbered source/target pairs and single-headed directions match the SDD connectivity source. Database/bucket ownership, the shared initial Cloud SQL instance, and the proposed status of Cloud Scheduler are shown explicitly. The scheduling inset repeats references to the same API deployments.

The first candidate misrouted storage and recovery connectors and was rejected. The following correction uses a runtime panel and a separate scheduling inset referring to the same API deployments.

## Correction prompt

```text
Edit the reference architecture illustration. Preserve the polished visual style, title, all technology choices, control cards and footnotes. Correct the connection topology by arranging runtime and scheduling as TWO clearly separated panels. This is a correctness repair. The reference has wrong storage endpoints and routes Scheduler into Tasks; eliminate those errors. Redraw all connectors as specified below, with clear single arrowheads and no ambiguous junctions. Keep all text large and legible.

Panel A: "Pilot runtime and data". Subtitle: "Initial Singapore deployment · service availability to verify".
Above/outside the environment boundary: "Browser", "WhatsApp provider" ("Direct Meta target / partner fallback"), and "External model API" ("Provider to select").
Inside a Cloud Run band: "Petal web" ("Next.js / React"), "Petal API" ("NestJS · adapter, dispatcher, task handlers"), and "Maya API" ("FastAPI · runtime, memory, task handlers").
Petal and Maya API cards should be two distinct columns.
Under the API columns: ONE wide shared container "Cloud SQL for PostgreSQL · one initial instance" containing "Petal database" directly under the Petal API column and "Maya database" directly under the Maya API column. Each has "Independent service credentials". Arrows 07 and 09 MUST end on the respective DATABASE CARD, not the shared instance frame.
Below/alongside that, two separate bucket cards: "Sent-copy bucket" ("Cloud Storage") under the PETAL COLUMN and "Approved-source bucket" ("Cloud Storage") under the MAYA COLUMN. Draw separate routed access lines from APIs into their own bucket; those lines bypass database cards and never join database arrows.

Panel A must have exactly these ten directed numbered arrows:
01 Browser -> Petal web ("HTTPS")
02 Petal web -> Petal API ("Workspace / profile API")
03 WhatsApp provider -> Petal API ("Webhooks")
04 Petal API -> WhatsApp provider ("Authorized sends")
05 Petal API -> Maya API ("Scoped, versioned API")
06 Maya API -> External model API ("Minimum required context") — single arrowhead at external model only.
07 Petal API -> Petal database ("Own data")
08 Petal API -> Sent-copy bucket ("Sent files")
09 Maya API -> Maya database ("Own data")
10 Maya API -> Approved-source bucket ("Approved originals")
NO Petal-to-Maya-database or Maya-to-sent-bucket connection. NO arrow from either database into any other service.

Panel B, a self-contained wide inset below Panel A: "Background work and recovery". Small note "Handlers run in the same API deployments".
Left: "Cloud Scheduler" with red "PROPOSED" badge and "Independent recovery scans".
Middle: two separate cards one above the other: "Petal API handlers" and "Maya API handlers".
Right: "Cloud Tasks" ("Retries, reminders and deferred jobs").
This inset refers to the same API deployments, not four new services. No lines between the two panels.
Use only these SIX exact directed arrows, numbered 11–16:
11 Petal API handlers -> Cloud Tasks ("Enqueue work")
12 Cloud Tasks -> Petal API handlers ("Authenticated task")
13 Maya API handlers -> Cloud Tasks ("Enqueue work")
14 Cloud Tasks -> Maya API handlers ("Authenticated task")
15 Cloud Scheduler -> Petal API handlers ("Recovery scan")
16 Cloud Scheduler -> Maya API handlers ("Recovery scan")
Scheduler has exactly two OUTGOING arrows, both terminate on the handler cards in the MIDDLE. Scheduler MUST NOT connect to Cloud Tasks. Separate the two directions between Tasks and each handler into two clearly spaced arrows.

Below the two panels preserve the reference's supporting information:
"Cloud Build + Terraform" — "Build, test and independently release services" / "Provision infrastructure and IAM".
"Secret Manager + service IAM" — "Separate Maya and Petal credentials" / "Scoped service identities".
"Logging, Monitoring & Tracing" — "Redacted events + correlation IDs" / "Queue age, unknown sends, latency, cost" / "Alerts → named incident owner".
"Backup and restore" — "Restore → Replay deletion ledger → Rebuild indexes → Resume" / "Restore exercise required before pilot".
Separate small card "Development / test" — "Isolated credentials, data and test numbers".
Footer: "Logical deployment view · Sizing, retention and recovery targets remain open"
Second footer: "External processing locations are assessed separately · Active multi-region is deferred"

Check all 16 numbered connectors against this exact list. Single-headed arrows only. Unnumbered flow arrows are allowed only inside the tiny backup procedure. No connecting lines between control cards or between Dev/test and Pilot. No missing numbers, no extra duplicated connectors. Use an ample canvas and distinct routing lanes. Preserve typography and visual polish, simplify where necessary to guarantee correct engineering meaning.
```

## Final topology refinement

```text
Make a narrowly targeted correctness edit to the supplied deployment diagram. Preserve the entire composition, all card positions, all text outside the specified changes, all lower panels, footer, phase colors and connector numbers. The lower "Background work and recovery" panel is CORRECT and must be completely unchanged.

Change ONLY these upper-panel details:
1. Connector 06 between "Maya API" and "External model API" must be SINGLE-HEADED UPWARD. Keep its upper arrowhead landing on the bottom of "External model API". REMOVE the downward arrowhead above "Maya API"; at the API end use a plain line emerging from the top of the Maya API card. No arrowhead at Maya. Keep number 06 and its label unchanged.
2. Rename the left data-group heading from "Cloud SQL for PostgreSQL · one initial instance" to the exact text "Petal-owned data".
3. Rename the right data-group heading from "Cloud SQL for PostgreSQL · one initial instance" to the exact text "Maya-owned data".
These groups express ownership, not database-instance enclosures. Retain their existing subtle outlines.
4. Inside BOTH database cards, retain their main name ("Petal database" / "Maya database") and append a readable "Cloud SQL" label beneath the name, followed by "Independent service credentials". Retain the bucket labels and "Cloud Storage" text unchanged.
5. Connector 07 must continue DOWN past the "Petal-owned data" group's header and land on the TOP EDGE OF THE ACTUAL "Petal database" CARD INSIDE THE GROUP. Its single arrowhead must touch that database card, not the enclosing group's border. Same source from Petal API, same number and "Own data" label.
6. Connector 09 must continue DOWN past the "Maya-owned data" group's header and land on the TOP EDGE OF THE ACTUAL "Maya database" CARD INSIDE THE GROUP. Its single arrowhead must touch that database card, not the enclosing group's border. Same source from Maya API, same number and label.
7. Add a single clear small caption beneath the two ownership groups, above the background-work panel: "Cloud SQL: one initial instance, separate databases · Cloud Storage: separate buckets". Increase that small gap slightly only if needed. This caption applies to both databases; do not create another runtime box or connection.

Keep ALL sixteen numbered connections otherwise identical. Connectors 08 and 10 still land on their respective Cloud Storage bucket cards. Keep the SINGLE shared-instance caption exact. No bidirectional arrow anywhere in this figure. Do not re-layout or regenerate the lower panels. Preserve legibility, white background, clean borders and polished typography.
```

## Initial prompt

Final label correction: Make exactly one text correction in the supplied diagram: replace the truncated small ownership-group heading "Maya-owned dat" above the Maya database with the exact shorter heading "Maya data". Keep it at the same left alignment with clear space before connector 09 so no letter touches the arrow. Preserve ALL other words, cards, positions, colors, sixteen numbered connectors, arrowheads, footer, and lower panels exactly. Do not redraw, reroute, add or delete any connections. This is a single-label correction only.

```text
Use case: infographic-diagram.
Asset type: deployment and operations illustration for section 9 of the Maya and Petal System Design Document.
Primary request: make a clear, polished engineering infographic showing the starting GCP deployment, service-owned data, durable background work, release controls, observability and restore procedure. Follow the exact directed runtime connections below. Use a large landscape canvas approximately 3200 by 2300 pixels, white/off-white background, spacious rounded cards, small recognizable functional icons, dark navy sans-serif text, restrained blue/teal for Petal, purple for Maya, amber for jobs, neutral gray for supporting cloud controls. Readable at document-preview size. No photorealism, 3D, decorative mascots, or commercial logos.

Title exact: "Maya & Petal — Deployment and Operations"
Subtitle exact: "Independent services, isolated data and recoverable work"

LAYOUT AND BOUNDARIES:
The central area is a large container titled "Pilot environment" with smaller subtitle "Initial Singapore deployment · service availability to verify".
Inside it, three service cards in a horizontal "Cloud Run" row:
"Petal web" with sublabel "Next.js / React"
"Petal API" with sublabel "NestJS · adapter, dispatcher, task handlers"
"Maya API" with sublabel "FastAPI · runtime, memory, task handlers"
Above/outside this environment, put three external-entry/dependency cards:
"Browser", "WhatsApp provider" with sublabel "Direct Meta target / partner fallback", and "External model API" with sublabel "Provider to select".
Keep the external model and WhatsApp OUTSIDE the GCP environment boundary.

Under the API row, show ONE container labeled "Cloud SQL for PostgreSQL · one initial instance" containing exactly two distinct database cylinders/cards:
"Petal database" and "Maya database".
Each database has independent service credentials. Do not connect the databases to each other.
Also show TWO separate storage cards labeled "Sent-copy bucket" and "Approved-source bucket" associated with Petal and Maya respectively, with small label "Cloud Storage".
Under these, show two scheduled-work cards:
"Cloud Tasks" with sublabel "Retries, reminders and deferred jobs"
"Cloud Scheduler" with prominent small badge "PROPOSED" and sublabel "Independent recovery scans".
Cloud Tasks invokes authenticated API task handlers, not the web service. Both backends enqueue their own work; there is no direct database-to-queue arrow.

DRAW EXACTLY THESE 16 NUMBERED RUNTIME CONNECTORS, each clearly landing at the specified named node, and no other runtime connectors:
01 Browser -> Petal web ("HTTPS")
02 Petal web -> Petal API ("Workspace / profile API")
03 WhatsApp provider -> Petal API ("Webhooks")
04 Petal API -> WhatsApp provider ("Authorized sends")
05 Petal API -> Maya API ("Scoped, versioned API")
06 Maya API -> External model API ("Minimum required context")
07 Petal API -> Petal database ("Own data")
08 Petal API -> Sent-copy bucket ("Sent files")
09 Maya API -> Maya database ("Own data")
10 Maya API -> Approved-source bucket ("Approved originals")
11 Petal API -> Cloud Tasks ("Enqueue work")
12 Cloud Tasks -> Petal API ("Authenticated task handler")
13 Maya API -> Cloud Tasks ("Enqueue work")
14 Cloud Tasks -> Maya API ("Authenticated task handler")
15 Cloud Scheduler -> Petal API ("Recovery scan")
16 Cloud Scheduler -> Maya API ("Recovery scan")

Use neat orthogonal or gently curved connectors in dedicated lanes, clear single-headed arrowheads, discreet number badges 01–16, and bridge marks at unavoidable crossings. Parallel directions between APIs and Cloud Tasks must be distinct arrows, not an unlabeled bidirectional line. Never merge trunks into junctions that imply the wrong source. All runtime edges stay readable; use a generous canvas instead of tightly packed cards.

SUPPORTING CONTROL STRIP, with no added runtime connector lines:
Use an upper or lower strip of clearly separated informational cards titled "Delivery and operational controls". These cards describe controls; they are not runtime traffic nodes.
Card 1 title "Cloud Build + Terraform"
Text lines: "Build, test and independently release services" and "Provision infrastructure and IAM".
Card 2 title "Secret Manager + service IAM"
Text: "Separate Maya and Petal credentials" and "Scoped service identities".
Card 3 title "Logging, Monitoring & Tracing"
Text: "Redacted events + correlation IDs" and "Queue age, unknown sends, latency, cost" and "Alerts → named incident owner".
Card 4 title "Backup and restore"
Show a tiny local procedure inside this card ONLY: "Restore → Replay deletion ledger → Rebuild indexes → Resume".
Text below: "Restore exercise required before pilot".
Place a small separate "Development / test" card outside the pilot environment, with text "Isolated credentials, data and test numbers". Do not draw a data-sharing arrow between environments.
Footer exact: "Logical deployment view · Sizing, retention and recovery targets remain open"
Second footer exact: "External processing locations are assessed separately · Active multi-region is deferred"

Invariants: Petal connects only to Petal database and sent-copy bucket. Maya connects only to Maya database and approved-source bucket. No cross-service SQL or shared credentials. No Maya-to-WhatsApp edge. Model provider remains outside GCP. Cloud Scheduler is explicitly proposed. Do not imply all supporting services process data in Singapore or invent load balancers, Kubernetes, VPC/firewall topology, secondary regions or new providers. Preserve every label accurately. Cloud SQL's single-instance container must still visibly contain two isolated databases. The diagram expresses selected logical deployment units, not a finalized network topology.
```
