Of course! Here is a rewritten version of your user flow, organized for clarity with headings, bullet points, and a more structured format.

---

### **User Login & Onboarding Flow**

This document outlines the user journey for signing up and logging into the system based on four distinct user roles: Franchisor, Single Store, Franchisee, and Staff.

#### **1. Public Login Page**

When any user arrives at the public login page, they must first select their account type to proceed:
* Franchisor
* Single Store
* Franchisee
* Staff

The system then directs them to the appropriate flow for either creating a new account or logging in.

---

#### **2. New Users: Account Creation & Onboarding**

This section describes the process for users who do not yet have an account.

**A. Franchisor**
Franchisors can create their own accounts.

1.  **Sign-Up Process:**
    * The user fills out their business information.
    * They are required to set up at least one initial Franchisee account.
    * They select a subscription plan and complete the payment.
2.  **System Activation:**
    * Upon successful payment, the system activates the Franchisor's account (tenant).
    * An email notification is sent to the new Franchisor admin confirming account creation.
    * A separate welcome email is sent to the admin of the newly created Franchisee.
    * The system notifies the Super Admin to review the new account.
3.  **Onboarding:**
    * The Franchisor admin is guided through an onboarding process to set up their brand identity and configurations.

**B. Single Store**
The process is similar to the Franchisor but simplified.

1.  **Sign-Up Process:**
    * The user fills out their store information.
    * They select a subscription plan and complete the payment. (No requirement to create a Franchisee).
2.  **System Activation:**
    * The system activates the Single Store's account (tenant).
    * An email notification is sent to the Single Store admin.
    * The Super Admin is notified for review.
3.  **Onboarding:**
    * The Single Store admin is guided through a comprehensive onboarding process that combines elements from both the Franchisor and Franchisee setup (e.g., brand setup, payment configuration, staff creation, service setup).

**C. Franchisee**
Franchisee users **cannot** sign up for an account themselves.

* **Creation:** They must be created by their Franchisor's admin.
* **Activation:** Once created, the Franchisee admin receives an email with instructions to log in for the first time.
* **Onboarding:** After their initial login, they are directed to their onboarding process (e.g., setting up staff, services).
* **Support:** If they do not receive a login email, they are instructed to contact their Franchisor admin.

**D. Staff**
Staff users **cannot** sign up for an account themselves.

* **Creation:** They must be created by their Franchisee or Single Store admin.
* **Activation:** Once created, the staff member receives an email with instructions to log in.
* **Usage:** After logging in, they can immediately start using the system as configured by their admin.
* **Support:** If they do not receive a login email, they are instructed to contact their Franchisee or Single Store admin.

---

#### **3. Existing Users: Login Process**

This section describes the process for users who already have an account.

1.  **Authentication & Tenant Detection:**
    * The user enters their credentials.
    * The system identifies the organization(s) (tenant) associated with their account.

2.  **Tenant Selection (If Applicable):**
    * **Single Tenant:** If the user belongs to only one organization, they are automatically logged in and redirected.
    * **Multiple Tenants:** If the user belongs to multiple organizations (e.g., a Franchisor admin for two different brands), they are prompted to select which tenant they wish to access.

3.  **Redirection After Login:**

    * **For Franchisor, Single Store, and Franchisee Users:**
        * **First-Time Login:** If it is their first time logging into that specific tenant, they will be directed to the onboarding process.
        * **Subsequent Logins:** If they have already completed onboarding, they will be directed to their main dashboard for normal use.

    * **For Staff Users:**
        * Staff members are always directed straight to their dashboard for normal use after logging in, as they do not have a separate onboarding process to complete.