# Maya and Petal system-context illustration

Generated with the built-in image generation tool. This prompt preserves the 17 nodes and 18 directed connections in SDD section 2. The numbered arrows support manual topology review.

Final asset: [maya-petal-system-context.png](maya-petal-system-context.png). Generated and manually inspected on 1 October 2026; all 17 node labels and 18 numbered arrow endpoints/directions match the Mermaid source. The illustration is a logical view, not a deployment or trust-boundary specification.

```text
Use case: infographic-diagram.
Asset type: a polished, high-resolution architecture illustration embedded in the Maya and Petal System Design Document.
Primary request: redraw the exact logical system-context graph below as an exceptionally clear professional technical infographic. Connectivity and arrow directions are the highest priority. Generate a landscape image approximately 3200 by 2000 pixels with generous margins, clean white/off-white background, crisp flat vector-like rendering, understated rounded cards, small functional icons, elegant dark sans-serif labels, and well-separated orthogonal connectors. Avoid photorealism, 3D, decorative characters, logos and ornament. Use restrained blue/teal for Petal, purple for Maya, amber for scheduled work, neutral gray for actors and external transport. All node text must be spelled exactly and fully readable.

Title: "Maya & Petal — System Context"
Subtitle: "Logical responsibilities and directed connections"

Draw EXACTLY these 17 distinct named nodes, once each:
"Client WhatsApp"
"Professional control WhatsApp"
"Profile and workspace"
"Petal web"
"WhatsApp provider"
"Petal webhook adapter"
"Petal API"
"Maya versioned API"
"External model API"
"Maya PostgreSQL"
"Approved source bucket"
"Petal PostgreSQL"
"Sent-copy bucket"
"Durable work publisher"
"Periodic recovery trigger"
"Cloud Tasks"
"Outbound dispatcher"

EXACT directed graph: draw exactly 18 single-headed arrows, with a discreet small number 01 through 18 beside its connector to make topology auditable:
01 Client WhatsApp -> WhatsApp provider
02 Professional control WhatsApp -> WhatsApp provider
03 Profile and workspace -> Petal web
04 Petal web -> Petal API
05 WhatsApp provider -> Petal webhook adapter
06 Petal webhook adapter -> Petal API
07 Petal API -> Maya versioned API
08 Maya versioned API -> External model API
09 Maya versioned API -> Maya PostgreSQL
10 Maya versioned API -> Approved source bucket
11 Petal API -> Petal PostgreSQL
12 Petal API -> Sent-copy bucket
13 Petal API -> Durable work publisher
14 Periodic recovery trigger -> Durable work publisher
15 Durable work publisher -> Cloud Tasks
16 Cloud Tasks -> Petal API
17 Petal API -> Outbound dispatcher
18 Outbound dispatcher -> WhatsApp provider

Suggested layout to separate routing, data ownership, and recovery:
Top entry row: Profile and workspace at top-left, arrow right to Petal web above the central Petal API, and arrow down from Petal web into Petal API.
Main horizontal row, left to right: Client WhatsApp and Professional control WhatsApp in separate cards at far left feed WhatsApp provider; provider points right to Petal webhook adapter; adapter points right to the large central Petal API; Petal API points right to Maya versioned API; Maya points right to External model API.
Below the main row: put Petal PostgreSQL and Sent-copy bucket beneath Petal API, with separate arrows from Petal API. Put Maya PostgreSQL and Approved source bucket beneath Maya, with separate arrows from Maya. Use recognizable cylinder and bucket icons inside labeled cards.
Put Outbound dispatcher below the WhatsApp/adapter area. Its incoming edge 17 must start at Petal API and its outgoing edge 18 must point upward back into WhatsApp provider, creating a clearly visible outbound return path.
Bottom recovery row, left to right: Periodic recovery trigger -> Durable work publisher -> Cloud Tasks. Edge 13 drops from Petal API into Durable work publisher. Edge 16 routes up from Cloud Tasks back into Petal API in its own clear outer lane.
Use subtle background bands or group labels for "People & channels", "Petal", "Maya", and "Scheduled work". These are grouping labels, not extra nodes.
Footnote exact text: "Logical view · Separate service data ownership · Recovery scheduling is proposed"

Constraints: preserve all 17 nodes and all 18 edges exactly. No extra connections, no bidirectional arrows, no automatic return arrow from Maya into Petal, no arrow from Maya into WhatsApp, no arrow between the two databases, no arrow from recovery trigger into Cloud Tasks (it connects to publisher). Distinct paths may cross only with an explicit line bridge, never a junction; every arrowhead lands clearly on its specified target card. Avoid merged arrow trunks that could imply the wrong source. Do not crop labels or connectors. Favor legibility and exact connections over decoration.
```
