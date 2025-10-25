Franchisor → Franchisee Management Spec
======================================

Purpose
-------
Define a clear spec so a Franchisor (business owner) can create, manage, and access Franchisee tenants (child tenants). This document includes UI screens, data model, API endpoints, permission rules, notifications, edge cases, tests, and a minimal implementation plan for the current prototype repository.

High-level contract
-------------------
- Inputs:
  - Franchisor identity (authenticated user + franchisor tenant context)
  - Franchisee data (name, contact email, subdomain, address, optional initial plan)
- Outputs:
  - New franchisee tenant created in system (tenant record + admin user/invite)
  - Email invitation sent to franchisee admin contact
  - Franchisor UI shows newly created franchisee in list
  - Links to open franchisee tenant site (subdomain or tenant url)
- Success criteria:
  - Franchisor can create and edit franchisee tenants from Franchisor dashboard
  - Franchisee receives an invite email with first-login link
  - Franchisor cannot create more franchisees than their plan supports (enforced)

Key actors & permissions
------------------------
- Super Admin: full system privileges (existing out-of-scope functions remain unchanged).
- Franchisor Admin(s): can create/modify/deactivate franchisee tenants that belong to their franchisor tenant. Can open or impersonate franchisee tenant site if permitted.
- Franchisee Admin: manages single franchisee tenant once activated.

UX / UI screens
----------------
1) Franchise Home (existing `Franchise_Home.html`) — Franchisor dashboard
   - Top-level: metrics, subscription status, "Create Franchisee" primary action.
   - Section: "My Franchisees" — table or cards showing each franchisee with columns/actions:
     - Name
     - Contact (email)
     - Subdomain or Tenant ID
     - Status (Pending, Active, Inactive)
     - Last Login
     - Actions: "Open site", "Invite admin", "Edit", "Deactivate"
   - Create Franchisee button opens a modal or page with a form (see below).

2) Create Franchisee modal/page (`franchisee_create_screen.html`)
   - Fields:
     - Franchisee Name (required)
     - Contact Admin Name (optional)
     - Contact Admin Email (required) — used to create/invite an admin user
     - Subdomain (optional) — validate uniqueness and allowed characters
     - Address / Phone (optional)
     - Initial Plan (optional; default inherits franchisor's plan settings)
     - Notes (optional)
   - Controls: Submit (Create & Invite), Cancel
   - Validation: required fields, email format, subdomain pattern and uniqueness, plan quota check.
   - On submit: call API to create tenant; show progress; on success show success toast and add row to "My Franchisees".

3) Franchisee Edit modal/page (`franchisee_edit_screen.html`)
   - Same fields as create; show status (Active/Inactive/Pending); allow updating contact, address, subdomain (if allowed), and subscription overrides.

4) Franchisee Details / Actions
   - Open site: navigates to franchisee tenant site (e.g., `https://<subdomain>.mydomain.com` or `Single_store_home.html?tenantId=<id>` for prototype).
   - Invite admin: re-send invite email with first-login link.
   - Deactivate: soft-delete / set status inactive (with confirmation modal). This should revoke access and optionally cancel billing.

Data model (minimal)
--------------------
- Tenant (existing model) — add or ensure fields to link child tenants to franchisor:
  - id (string)
  - name
  - type ("franchisor" | "franchisee" | "single-store")
  - parentTenantId (nullable) — for franchisee points to franchisor id
  - subdomain (nullable)
  - status ("pending" | "active" | "inactive" | "cancelled")
  - createdAt, updatedAt
  - billingPlanId (ref)
  - maxLocations, maxStaff (inherited if null)

- User (admin user) — ensure user has tenantId and role (admin, owner, staff)
  - id
  - name
  - email
  - tenantId
  - role
  - invited (boolean)
  - invitedAt
  - lastLogin

API endpoints (server-side) — REST style (examples)
---------------------------------------------------
Note: for prototype (static files) we will mock these client-side, but production should implement server endpoints.

- POST /api/franchisors/{franchisorId}/franchisees
  - Description: create franchisee tenant and invite admin
  - Body:
    {
      name, contactName, contactEmail, subdomain?, address?, initialPlanId?, notes?
    }
  - Response (201):
    {
      tenantId, status: 'pending'|'active', inviteToken?, message?
    }
  - Errors: 400 validation, 403 plan quota exceeded, 409 subdomain conflict

- GET /api/franchisors/{franchisorId}/franchisees
  - Returns array of franchisee tenants for that franchisor

- GET /api/franchisors/{franchisorId}/franchisees/{id}
  - Get single franchisee details

- PUT /api/franchisors/{franchisorId}/franchisees/{id}
  - Update franchisee details

- POST /api/franchisors/{franchisorId}/franchisees/{id}/invite
  - Re-send invite to contact email (creates/invites a user if not yet created)

- POST /api/franchisors/{franchisorId}/franchisees/{id}/deactivate
  - Soft-deactivate tenant (set status inactive, stop billing via billing provider)

Server-side actions (on create)
-------------------------------
1. Validate franchisor context and quota (does franchisor plan permit another franchisee?)
2. Validate uniqueness of subdomain
3. Create tenant record with parentTenantId set to franchisorId
4. Create admin user record with `invited = true` and generate secure invite token (expires)
5. Send email to contactEmail with invite link `https://app.example.com/invite?token=<token>&tenantId=<id>`
6. If creation is synchronous and payment already handled, set status 'active'; else 'pending'
7. Log audit event

Invite / First-login flow
-------------------------
- Invite email contains a link with token. When contact clicks, they finish setting name & password and become admin for that franchisee tenant. The invite flow must associate the user with the franchisee tenant.

Client-side prototype (static) suggestions
-----------------------------------------
- Add `franchisee_create_screen.html` with a form and a JS mock that "creates" a franchisee in memory and stores it in localStorage (or in a global `tenantData` object) and adds it to a list view in `Franchise_Home.html`.
- For "Open site" action, link to `tenant_edit_screen.html?tenantId=<id>` or to `Single_store_home.html?tenantId=<id>` to simulate subdomain routing.
- For production, the payment success handler should include the `tenantId` and `type=franchisor|single` in the query string to allow redirect.

Validation & business rules
---------------------------
- Subdomain pattern: /^[a-z0-9-]{3,30}$/ — no uppercase, no special chars except hyphen
- Subdomain uniqueness check server-side; in prototype do best-effort check in localStorage
- Franchisor plan quota: if franchisor.plan.maxLocations exists, do not allow creating more than allowed franchisees
- Email required and validated
- Prevent franchisor from editing another franchisor's franchisees (enforce parentTenantId)

Security considerations
-----------------------
- Authorization: every API must verify that the current user is authorized (belongs to franchisor tenant and has admin role)
- Invite token: cryptographically secure, expires (e.g., 24 hours)
- Rate limiting/create quotas: to avoid automated creation
- Audit logging for create/update/deactivate actions
- Do not return sensitive data in client responses (e.g., invite tokens should be used only once and not leaked in logs)

Notifications & emails
----------------------
- On create: send invite email to franchisee admin contact
- On activation: send confirmation to franchisor and franchisee admin
- On deactivate: notify franchisor and franchisee admin
- Email templates: simple HTML templates matching existing style

Acceptance criteria & tests
---------------------------
- Unit tests for server-side create/update operations (validate errors for invalid input, quota exceeded, duplicate subdomain)
- Integration tests for invite flow (token generation & redemption)
- Manual E2E: Franchisor logs in → Create Franchisee → Franchisee invite email received → Click invite → finish registration → can login to franchisee tenant

Edge cases
----------
- Duplicate subdomain attempted: return 409
- Franchisor quota exceeded: return 403 with friendly message explaining upgrade options
- Invite email bounce: provide "resend invite" action and an admin UI to update contact email
- Create while payment still pending: mark franchisee as 'pending' and only activate after payment verification

Minimal repo changes (prototype)
---------------------------------
1. Add `franchisee_create_screen.html` (form + client-side mock create)
2. Add small section to `Franchise_Home.html`:
   - Include a list of franchisees (load from mock storage)
   - Add "Create Franchisee" button that links to `franchisee_create_screen.html` or opens a modal
3. Add `franchisee_edit_screen.html` (optional) or reuse `tenant_edit_screen.html` for franchisee details
4. Wire "Open site" to `tenant_edit_screen.html?tenantId=<id>` for prototype
5. Add minimal JS utils file `franchisee-management.js` to handle local mock backend and UI binding

Suggested implementation milestones
----------------------------------
- Milestone 1 (prototype, 1-2 days): Add UI + client-side mock with localStorage persistence; Franchisor can create franchisees and open tenant edit pages.
- Milestone 2 (backend, 2-4 days): Implement real APIs, validations, invite email, and hooks into billing; enforce quotas.
- Milestone 3 (qa & polish, 1-2 days): Tests, email templates, UX polish, and documentation updates.

Deliverables for me (if you want me to implement now)
-----------------------------------------------------
- Create `franchisee_create_screen.html`, `franchisee-management.js`, and update `Franchise_Home.html` to show list and create modal.
- Add mock invite flow via localStorage and toast notifications.
- Update `Business Requirement/Tenant_Creation_NewFlow.md` (already done) and link to this spec.

Next steps for you
------------------
1. Confirm whether you want a prototype (static files + mock) or backend implementation.
2. Confirm subdomain pattern vs path-based tenant URLs for production.
3. Confirm whether franchisors should be able to "impersonate"/login-to franchisee tenants directly (this affects security/audit requirements).
4. If backend implementation is desired, provide access or API spec for existing user and tenant services so I can integrate.

Notes
-----
- This spec is intentionally implementation-agnostic on backend details; it lists the minimal endpoints and data required. For production we must secure endpoints and integrate billing and user services.

