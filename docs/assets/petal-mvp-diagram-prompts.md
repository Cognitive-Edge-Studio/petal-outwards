# Petal MVP diagram prompts

## Saved assets

- Journey: [petal-mvp-journey.png](petal-mvp-journey.png)
- Relationship continuity: [petal-mvp-continuity.png](petal-mvp-continuity.png)
- Human handoff: [petal-mvp-handoff.png](petal-mvp-handoff.png)

## Continuity refinement

The initial continuity image had no visible arrowhead on connector 04. The final selected image uses the following built-in image edit prompt:

```text
Edit the supplied Petal relationship-context diagram. Change only connector 04: it must be a directed downward arrow from the bottom of "Assemble context for Client A" to the top of "Reply to Client A". Its current line lacks a visible arrowhead. Add a clearly visible blue triangular arrowhead at the top border of the reply card, with enough space below the 04 badge that the arrowhead is fully visible. Increase the gap between these two cards slightly if needed, moving the reply card and footer down while keeping them fully inside the image. Preserve every other word, icon, card, boundary, color, source and all other three arrows. Keep Client B disconnected and private. Do not add any other connection.
```

Generation method: built-in image generation tool. These visuals illustrate the confirmed product scope. Final PNG assets are saved alongside this prompt set.

## journey

Final asset: `petal-mvp-journey.png`.

```text
Use case: infographic-diagram. Asset type: a documentation diagram for Petal Product Requirements and MVP Scope.
Create a polished landscape raster diagram, approximately 3000 by 1900 pixels, with a white background, dark navy large readable sans-serif text, rounded panels, flat icons, generous spacing and restrained blue, teal and purple colors. Amber indicates escalation, green indicates approved client replies. Professional technical-document quality, no photorealism, no decorative scenery or invented features. Every arrowhead must touch its specified target card and all labels must be legible.
Title exact: "Petal: From a Shared Profile to a Client Conversation"
Subtitle exact: "One professional · No client account · Two distinct WhatsApp channels"

An informational readiness banner beneath the title (no connecting arrows):
"Before go-live: approved profile and service information · Published Maya settings · Tested WhatsApp connection · Successful handoff test"

Six large cards in a two-row snake flow. Top row left to right:
A "Client opens shared profile", with a person/profile icon and "Learn about the professional; no Petal login".
B "Professional's WhatsApp business number", green-blue phone/chat icon and "Client sends text messages".
C "Maya evaluates the message", blue persona/chat icon and "Approved information + this client's private context" and "Answer · Ask · Share an existing approved document".

Bottom row physically left to right:
F "Professional reviews and directs", purple person icon and "Reply to the case alert or use the inbox" and "Directions apply to the identified case".
E "Case and professional alert", a large purple panel containing two visually distinct small areas: "Petal inbox" with inbox icon, and "Separate Petal-managed control number" with phone/chat icon. Supporting text "WhatsApp alert identifies the client and case". These are two surfaces for the same case, no arrow between them.
D "Needs professional review", amber panel and "Maya acknowledges the request and pauses replies".

Exactly five numbered directed arrows:
01 A -> B, pointing right.
02 B -> C, pointing right.
03 C -> D, pointing down, labeled "If review is needed".
04 D -> E, pointing LEFT, labeled "Case + alert".
05 E -> F, pointing LEFT, labeled "Review and direct".
Do not add arrows between the two WhatsApp numbers. The client-facing business number serves clients; the separate Petal control number serves the professional. No arrow back to Maya that could imply automatic resumption.
Footer two compact callouts:
"Case directions use current permissions. Commitments require explicit professional approval."
"Ongoing Maya replies resume only after an explicit return of control."
Small note: "AI notice on the first Maya reply and when Maya resumes after the professional has replied."
Spell all copy exactly and keep the conditional escalation clear.
```

## continuity

Final asset: `petal-mvp-continuity.png`.

```text
Use case: infographic-diagram. Asset type: a documentation diagram for Petal Product Requirements and MVP Scope.
Create a polished landscape raster diagram, approximately 3000 by 1900 pixels, with a white background, dark navy large readable sans-serif text, rounded panels, flat icons, generous spacing and restrained blue, teal and purple colors. Amber indicates escalation, green indicates approved client replies. Professional technical-document quality, no photorealism, no decorative scenery or invented features. Every arrowhead must touch its specified target card and all labels must be legible.
Title exact: "Petal: The Right Context for Each Client"
Subtitle exact: "Approved professional information + only the current client's private context"

Top-center standalone large card A:
"Professional's published Maya persona"
"Approved identity · Knowledge · Settings · Permissions"
Professional avatar and approved-document icons.

Two clearly separated ownership groups in the middle, left and right, with a wide empty center corridor:
LEFT group headed "Maya owns relationship memory".
Inside two vertically arranged cards:
B, highlighted blue/teal: "Client A · Private memory"
"Facts · Preferences · Episodes · Follow-ups"
"Optional source-linked professional brief"
small lock icon.
B2, muted gray: "Client B · Private memory"
"Private to Client B"
lock icon.
RIGHT group headed "Petal owns conversation and case records".
Inside two vertically arranged cards:
C, highlighted blue/teal: "Client A · Conversation and case"
"Messages · Directions · Decisions"
small lock icon.
C2, muted gray: "Client B · Conversation and case"
"Private to Client B"
lock icon.

Below the two ownership groups centered large blue card D:
"Assemble context for Client A"
"Current message + approved persona + relevant Client A context"
At bottom centered green card E:
"Reply to Client A"
"Within the professional's current permissions"

Exactly four directed numbered arrows, routed in generous whitespace without passing through any unrelated card:
01 A -> D, a vertical arrow running down the empty CENTER corridor between the ownership groups, ending at the top of D.
02 B -> D, a separate arrow from the side of Client A memory card routed out of its ownership group and into the LEFT side of D. Avoid B2.
03 C -> D, a separate arrow from Client A conversation/case card routed out of its ownership group and into the RIGHT side of D. Avoid C2.
04 D -> E, vertical down arrow.
No arrows from B2 or C2. No arrows between client memories, no shared private memory pool, no memory-to-approved-persona arrow. Show two ownership groups as storage boundaries, not as separate products.
Footer exact: "Client B's information stays outside Client A's conversation."
Second footer exact: "Continuity grows through Petal interactions; automatic import of older WhatsApp chats is not required."
```

## handoff

Final asset: `petal-mvp-handoff.png`.

```text
Use case: infographic-diagram. Asset type: a documentation diagram for Petal Product Requirements and MVP Scope.
Create a polished landscape raster diagram, approximately 3000 by 1900 pixels, with a white background, dark navy large readable sans-serif text, rounded panels, flat icons, generous spacing and restrained blue, teal and purple colors. Amber indicates escalation, green indicates approved client replies. Professional technical-document quality, no photorealism, no decorative scenery or invented features. Every arrowhead must touch its specified target card and all labels must be legible.
Title exact: "Petal: Human Handoff and Case Status"
Subtitle exact: "Maya pauses for the professional; resumption requires an explicit return of control"

Top-left small entry card E:
"Escalation"
"Acknowledge request and pause Maya replies"

Main horizontal row, left to right, four large distinct case-state cards:
W "Waiting for professional", amber, clock icon.
Inside W supporting short text "Initial case-linked WhatsApp alert" and "Reminder only if unanswered".
H "Being handled by professional", purple, professional icon.
Inside H text "Review context, reply or give case directions".
R "Resumed by Maya", blue/teal, play/chat icon.
Inside R text "Use current approved settings and client context".
Z "Resolved", green, check icon.
Inside Z text "Case closed; ownership stays unchanged".

Exactly five numbered directed arrows:
01 E -> W, arrow vertically down with arrowhead touching the top edge of W.
02 W -> H, arrow horizontally right, labeled "Professional handles case".
03 H -> R, arrow horizontally right, labeled "Explicit return of control".
04 H -> Z, a distinct lower bypass route below all state cards, labeled "Professional resolves case". Its source is H's bottom edge and arrowhead touches Z's bottom edge. It must not connect to R.
05 R -> Z, arrow horizontally right, labeled "Professional resolves case".
No arrow from Resolved back to Maya. No automatic resume, no timer-to-resume arrow, no mandatory requirement to resume before resolving. Keep label 03 large enough to read.

Below this state diagram, two informational callouts with no arrows:
"Alerts and directions use the separate Petal-managed control number."
"Reminder timing and response targets will be set in the delivery plan."
Footer exact: "A one-off case direction or case resolution does not automatically return control to Maya."
Small bottom note exact: "Illustrative paths for the confirmed inbox states; detailed transition rules belong to the system design."
```
