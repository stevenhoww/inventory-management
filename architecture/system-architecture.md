# System Architecture Diagram

```mermaid
graph TB
    subgraph Client["Frontend Layer (Vue 3)"]
        A["Navigation & Layout<br/>App.vue"]
        B["Views<br/>Dashboard, Inventory,<br/>Orders, Spending,<br/>Demand, Reports"]
        C["Components<br/>FilterBar, Modals,<br/>Charts, Tables"]
        D["Composables<br/>useAuth, useI18n,<br/>useFilters"]
        E["API Client<br/>api.js"]
    end
    
    subgraph Network["Network Layer"]
        F["HTTP/REST<br/>Port 3000"]
        G["CORS Middleware"]
        H["HTTP/REST<br/>Port 8001"]
    end
    
    subgraph Server["Backend Layer (FastAPI)"]
        I["API Routes<br/>Endpoints"]
        J["Filter Functions<br/>apply_filters,<br/>filter_by_month"]
        K["Pydantic Models<br/>Request/Response"]
    end
    
    subgraph Data["Data Layer"]
        L["JSON Files<br/>server/data/"]
        M["In-Memory State<br/>Loaded at startup"]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> M
    M --> L
    
    style Client fill:#e3f2fd
    style Server fill:#f3e5f5
    style Data fill:#e8f5e9
    style Network fill:#fff3e0
