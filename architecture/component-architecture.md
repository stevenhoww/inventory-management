# Component Architecture Diagram

```mermaid
graph TD
    App["App.vue<br/>Root Component"]
    Nav["Navigation<br/>Header & Menu"]
    Filter["FilterBar<br/>Time, Warehouse,<br/>Category, Status"]
    Main["Main Content<br/>Router View"]
    
    Dashboard["Dashboard View<br/>Summary Stats<br/>Charts & Metrics"]
    Inventory["Inventory View<br/>Items List<br/>Search & Filter"]
    Orders["Orders View<br/>Order Table<br/>Status Tracking"]
    Spending["Spending View<br/>Cost Analysis<br/>Category Breakdown"]
    Demand["Demand View<br/>Forecasts<br/>Trends"]
    Reports["Reports View<br/>Quarterly Stats<br/>Monthly Trends"]
    Backlog["Backlog View<br/>Pending Items<br/>Purchase Orders"]
    
    FilterComp["FilterBar Component<br/>Dropdown Filters<br/>Time Period Select"]
    Profile["ProfileMenu<br/>User Menu<br/>Settings"]
    Lang["LanguageSwitcher<br/>i18n Support"]
    
    DetailMod1["InventoryDetailModal<br/>Item Details<br/>Stock Info"]
    DetailMod2["OrderDetailModal<br/>Order Info<br/>Items List"]
    DetailMod3["BacklogDetailModal<br/>Backlog Details<br/>PO Status"]
    DetailMod4["CostDetailModal<br/>Cost Breakdown<br/>Category View"]
    
    Composables["Composables<br/>useAuth<br/>useI18n<br/>useFilters"]
    
    APIClient["API Client<br/>api.js"]
    
    App --> Nav
    App --> Filter
    App --> Main
    
    Nav --> Profile
    Nav --> Lang
    
    Main --> Dashboard
    Main --> Inventory
    Main --> Orders
    Main --> Spending
    Main --> Demand
    Main --> Reports
    Main --> Backlog
    
    Inventory --> DetailMod1
    Orders --> DetailMod2
    Backlog --> DetailMod3
    Spending --> DetailMod4
    
    Dashboard --> APIClient
    Inventory --> APIClient
    Orders --> APIClient
    Spending --> APIClient
    Demand --> APIClient
    Reports --> APIClient
    Backlog --> APIClient
    
    Dashboard --> Composables
    Inventory --> Composables
    Orders --> Composables
    Spending --> Composables
    Demand --> Composables
    Reports --> Composables
    Backlog --> Composables
    
    style App fill:#fff9c4
    style Dashboard fill:#bbdefb
    style Inventory fill:#bbdefb
    style Orders fill:#bbdefb
    style Spending fill:#bbdefb
    style Demand fill:#bbdefb
    style Reports fill:#bbdefb
    style Backlog fill:#bbdefb
    style APIClient fill:#c8e6c9
    style Composables fill:#f8bbd0
