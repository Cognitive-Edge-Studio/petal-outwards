# Maya Developer Docs

Maya is a channel-independent persona service. This guide covers what your application needs to integrate: use cases, the request flow, API operations, contracts, and code examples. **Contract status: draft.** The behaviors follow the [system design](06-system-design-document.md); endpoint paths, JSON field names, authentication provisioning, and HTTP mappings below are proposed examples. A hosted API, SDK, and finalized OpenAPI specification are not available yet.

## What you can build

Use Maya to add approved persona behavior and private relationship continuity to your application. The table below separates its capabilities from your integration responsibilities.

| Use case | What Maya provides | What your application provides |
|---|---|---|
| A professional's conversational assistant | Replies grounded in approved service information; clarification when information is missing | Client identity, the messaging interface, and delivery |
| Ongoing client relationships | Private, source-linked context for each professional–client pair | Ordered interaction history and confirmed outcomes |
| Sharing approved material | A proposal referencing an approved document and immutable version | Access checks, retrieval of that version, and delivery evidence |
| Human handoff | An escalation reason and proposed acknowledgement | A case or inbox, notification, takeover, and explicit return of control |

The same integration boundary works with your chosen transport. Maya does not need a WhatsApp number, email address, or provider-specific recipient ID.

## Integration flow

Call Maya from your backend. Keep service credentials there. Your application remains responsible for user identity, conversation ownership, approvals, and external effects.

```text
Client message
  → Your backend: authenticate scope, persist and order the event
  → Maya: evaluate using approved knowledge and private context
  ← Maya: return a typed proposal and its context revisions
  → Your backend: validate, authorize, and send or hand off
  → Maya: ingest accepted interactions and actual outcomes
```

1. **Provision the persona.** Have the owner draft, test, approve, and publish instructions and knowledge before client use. A draft is not an active persona.
2. **Accept the interaction.** Resolve professional and client identity from your own trusted bindings, persist the event, and assign its order. Process one conversation in order.
3. **Synchronize context.** Ingest preceding canonical interactions and outcomes, then read Maya's current context manifest. A turn requires the preceding interaction cursor and current revisions.
4. **Evaluate the turn.** Send the current message, bounded transcript, scope, ownership version, processing token, expected manifest, and supported capabilities.
5. **Act on the proposal.** Check that your worker, conversation ownership, and holds are current. Validate Maya's current authority, then authorize the exact action and recipient before claiming delivery. Coordinate sends with publication and data-change holds so validation cannot race a completed mutation.
6. **Report the outcome.** Feed accepted interactions and actual submission, delivery, failure, and human actions back to Maya. A proposed response is not evidence that a message was sent.

If a professional takes over during evaluation, reject the late autonomous proposal. Maya resumes only after explicit return of control. Messages during takeover can update private context without causing autonomous replies.

## Authentication and scope

Use an authenticated service identity authorized for the intended professional and client relationship. IDs in JSON do not grant access. A server-side binding must establish which scopes that service may use.

The examples use `Authorization: Bearer <service-token>` as a proposed HTTP convention. Token issuance, audience, expiry, and onboarding must be finalized with the service contract. Owner operations also need a verified owner principal; a service token alone cannot approve or publish standing changes.

| Value | Integration meaning |
|---|---|
| `professional_id` | Stable owner identity, resolved by your backend |
| `client_id` | Stable private relationship identity within that professional's scope |
| `conversation_id` | Your application's conversation reference |
| `inbound_event_id` | A durable reference to the accepted incoming event |
| `ownership_version` | Changes when the professional takes over or returns control |
| `processing_token` | Your current worker's fencing token; an expired worker cannot accept a result |
| `correlation_id` | A trace reference echoed through calls and outcomes |
| `Idempotency-Key` | A scoped operation key, persisted across retries of the same semantic input |

Never let a client message, model output, or uploaded document choose these identities or expand permissions. Send only the context needed for this relationship and turn.

## API structure

The versioned HTTP API is the integration boundary. **These paths are illustrative**, with behaviors derived from the existing design. Finalize them in OpenAPI before generating a client.

| Proposed method and path | Purpose | When you need it |
|---|---|---|
| `GET /v1/professionals/{professional_id}/clients/{client_id}/context` | Read the current manifest, ingestion cursor, and mutation status | Before evaluating a turn |
| `POST /v1/turns/evaluate` | Return a scoped, typed proposal | For an eligible client turn |
| `POST /v1/proposals/{decision_id}/validate` | Check current Maya authority and referenced revisions | Before authorizing an external effect |
| `GET /v1/approved-items/{item_id}/versions/{version_id}` | Resolve an immutable approved item with authenticated scope and intended purpose | For a document-share proposal |
| `POST /v1/interactions` | Ingest an ordered canonical interaction or outcome | For continuity, including human replies and delivery evidence |
| `GET /v1/professionals/{professional_id}/clients/{client_id}/memory` | Inspect sourced relationship memory | If your workspace exposes memory inspection |
| `POST /v1/relationship-briefs` | Add an owner-authored, source-linked private brief | If the owner seeds a relationship |
| `POST /v1/personas/{persona_id}/{operation}` | Draft, test, approve, publish, or restore exact persona revisions | If your workspace manages personas |
| `POST /v1/lifecycle-operations` | Coordinate correction, export, or deletion using a shared operation ID | When handling relationship data changes |

Approved knowledge follows the same tested and approved lifecycle as persona content. Publication, revocation, correction, and deletion require coordination with your application's pending work and dispatch holds. Consult the [system design's lifecycle rules](06-system-design-document.md) when implementing those operations.

## Request and response contract

The examples below illustrate one text turn. Opaque IDs and digests are placeholders. The `expected_context` values must come from Maya's context manifest, rather than hardcoded constants.

### Evaluate request

```json
{
  "correlation_id": "trace_01",
  "professional_id": "pro_01",
  "client_id": "client_01",
  "conversation_id": "conversation_01",
  "inbound_event_id": "event_42",
  "turn_key": "turn_event_42_owner_7_context_12",
  "input_digest": "sha256:<canonical-semantic-input-digest>",
  "ownership_version": 7,
  "processing_token": "worker_fence_19",
  "expected_context": {
    "publication_id": "publication_12",
    "knowledge_revision": "knowledge_4",
    "permission_revision": "permissions_3",
    "data_revision": "relationship_8",
    "retrieval_settings_digest": "sha256:<settings-digest>",
    "runtime_build": "maya_runtime_1"
  },
  "required_interaction_cursor": 41,
  "capabilities": ["text_reply", "human_handoff"],
  "message": {
    "id": "message_42",
    "role": "client",
    "text": "What does the introductory consultation include?"
  },
  "recent_transcript": []
}
```

`recent_transcript` is a bounded canonical slice from your application, not an arbitrary history supplied by the client. Maya retrieves its own approved persona, scoped knowledge, and private memory. Capabilities describe supported effects; they are not grants of authority.

`turn_key` identifies the accepted event and ownership/context revisions. `input_digest` covers semantic input including message, required cursor, expected revisions, and capabilities. Exclude renewable processing tokens and trace-only metadata. Use the finalized canonicalization rules consistently across services.

### Evaluate response

```json
{
  "correlation_id": "trace_01",
  "operation_id": "operation_01",
  "decision_id": "decision_01",
  "type": "reply",
  "proposal": {
    "text": "The introductory consultation covers your goals and the available service options."
  },
  "context": {
    "publication_id": "publication_12",
    "knowledge_revision": "knowledge_4",
    "permission_revision": "permissions_3",
    "data_revision": "relationship_8",
    "retrieval_settings_digest": "sha256:<settings-digest>",
    "runtime_build": "maya_runtime_1"
  },
  "sources": [
    { "kind": "approved_knowledge", "id": "consultation_overview", "version": "4" }
  ]
}
```

This response illustrates a fictional approved fact. It proposes text; your backend still selects the trusted recipient, checks current authority and ownership, and records an immutable outbound intent. Do not render a proposal as a completed action.

| `type` | Proposed payload | Your application's next step |
|---|---|---|
| `reply` | `proposal.text` | Validate and authorize the reply before delivery |
| `ask` | `proposal.text` | Deliver an authorized clarification request |
| `share_approved_item` | `proposal.item_id`, `proposal.version_id` | Resolve the exact approved item, check access, and authorize delivery |
| `escalate` | `proposal.reason`, `proposal.acknowledgement` | Create/update a case, pause Maya, and separately authorize acknowledgement and owner notification |

Unknown result types must fail closed. A price, appointment, or other commitment needs explicit approval for the exact immutable proposed action, even if the text looks ready to send.

## Code examples

These examples target the proposed contract above. Supply your own deployed base URL and service token when an implementation is available. They do not use a public Maya endpoint or SDK.

### cURL: evaluate a prepared turn

Save the evaluate-request JSON above as `turn.json`, replacing its placeholders with current authoritative values. On a shell that supports this syntax:

```bash
# Set MAYA_BASE_URL and MAYA_SERVICE_TOKEN in your server environment.
curl --request POST "${MAYA_BASE_URL}/v1/turns/evaluate" \
  --header "Authorization: Bearer ${MAYA_SERVICE_TOKEN}" \
  --header "Content-Type: application/json" \
  --header "Idempotency-Key: turn_event_42_owner_7_context_12" \
  --data-binary @turn.json
```

### TypeScript: a server-side HTTP adapter

Generate request and response types and runtime validators from the finalized OpenAPI schema. This minimal transport adapter accepts an operation-specific validator so untrusted response JSON is checked before it reaches your application.

```typescript
type Validator<T> = (value: unknown) => T;

class MayaApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(`Maya returned HTTP ${status}`);
  }
}

async function mayaPost<T>(
  path: string,
  body: unknown,
  idempotencyKey: string,
  validate: Validator<T>,
): Promise<T> {
  const baseUrl = process.env.MAYA_BASE_URL;
  const token = process.env.MAYA_SERVICE_TOKEN;
  if (!baseUrl || !token) throw new Error("Maya configuration missing");

  const response = await fetch(new URL(path, baseUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000), // Illustrative caller timeout.
  });

  const data: unknown = await response.json();
  if (!response.ok) throw new MayaApiError(response.status, data);
  return validate(data);
}

// request: your prepared, scoped evaluate request.
// validateTurnResult: runtime validator from the finalized contract.
// const result = await mayaPost(
//   "/v1/turns/evaluate", request, request.turn_key, validateTurnResult,
// );
```

Choose timeouts and bounded retries from measured service behavior. A caller timeout does not prove the operation failed: replay the same semantic request with the same idempotency key to recover its existing result.

### Handle the decision in your application

The following is pseudocode: the functions represent your application's persistence, authorization, and messaging adapter. A successful validation call is not a reusable send token.

```text
result = evaluate(prepared_turn)

if current_worker_or_ownership_changed(prepared_turn):
    discard(result)
    return

match result.type:
    reply | ask:
        validate_current_maya_authority(result)
        atomically_authorize_and_claim_exact_intent(
            result, trusted_recipient, current_ownership, mutation_holds
        )
        submit_and_record_actual_outcome()

    share_approved_item:
        resolve_exact_approved_version(result)
        validate_current_maya_authority(result)
        atomically_authorize_and_claim_document_intent()
        submit_and_record_actual_outcome()

    escalate:
        atomically_create_case_and_pause_maya(result)
        enqueue_authorized_acknowledgement_and_owner_alert()

    otherwise:
        reject_unknown_proposal()

ingest_ordered_accepted_interactions_and_observed_outcomes()
```

## Continuity and handoff

Maya's private memory stays useful when your application supplies human replies and real action outcomes, including those outside autonomous turns.

An interaction includes authenticated professional/client scope, a unique event ID, relationship sequence, canonical source ID and revision, actor, expected data revision and cursor, and observed outcome. Replays must be idempotent. If Maya reports a cursor gap, replay the missing events before later events or turns.

Keep `proposed`, `submitted`, `delivered`, `failed`, and `confirmed/executed` evidence distinct. A cancelled proposal must never become a remembered completed action. A human answer is an observation, not a command to resume Maya. Only an explicit owner return of control changes that state.

Corrections and deletions require a coordinated lifecycle operation that holds affected work, invalidates stale context, and records completion across both services. An export or memory correction endpoint is not a substitute for that coordination.

## Errors and retries

Domain error codes are defined in the system design. The JSON envelope below is proposed; final HTTP status mappings remain to be fixed in OpenAPI.

```json
{
  "correlation_id": "trace_01",
  "operation_id": "operation_01",
  "error": {
    "code": "stale_context",
    "message": "The expected context is no longer current."
  }
}
```

| Code | Caller action |
|---|---|
| `unauthenticated` / `forbidden` | Stop and resolve identity or scope; never substitute a model-selected identity |
| `idempotency_conflict` | The key was reused with different semantic input; preserve the original outcome and correct the operation |
| `stale_context` / `superseded` | Reload authoritative state and re-evaluate still-eligible work with a new turn key |
| `cursor_gap` | Replay missing canonical interactions to the expected cursor |
| `scope_suspended` | Keep work held or cancelled according to the lifecycle operation |
| `not_authorized` | Stop the action; escalate or obtain fresh approval |
| `temporarily_unavailable` | Keep durable pending work and apply bounded retries and your outage/handoff policy |

The same scoped key and semantic digest returns the existing result. Changed semantic input under that key is a conflict. A replacement worker can replay a decision but must accept it with its own current processing token.

Retries of Maya calls must not cause duplicate client sends. Your application separately deduplicates immutable outbound intents. An ambiguous transport submission must be reconciled before another send; a Maya idempotency key does not make your messaging provider idempotent.

## Integration checklist

- Bind service identity to professional/client scope on the server; keep tokens out of browser bundles.
- Publish tested, approved persona and knowledge revisions before evaluating client turns.
- Persist incoming events, serialize each conversation, and synchronize the interaction cursor.
- Validate response JSON and handle every typed proposal, including unknown types and handoff.
- Recheck ownership, current Maya authority, recipient, permission, and mutation holds before effects.
- Retain exact commitment approvals and exact approved document versions.
- Replay calls idempotently and record actual human actions and delivery outcomes.
- Exercise duplicate events, takeover during generation, stale context, cross-client denial, outages, and correction/deletion before real use.

For the underlying behavioral contract, see [System Design](06-system-design-document.md). For confirmed service boundaries, see [Technical Architecture](04-technical-architecture-and-engineering-guidelines.md). These documents supplement this guide when implementing ownership, publication, or data-lifecycle coordination.
