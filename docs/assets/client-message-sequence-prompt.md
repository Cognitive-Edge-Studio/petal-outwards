# Client message to Maya reply illustration

Generation method: built-in image generation tool. Source: SDD section 6.1, with five participants and thirteen ordered interactions. Preserve the three self-calls and the three dashed responses.

Final asset: [client-message-to-maya-reply.png](client-message-to-maya-reply.png). Generated and visually checked on 1 October 2026. All thirteen row labels, endpoints, directions, self-calls and message/response line styles match the source. Repeated participant headers at the bottom are labels for the same five lifelines.

```text
Use case: infographic-diagram.
Asset type: high-resolution sequence diagram for section 6.1 of the Maya and Petal System Design Document.
Primary request: illustrate the exact sequence below in a clean, publication-quality technical infographic. Preserve participants, message order, endpoints, arrow directions and line styles exactly. Use a large near-square landscape canvas approximately 2800 by 2400 pixels so thirteen well-spaced message rows and readable labels fit. White/off-white background, restrained rounded participant headers, tiny functional icons, dark navy sans-serif typography, teal/blue Petal and Dispatcher accents, purple Maya accent, neutral Client and WhatsApp headers. Match the polished flat architecture style of the preceding system-context illustration. Avoid decorative illustration, logos, 3D and photorealism.

Title exact: "Client Message to Maya Reply"
Subtitle exact: "Durable acceptance, scoped evaluation and authorized delivery"

Five participant columns, ordered LEFT TO RIGHT, each appearing once in the top header:
"Client", "WhatsApp", "Petal", "Maya", "Dispatcher".
Each has one straight vertical dashed lifeline descending through every row. The lifelines are timeline guides, not message arrows. Optionally repeat the exact participant headers at the bottom.

Draw EXACTLY thirteen numbered interactions, rows 01 through 13, with time flowing DOWN. Position every label next to its own connector with plenty of separation. An arrowhead must land precisely on the named target lifeline. There must be exactly one interaction on each row. Use solid single-headed arrows for message lines unless explicitly specified as dashed below.

01 Client -> WhatsApp: "Message"
02 WhatsApp -> Petal: "Webhook"
03 Petal -> Petal: "Commit event, sequence and work records" (a visible rightward self-call loop returning into Petal's own lifeline)
04 Petal -> WhatsApp: "Webhook acknowledgement" (DASHED response arrow, pointing LEFT from Petal into WhatsApp)
05 Petal -> Petal: "Recoverably schedule and select next event" (rightward self-call loop returning into Petal)
06 Petal -> Maya: "Evaluate scoped turn" (solid arrow pointing RIGHT)
07 Maya -> Petal: "Versioned proposal and sources" (DASHED response arrow pointing LEFT)
08 Petal -> Petal: "Commit accepted result, intent and work" (rightward self-call loop returning into Petal)
09 Petal -> Dispatcher: "Wake dispatcher" (solid arrow pointing RIGHT, passing across Maya's lifeline without a junction)
10 Dispatcher -> Petal: "Atomically claim against takeover and holds" (solid arrow pointing LEFT, passing across Maya's lifeline without a junction)
11 Dispatcher -> WhatsApp: "Submit authorized message" (solid arrow pointing LEFT, passing across Maya and Petal lifelines without junctions)
12 WhatsApp -> Petal: "Delivery receipt" (DASHED arrow pointing RIGHT)
13 Petal -> Maya: "Ingest canonical interaction and outcome" (solid arrow pointing RIGHT)

Use discreet phase labels in the far-left margin: "Accept" beside rows 01–05, "Evaluate" beside 06–08, "Dispatch" beside 09–12, "Continuity" beside 13. These are phase headings, not extra participants.
Keep row numbers 01–13 visible near each row in the left gutter so sequence order is easy to check.
If needed, wrap long row labels into two lines without changing their words.

Footer exact text: "Time flows downward · Webhook acknowledgement is not a client reply"
Second footer exact text: "Maya proposes; Petal authorizes; the dispatcher submits."

Constraints: exactly these five participants and thirteen interactions; no invented response arrows, no arrow from Maya into WhatsApp, no additional WhatsApp-to-Client delivery arrow. Preserve the three Petal self-call loops as self-calls, not Petal-to-Maya calls. Arrow 10 is Dispatcher-to-Petal, not Petal-to-Dispatcher. Arrow 12 is WhatsApp-to-Petal, not Petal-to-WhatsApp. Dash only rows 04, 07 and 12; other messages are solid. Crossings with unrelated vertical lifelines are not endpoints. No arrow starts or ends midway between participant lifelines. No cropped text, no duplicated numbers, no omitted rows. Favor exact engineering meaning and legibility over decorative elements.
```
