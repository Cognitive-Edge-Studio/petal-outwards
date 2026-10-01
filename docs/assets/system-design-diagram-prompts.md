# System design diagram prompts

Generated with the built-in image generation tool. These three figures supplement Document 06 in sections 6.8, 7.1, and 8.2. The existing botanical image is the temporary website cover.

## system-design-ownership-transitions.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2, 1536x1024. Polished, highly legible flat editorial technical diagram on white, navy text, soft blue Petal cards, lavender Maya cards, warm cream professional cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads. Exact stated connections only. No watermark.
Title: "Who controls the conversation?"
Three large state cards arranged in a triangle: top left "maya_active" / "Autonomous replies allowed"; top right "awaiting_professional" / "Maya paused · case waiting"; bottom center "professional_active" / "Maya paused · professional handling".
Exactly five directed arrows: maya_active -> awaiting_professional labeled "Escalation / outage handoff"; awaiting_professional -> professional_active labeled "Takeover / inbox reply"; maya_active -> professional_active labeled "Direct takeover"; awaiting_professional -> maya_active labeled "Explicit owner resume"; professional_active -> maya_active labeled "Explicit owner resume". Give forward and return arrows separate clear lanes. Do not overlap connectors or text. Leave spacious room around the central triangle. State cards use blue, cream, cream respectively.
Bottom two unconnected callout cards: "One-off direction: sends only the approved reply; Maya stays paused." and "Case resolution: closes the case; ownership stays unchanged."
Footer: "Transitions compare authority and current version · Claimed sends remain visible in flight".
Never imply automatic resume, case resolution resumes, or takeover recalls an in-flight send.


## system-design-mutation-barrier.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2, 1536x1024. Polished, highly legible flat editorial technical diagram on white, navy text, soft blue Petal cards, lavender Maya cards, warm cream professional cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads. Exact stated connections only. No watermark.
Title: "Correct or delete without stale work"
Main layout four numbered columns with two horizontal service swimlanes. Top lavender lane "Maya · authoritative revisions", bottom blue lane "Petal · processing and dispatch holds".
Column 1 header "1 Prepare". Maya card "Record scoped operation / Block affected validation". Petal card unconnected label "Same operation ID".
Column 2 header "2 Hold". Petal card "Commit hold / Stop new turn and send claims / Disclose in-flight attempts". Maya card "Wait for hold acknowledgement".
Column 3 header "3 Apply". Maya card "Apply change / Increment revision / Invalidate derived context". Petal card "Update transcript projection / Remove applicable copies / Cancel stale work".
Column 4 header "4 Confirm". Two cards Maya "Acknowledge change" and Petal "Refresh revision and readiness".
Use a single clear thin teal horizontal progress arrow above columns 1 through 4. No arbitrary intercard arrows. Below column4, a downward arrow forks to TWO terminal cards side by side: "Correction / publication" with "Release hold after both acknowledgements", and "Deletion" with "Keep tombstone and processing block". Broad bottom callout unconnected: "Failure: scope stays held; durable work retries by operation ID." Footer: "Earlier claimed sends may already be in flight · Each service changes only its own data". Correct deletion terminal remains blocked, never release deleted relationship.


## system-design-improvement-loop.png

Use case: infographic-diagram. Asset type: technical document figure, landscape 3:2, 1536x1024. Polished, highly legible flat editorial technical diagram on white, navy text, soft blue Petal cards, lavender Maya cards, warm cream professional cards, teal arrows, subtle rounded rectangles, restrained line icons. Large readable labels, ample whitespace, crisp arrowheads. Exact stated connections only. No watermark.
Title: "Improve through tested, owner-approved changes"
Six numbered cards, top row left to right1,2,3; bottom row left to right6,5,4. Exactly six directed connectors form clockwise cycle1->2->3->4->5->6->1. Clean orthogonal routing no overlaps.
1 blue "Verified feedback" / "Petal records corrections and outcomes".
2 lavender "Bounded candidate" / "Maya proposes one allowed change".
3 lavender "Isolated evaluation" / "Trusted synthetic suites / Exact baseline and candidate".
4 warm cream "Owner review" / "Approve exact tested change and report". Small note inside4 "Retrieval tuning also needs engineering approval".
5 lavender "Publish with holds" / "Existing lifecycle / Recheck evidence and revisions".
6 blue "Observe later use" / "Trace decisions to effective manifest".
Under loop unconnected callout strip "Incomplete tests or stale evidence block adoption".
Footer two short lines "Learning workers cannot publish or send client messages" and "Publication and restore never resume paused conversations".
No raw client transcript imagery, no direct candidate->publish path, no automatic publication or restoration.
