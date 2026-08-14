# Contracts

`openapi.yaml` is the source of truth for the backend API this app consumes. Client
types are generated from it — never hand-write or hand-edit API types.

## Workflow

1. Edit `contracts/openapi.yaml` to add or change an endpoint.
2. `npm run contracts:lint` — validates the spec against `.spectral.yaml` (OpenAPI
   best practices: every operation needs an `operationId`, a `description`, and a
   `tags` entry that's declared under the top-level `tags` list).
3. `npm run contracts:codegen` — regenerates `src/generated/api-types.ts` from the
   spec using `openapi-typescript`.

`src/generated/` is gitignored and regenerated on demand (locally via step 3 above,
and as a CI check that the spec still produces valid types) rather than committed,
so it can never drift silently out of sync with the checked-in spec.

Both steps are wired into `.github/workflows/ci.yml` and block merges on failure.
