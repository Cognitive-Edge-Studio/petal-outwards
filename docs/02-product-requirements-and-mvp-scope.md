# Maya MVP Scope

Status: Confirmed Session 2 product scope, extended on 1 October 2026 by the user's request to include a bounded self-improving loop in the MVP. Detailed loop design and operating parameters remain proposals; measured performance and pilot results require implementation evidence.

## Purpose and sequence

Maya is a reusable persona system that can represent different people across separate relationships. The MVP establishes that foundation before Petal is implemented. Petal is its first planned application, and its product requirements will be documented in the next session. Petal's implementation can then use what Maya proves and adjust to what validation reveals.

Maya starts as a reusable system with a small interface for configuring and testing personas, without a separate public launch. It should not depend on Petal's profiles, marketplace, or WhatsApp experience. The care, IELTS, and teaching examples in *The Story* show Maya's wider potential; they do not make specialized health or education workflows part of this MVP.

## MVP users and validation approach

- Begin with text conversations. Voice messages follow in a later stage, then live calls. Neither voice stage is required for this Maya MVP or Petal's initial release.
- Validate Maya with two distinct personas and multiple private relationships for each, using a general professional scenario and a teaching scenario. These are validation cases, not separate products to launch.
- Let the represented person configure, test, and approve their persona through the small interface; the project team may assist during the pilot.
- Demonstrate correct use of approved knowledge, separation of relationship histories, enforcement of delegated permissions, human takeover, and a reviewable record of actions before Petal implementation.

![Two validation personas with separate private relationships and a reusable Maya foundation](assets/maya-mvp-relationships.png)

*Figure 1. Two validation personas use the same Maya foundation. Each relationship keeps its own private history and memory; approved persona context applies only within that owner's relationships. Three relationships per persona are illustrative, not an MVP limit.*

## Maya MVP: owner control and conversation behavior

![Owner-controlled persona lifecycle from draft through testing and approval to publication, with an explicit restore path](assets/maya-mvp-publication.png)

*Figure 2. The owner approves the tested version before publication. Draft changes return through testing and approval, and restoring the previous approved version requires the owner's choice.*

The first Maya implementation must support:

- A distinct persona configuration for each person represented, including identity, style, instructions, approved knowledge, and delegated permissions. The project team can assist during the pilot. Changes follow a draft, test, owner approval, and publish flow; the owner can restore the previous published version.
- Separate conversation histories for each relationship and each persona owner. Maya may save source-linked, client-specific facts as private relationship memory. The owner can inspect and correct those facts. Only owner-approved changes can enter knowledge shared across that owner's relationships; a client's statement must not silently become general approved information.
- Immediate evaluation of each incoming text message. Depending on its content and persona settings, Maya can answer from approved information, ask for missing details, propose or share an approved item, or escalate to the owner. An absence switch is not required.
- Explicit permission checks for actions. Custom document generation is a later capability. Personalized documents and commitments require human review before they are sent or made.
- Unknown answers: when approved information does not support a service fact, Maya says she cannot confirm it and hands the question to the owner rather than guessing.
- Human handoff: when Maya needs review, she acknowledges the request promptly and pauses replies in that conversation. The owner can inspect the context, act, and explicitly return control to Maya. Maya must not send a competing reply while the owner has control.
- A reviewable record of what Maya answered, proposed, shared, or escalated, and which persona configuration and authority applied.
- A bounded self-improving loop: capture verified feedback, identify supported gaps, draft a small knowledge, instruction, or allowlisted persona retrieval change, and evaluate it against the current configuration. The represented person reviews the exact tested change and explicitly approves and publishes it; retrieval tuning also needs engineering review. Observe later outcomes and support restoring a still-valid earlier approved version. Private client facts cannot become general knowledge through this process. Document 07, Self-Improving Loop: Design and MVP Scope, defines the proposed mechanisms and gates.

The first validation can use the text-based testing interface without WhatsApp.

![Incoming-message evaluation and the human handoff flow, with Maya paused until the owner explicitly returns control](assets/maya-mvp-handoff.png)

*Figure 3. Message evaluation selects a permitted response or owner escalation. Escalation leads to acknowledgement and paused Maya replies, followed by owner handling and an explicit return of control before Maya resumes. The response branches are alternatives, not sequential steps.*

## Maya validation gates

Test two distinct personas in general professional and teaching scenarios, with multiple private relationships under each. Before Petal implementation, the test evidence should show that Maya:

- Answers supported questions using approved knowledge.
- States that an unsupported service answer cannot be confirmed and escalates it rather than inventing a fact.
- Keeps one relationship's history and one owner's information out of other conversations.
- Saves private relationship facts with traceable sources; corrections affect future responses without changing general approved knowledge.
- Blocks an unapproved action or commitment even if a message asks Maya to perform it.
- Acknowledges and hands off a request that needs the owner, then stops replying until control is returned.
- Leaves an inspectable record of the response or action and the configuration that governed it.
- Applies only a published, owner-approved persona version in live conversations and can restore the previous version.
- Completes a synthetic feedback-to-improvement cycle for both validation personas: a supported gap, bounded candidate, paired tests, explicit owner approval/publication, later use, observation decision, and restore exercise. Failed gates or stale evidence must block adoption; the test interface can prove the loop before Petal exists.

The ambition to handle roughly 100 simultaneous conversations for one persona is a separate capacity gate before a Petal pilot. Functional behavior comes first; representative load testing and acceptable response times will be specified in the delivery plan. Neither gate prevents documenting Petal's product requirements in the next session.

## Outside this MVP

- Voice messages, live calls, and voice cloning.
- Custom document generation and unreviewed personalized commitments.
- Specialized care, IELTS, or classroom workflows beyond the two text-based validation scenarios.
- A standalone public Maya product, professional discovery, and the WhatsApp channel experience.
- Autonomous changes to Maya's core beliefs or cross-persona learning from private conversations. Belief evolution remains an open topic for later discussion.

## Relationship to Petal

The next session will specify Petal's professional workspace, public profile, WhatsApp entry, client experience, and first-release boundaries. Those choices will remain distinct from Maya's reusable capabilities. Maya's functional validation is required before Petal implementation; the roughly 100-conversation capacity target is required before a Petal pilot.
