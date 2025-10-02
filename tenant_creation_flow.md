# Tenant Creation Flow Diagram

```mermaid
graph TD
    A[Public Login Page] --> B{Select Account Type}
    
    B --> C[Franchisor]
    B --> D[Single Store]
    B --> E[Franchisee]
    B --> F[Staff]
    
    %% Franchisor Flow
    C --> C1[Fill Business Information]
    C1 --> C2[Create Initial Franchisee Account]
    C2 --> C3[Select Subscription Plan]
    C3 --> C4[Complete Payment]
    C4 --> C5{Payment Successful?}
    C5 -->|Yes| C6[System Activates Franchisor Account]
    C5 -->|No| C7[Payment Failed - Retry]
    C7 --> C4
    C6 --> C8[Send Email to Franchisor Admin]
    C8 --> C9[Send Welcome Email to Franchisee Admin]
    C9 --> C10[Notify Super Admin for Review]
    C10 --> C11[Franchisor Onboarding Process]
    C11 --> C12[Brand Identity & Configuration Setup]
    
    %% Single Store Flow
    D --> D1[Fill Store Information]
    D1 --> D2[Select Subscription Plan]
    D2 --> D3[Complete Payment]
    D3 --> D4{Payment Successful?}
    D4 -->|Yes| D5[System Activates Single Store Account]
    D4 -->|No| D6[Payment Failed - Retry]
    D6 --> D3
    D5 --> D7[Send Email to Single Store Admin]
    D7 --> D8[Notify Super Admin for Review]
    D8 --> D9[Single Store Onboarding Process]
    D9 --> D10[Combined Setup: Brand, Payment, Staff, Services]
    
    %% Franchisee Flow (Cannot Self-Register)
    E --> E1[Contact Franchisor Admin]
    E1 --> E2[Franchisor Creates Franchisee Account]
    E2 --> E3[System Sends Login Email to Franchisee Admin]
    E3 --> E4[Franchisee Admin First Login]
    E4 --> E5[Franchisee Onboarding Process]
    E5 --> E6[Setup Staff & Services]
    
    %% Staff Flow (Cannot Self-Register)
    F --> F1[Contact Franchisee/Single Store Admin]
    F1 --> F2[Admin Creates Staff Account]
    F2 --> F3[System Sends Login Email to Staff]
    F3 --> F4[Staff First Login]
    F4 --> F5[Direct Access to Dashboard]
    
    %% Existing Users Login Flow
    G[Existing User Login] --> H[Enter Credentials]
    H --> I[System Identifies Associated Tenants]
    I --> J{Multiple Tenants?}
    J -->|No| K[Auto Login to Single Tenant]
    J -->|Yes| L[Select Tenant to Access]
    L --> M[Login to Selected Tenant]
    K --> N{First Time Login to Tenant?}
    M --> N
    N -->|Yes| O[Onboarding Process]
    N -->|No| P[Main Dashboard]
    O --> Q{User Type?}
    Q -->|Franchisor/Single Store/Franchisee| R[Complete Onboarding]
    Q -->|Staff| S[Direct to Dashboard]
    R --> P
    S --> P
    
    %% Styling
    classDef newUser fill:#e1f5fe
    classDef existingUser fill:#f3e5f5
    classDef systemAction fill:#e8f5e8
    classDef userAction fill:#fff3e0
    classDef error fill:#ffebee
    
    class C,D,E,F newUser
    class G,H,I,J,K,L,M,N,O,P,Q,R,S existingUser
    class C6,C8,C9,C10,D5,D7,D8,E2,E3,F2,F3 systemAction
    class C1,C2,C3,D1,D2,E1,F1 userAction
    class C5,C7,D4,D6 error
```

## Key Flow Points:

### New User Registration:
1. **Franchisor**: Self-registration → Business info → Create franchisee → Payment → Activation → Onboarding
2. **Single Store**: Self-registration → Store info → Payment → Activation → Combined onboarding
3. **Franchisee**: Cannot self-register → Must be created by franchisor → Email invitation → Onboarding
4. **Staff**: Cannot self-register → Must be created by admin → Email invitation → Direct dashboard access

### Existing User Login:
1. **Authentication** → **Tenant Detection** → **Tenant Selection** (if multiple) → **First-time vs. Regular Login** → **Appropriate Destination**

### System Notifications:
- Franchisor/Single Store: Email to admin + Super Admin notification
- Franchisee: Email to franchisee admin + Franchisor notification
- Staff: Email to staff member + Admin notification

### Onboarding Differences:
- **Franchisor**: Brand identity & configuration setup
- **Single Store**: Combined setup (brand, payment, staff, services)
- **Franchisee**: Staff & services setup
- **Staff**: No onboarding - direct dashboard access

