# Business Type Definitions for Franchise Management System

## Overview
This document defines the business types available for each industry category in the Franchisor Create Screen. The business types are dynamically populated based on the selected industry category to provide relevant and specific options for franchise businesses.

---

## Industry Categories & Business Types

### 1. Food & Beverage
**Industry Code:** `food-beverage`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Fast Food Restaurant** | `restaurant-fast-food` | Quick-service restaurants with standardized menu items and rapid service | McDonald's, KFC, Subway, Burger King |
| **Casual Dining Restaurant** | `restaurant-casual` | Mid-priced restaurants with table service and diverse menu options | Applebee's, Chili's, Olive Garden |
| **Fine Dining Restaurant** | `restaurant-fine-dining` | High-end restaurants with premium service and gourmet cuisine | Ruth's Chris, Morton's, Capital Grille |
| **Cafe & Coffee Shop** | `cafe-coffee-shop` | Coffee-focused establishments with light meals and beverages | Starbucks, Dunkin', Tim Hortons |
| **Bar & Pub** | `bar-pub` | Alcohol-serving establishments with food and entertainment | Buffalo Wild Wings, Hooters, TGI Fridays |
| **Bakery & Patisserie** | `bakery-patisserie` | Specialized in baked goods, pastries, and desserts | Panera Bread, Cinnabon, Great American Cookies |
| **Catering Services** | `catering` | Event catering and food service for special occasions | Edible Arrangements, Nothing Bundt Cakes |

---

### 2. Retail
**Industry Code:** `retail`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Apparel & Fashion** | `apparel-fashion` | Clothing, accessories, and fashion retail stores | The Athlete's Foot, Rainbow, Express |
| **Grocery & Supermarket** | `grocery-supermarket` | Food and household goods retail stores | 7-Eleven, Circle K, Speedway |
| **Convenience Store** | `convenience-store` | Small retail stores with essential items and quick service | 7-Eleven, Circle K, Speedway |
| **Electronics Store** | `electronics` | Consumer electronics and technology retail | RadioShack, GameStop, Batteries Plus |
| **Books & Media Store** | `books-media` | Books, magazines, and media retail stores | Barnes & Noble, Books-A-Million |
| **Toys & Games Store** | `toys-games` | Children's toys, games, and entertainment retail | Toys "R" Us, GameStop, Build-A-Bear |
| **Specialty Retail Store** | `specialty-retail` | Niche retail stores with specialized products | PetSmart, AutoZone, Office Depot |

---

### 3. Services
**Industry Code:** `services`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Gym & Fitness Center** | `gym-fitness` | Physical fitness and exercise facilities | Anytime Fitness, Planet Fitness, Gold's Gym |
| **Yoga Studio** | `yoga-studio` | Yoga instruction and wellness centers | CorePower Yoga, Pure Barre, Orange Theory |
| **Spa & Beauty Salon** | `spa-beauty` | Personal care, beauty, and wellness services | Massage Envy, Hand & Stone, European Wax Center |
| **Education & Tutoring** | `education-tutoring` | Educational services and academic support | Kumon, Sylvan Learning, Mathnasium |
| **Childcare Center** | `childcare` | Early childhood education and care services | KinderCare, Primrose Schools, The Learning Experience |
| **Automotive Repair Shop** | `automotive-repair` | Vehicle maintenance and repair services | Meineke, Midas, Jiffy Lube |
| **Car Wash Service** | `car-wash` | Vehicle cleaning and detailing services | Zips Car Wash, Mister Car Wash, Quick Quack |
| **Accounting Services** | `accounting` | Financial and tax preparation services | H&R Block, Jackson Hewitt, Liberty Tax |
| **Consulting Services** | `consulting` | Business and professional consulting | ActionCOACH, Sandler Training, Express Employment |
| **Real Estate Agency** | `real-estate` | Property sales, rental, and management services | RE/MAX, Century 21, Coldwell Banker |

---

### 4. Hospitality
**Industry Code:** `hospitality`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Hotel & Motel** | `hotel-motel` | Accommodation and lodging services | Holiday Inn, Best Western, Comfort Inn |
| **Travel Agency** | `travel-agency` | Travel planning and booking services | Cruise Planners, Dream Vacations, Expedia |
| **Bed & Breakfast** | `bed-breakfast` | Small-scale accommodation with breakfast service | Various independent B&Bs |
| **Hostel** | `hostel` | Budget accommodation for travelers | Hostelling International, Generator Hostels |
| **Resort** | `resort` | Luxury accommodation with recreational facilities | Marriott, Hilton, Hyatt |

---

### 5. Health & Medical
**Industry Code:** `health-medical`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Dental Clinic** | `dental-clinic` | Dental care and oral health services | Aspen Dental, Pacific Dental Services, Heartland Dental |
| **Medical Clinic** | `medical-clinic` | General medical and healthcare services | Concentra, FastMed, MedExpress |
| **Pharmacy** | `pharmacy` | Prescription and over-the-counter medication retail | CVS, Walgreens, Rite Aid |
| **Home Care Services** | `home-care` | In-home healthcare and assistance services | Home Instead, Comfort Keepers, Right at Home |
| **Veterinary Clinic** | `veterinary` | Animal healthcare and veterinary services | Banfield Pet Hospital, VCA Animal Hospitals |
| **Mental Health Services** | `mental-health` | Psychological and mental health support services | Various independent practices |

---

### 6. Home & Garden
**Industry Code:** `home-garden`

| Business Type | Code | Description | Franchise Examples |
|---------------|------|-------------|-------------------|
| **Home Improvement & Repair** | `home-improvement` | Construction, renovation, and home repair services | Handyman Connection, Mr. Handyman, Home Instead |
| **Landscaping Services** | `landscaping` | Lawn care, garden maintenance, and outdoor design | Weed Man, TruGreen, Lawn Doctor |
| **Cleaning Services** | `cleaning-services` | Residential and commercial cleaning services | Merry Maids, Molly Maid, The Cleaning Authority |
| **Pest Control Services** | `pest-control` | Pest elimination and prevention services | Terminix, Orkin, Aptive Environmental |
| **Pool Maintenance** | `pool-maintenance` | Swimming pool cleaning and maintenance services | Pool Scouts, America's Swimming Pool Company |
| **HVAC Services** | `hvac-services` | Heating, ventilation, and air conditioning services | Aire Serv, One Hour Heating & Air Conditioning |

---

## Implementation Notes

### Dynamic Dropdown Logic
- When a user selects an industry category, the business type dropdown is automatically populated with relevant options
- The business type options are filtered based on the selected industry to ensure relevance
- If no industry is selected, the business type dropdown shows only the default "Select Business Type" option

### Data Structure
Each business type includes:
- **Code**: Unique identifier for database storage and API calls
- **Text**: Human-readable display name for the UI
- **Description**: Brief explanation of the business type
- **Franchise Examples**: Real-world examples for reference

### Validation Rules
- Industry category selection is required before business type selection
- Business type selection is required for form submission
- Business type must be valid for the selected industry category

### Future Enhancements
- Add subcategories for more granular business classification
- Include industry-specific validation rules
- Add business type-specific configuration options
- Implement business type-based feature recommendations

---

## Database Schema Considerations

### Industry Categories Table
```sql
CREATE TABLE industry_categories (
    id INT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Business Types Table
```sql
CREATE TABLE business_types (
    id INT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    industry_category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (industry_category_id) REFERENCES industry_categories(id)
);
```

### Franchisor Business Type Assignment
```sql
CREATE TABLE franchisor_business_types (
    franchisor_id INT,
    business_type_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (franchisor_id, business_type_id),
    FOREIGN KEY (franchisor_id) REFERENCES franchisors(id),
    FOREIGN KEY (business_type_id) REFERENCES business_types(id)
);
```

---

## API Endpoints

### Get Business Types by Industry
```
GET /api/business-types?industry_category={category_code}
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "code": "restaurant-fast-food",
            "name": "Fast Food Restaurant",
            "description": "Quick-service restaurants with standardized menu items and rapid service"
        }
    ]
}
```

### Get All Industry Categories
```
GET /api/industry-categories
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "code": "food-beverage",
            "name": "Food & Beverage",
            "description": "Restaurants, cafes, bars, and food service businesses"
        }
    ]
}
```

---

## Usage in Franchisor Create Screen

1. **Industry Selection**: User selects from the main industry categories
2. **Dynamic Population**: Business type dropdown is automatically updated
3. **Validation**: Form validates that business type matches selected industry
4. **Storage**: Both industry and business type are stored with the franchisor record
5. **Reporting**: Business type data is used for analytics and reporting

This structure ensures that franchise businesses are properly categorized and can be easily filtered, searched, and analyzed based on their specific industry and business type.
