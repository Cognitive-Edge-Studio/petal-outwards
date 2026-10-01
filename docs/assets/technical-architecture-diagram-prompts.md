# Technical architecture diagram prompts

Generated using the built-in image generation tool. Final assets are saved alongside this file. Prompts preserve the document's service boundary, data ownership, and approval requirements.

## technical-architecture-system-context.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2. Create a polished, highly legible flat editorial diagram on white, navy text, soft blue Petal cards, lavender Maya cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads, no decorative connector lines. Connections must match the specification exactly.
Title: "Maya and Petal system context". Nine nodes ONLY. Left inputs: "Client" with subtitle "Professional's WhatsApp number"; "Professional" with subtitle "Petal control WhatsApp number"; "Professional workspace".
Petal boundary contains "WhatsApp adapter", "Petal application", "Authorized outbound dispatcher", and storage "Profiles, channels, cases". Maya separate boundary contains "Maya service API" and storage "Persona and relationship state".
EXACT nine directed edges: Client -> WhatsApp adapter; Professional -> WhatsApp adapter; Professional workspace -> Petal application; WhatsApp adapter -> Petal application; Petal application -> Maya service API; Maya service API -> Persona and relationship state; Petal application -> Profiles, channels, cases; Petal application -> Authorized outbound dispatcher; Authorized outbound dispatcher -> WhatsApp adapter.
Plan orthogonal routing with the dispatch-to-adapter return path around Petal boundary bottom, distinct from adapter-to-application. Draw no other arrows, no two-way arrows. Maya has no direct channel dispatch. Footer: "Petal authorizes every send · Maya returns scoped proposals". Logical service context, no deployment/cloud components.

## technical-architecture-data-ownership.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2. Create a polished, highly legible flat editorial diagram on white, navy text, soft blue Petal cards, lavender Maya cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads, no decorative connector lines. Connections must match the specification exactly.
Title: "Data ownership across the service boundary".
Two equal service panels. Left blue "Petal" panel: top "Petal application"; below two nonconnected ownership cards: "Petal records" / "Profiles · workspaces · channel bindings / Cases · transcripts · delivery status"; "Sent document copies" / "Exact file and version sent to the client".
Right lavender "Maya" panel: top "Maya service API"; below two nonconnected ownership cards: "Maya records" / "Personas · approved knowledge / Private relationship memory · audit"; "Authoritative documents" / "Approved source files and versions".
Only TWO interservice arrows between top application and API: Petal -> Maya labelled "Authenticated professional + client scope"; Maya -> Petal labelled "Scoped proposals + source/version references". Parallel distinct lanes, arrows correctly oriented.
Below panels a separate three-step logical document-transfer strip: "Approved Maya source version" -> "Scoped API transfer" -> "Petal sent copy". Label strip "Document sharing" and note "Copy records the exact source version".
Footer exact: "Separate databases and credentials · No direct cross-service database queries". Ownership cards are grouped by service, not connected by arrows. Don't depict a shared database, direct bucket access, or client memory visible across relationships.

## technical-architecture-improvement-loop.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2. Create a polished, highly legible flat editorial diagram on white, navy text, soft blue Petal cards, lavender Maya cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads, no decorative connector lines. Connections must match the specification exactly.
Title: "A bounded, human-approved improvement loop".
Six numbered cards in a two-row clockwise loop. TOP left to right: 1 "Capture feedback" / "Petal records verified corrections and outcomes"; 2 "Draft a candidate" / "Maya proposes one bounded change"; 3 "Evaluate in isolation" / "Synthetic cases · quality and safety gates". BOTTOM right to left: 4 "Review and approve" / "Professional approves exact change and report"; 5 "Publish through Maya" / "Existing publication lifecycle · current validity checks"; 6 "Observe outcomes" / "Trace later turns to the approved version". Directed edges ONLY 1->2->3->4->5->6->1; route outerleft feedback return from6to1. All main arrows single direction. Layout 1,2,3 top and6,5,4 bottom. Petal blue for1and6, Maya lavender2,3,5; professional review4 warmcream.
Reviewcard4 includes small callout "Retrieval changes also require engineering approval".
Under main cycle two unconnected guardrail pills: "Learning workers cannot send client messages"; "Owner may restore a still-valid earlier version".
Footer: "One category per candidate: instructions, approved knowledge, or allowlisted retrieval settings".
No automatic publication/restore, no model weights or code updates, no real client transcripts in test cases. Safety failure blocks publication. Don't add any shortcut edge bypassing review.
