Tenant Creation — New Flow

Overview
--------
This document specifies the revised tenant creation flow for Business Owners (Franchisor or Single Store). It replaces the prior "create tenant" flow with a simpler, clearer process:

1. Business Owner signs in to the public site.
2. Owner chooses account type: Franchisor OR Single Store.
3. Owner completes payment for the chosen subscription plan.
4. Post-payment redirect:
   - If Franchisor → redirect to the Franchisor home/dashboard (e.g., `Franchise_Home.html`). From here the Franchisor can create Franchisee tenants and open/login each franchisee tenant site.
   - If Single Store → redirect to the Single Store tenant site (single tenant) so the owner lands directly inside their tenant.

Goals
-----
- Make the owner-led creation flow explicit and predictable.
- Avoid auto-creating tenant accounts without the owner's explicit choice.
- Provide a clear post-payment redirect depending on chosen account type so the owner can immediately perform the next tasks.

Assumptions
-----------
- The payment step may be mocked for staging/demo. For production the payment provider should call back a server endpoint that then performs the final activation and redirect.
- Tenant URLs in this repository are represented by local HTML files (for prototype). A production implementation should use tenant subdomains or routing (e.g., `tenant.myapp.com` or `myapp.com/tenant/<id>`).
- Email notifications (welcome/invites) are handled by server-side processes — this document shows where to trigger them but implementation detail is out-of-scope here.

Detailed Flow (step-by-step)
----------------------------
1. Sign-in / Start
   - Owner visits the public login/onboarding page.
   - Owner authenticates or chooses "Create Account".

2. Choose Account Type
   - Show a clear choice with 2 primary options: "Franchisor" and "Single Store".
   - (Optional) Show short descriptions and differences.

3. Enter business/store details
   - Franchisor: collect business name, subdomain (optional), contact info, at least one initial franchisee placeholder (optional), and billing details.
   - Single Store: collect store name, subdomain (optional), contact info and billing details.

4. Select plan & Payment
   - Owner selects subscription plan.
   - Owner completes payment. For demo mode this can be a mocked success screen.

5. Post-payment activation and redirect
   - On successful payment the system performs steps:
     - Create and activate the tenant (Franchisor or Single Store) in the backend.
     - Send notification email(s): owner admin, super admin, and any invited franchisee admins (if applicable).
     - Redirect:
       - Franchisor → `Franchise_Home.html` (Franchisor dashboard). From here the Franchisor can create multiple Franchisee tenants and open/login to each tenant site (each tenant may be represented by a subdomain or separate tenant page).
       - Single Store → redirect into the Single Store tenant site (e.g., `Single_store_home.html` or tenant subdomain).

Franchisor-specific behaviors
----------------------------
- After redirect to Franchisor home the UI should expose a "Create Franchisee" flow (a small form to create a franchisee tenant, including name, contact, and optional subscription settings).
- Each created franchisee should appear in a list with actions: "Open site" (login into that tenant), "Invite admin" (send login email), "Manage subscription".

Single Store-specific behaviors
-------------------------------
- The Single Store owner is redirected directly into the single tenant's dashboard with onboarding steps specific to single-store use (brand setup, payment methods, staff creation).

Implementation notes and minimal file changes (prototype)
--------------------------------------------------------
- Add a page or enhance `account_type_selection.html` to require the owner to pick "Franchisor" or "Single Store" before paying.
- Ensure the payment success handler accepts a `?from=creation&type=franchisor|single` query parameter so the client can decide where to redirect.
  - Example success redirect for Franchisor: `/payment-success.html?from=creation&type=franchisor&tenantId=<id>` → client redirects to `Franchise_Home.html?tenantId=<id>`.
  - Example success redirect for Single Store: `/payment-success.html?from=creation&type=single&tenantId=<id>` → client redirects to `https://<subdomain>.mydomain.com` or `Single_store_home.html?tenantId=<id>`.
- For prototyping (local files) you can use `Franchise_Home.html` and `Single_store_subscription_plan.html` or create `Single_store_home.html`.

Open questions / decisions for you
---------------------------------
- Do you want subdomains (e.g., `acme.myapp.com`) or path-based tenants (`/t/<tenantId>`) in production? If subdomains, I will add the example redirect patterns accordingly.
- Do you want me to implement the prototype change (add/select UI and wire a mocked payment success redirect), or do you want only the documentation update for now?
- Terminology: confirm preferred user-facing label — I used "Terminate Business" earlier and replaced "Close Tenant". Do you prefer "Terminate Business" or "Close Tenant" (or another term)?

Next steps I can take now
-------------------------
- If you confirm, I will create the minimal `account_type_selection.html` and a `payment_success.html` mock that reads `?from=creation&type=...` and performs the appropriate redirect to `Franchise_Home.html` or `Single_store_home.html`.
- Or I can update other documentation files to match this flow.



