# API Endpoints Architecture

```mermaid
graph LR
    Client["Frontend<br/>API Client"]
    
    subgraph Inventory["Inventory Endpoints"]
        I1["GET /api/inventory<br/>Filters: warehouse,<br/>category"]
        I2["GET /api/inventory/:id<br/>Single item detail"]
    end
    
    subgraph Orders["Order Endpoints"]
        O1["GET /api/orders<br/>Filters: warehouse,<br/>category, status,<br/>month"]
        O2["GET /api/orders/:id<br/>Single order detail"]
    end
    
    subgraph Dashboard["Dashboard Endpoints"]
        D1["GET /api/dashboard/summary<br/>All filters<br/>Stats & KPIs"]
    end
    
    subgraph Forecast["Forecast Endpoints"]
        F1["GET /api/demand<br/>Demand forecasts<br/>Trends"]
        F2["GET /api/backlog<br/>Backlog items<br/>Purchase orders"]
    end
    
    subgraph Spending["Spending Endpoints"]
        S1["GET /api/spending/summary<br/>Total spending"]
        S2["GET /api/spending/monthly<br/>Monthly breakdown"]
        S3["GET /api/spending/categories<br/>By category"]
        S4["GET /api/spending/transactions<br/>Recent purchases"]
    end
    
    subgraph Reports["Reports Endpoints"]
        R1["GET /api/reports/quarterly<br/>Quarterly stats"]
        R2["GET /api/reports/monthly-trends<br/>Monthly trends"]
    end
    
    Client --> I1
    Client --> I2
    Client --> O1
    Client --> O2
    Client --> D1
    Client --> F1
    Client --> F2
    Client --> S1
    Client --> S2
    Client --> S3
    Client --> S4
    Client --> R1
    Client --> R2
    
    style Client fill:#fff9c4
    style Inventory fill:#c8e6c9
    style Orders fill:#c8e6c9
    style Dashboard fill:#bbdefb
    style Forecast fill:#ffccbc
    style Spending fill:#f8bbd0
    style Reports fill:#e1bee7
```

## Endpoint Summary

| Category | Endpoint | Method | Filters | Purpose |
|----------|----------|--------|---------|---------|
| **Inventory** | `/api/inventory` | GET | warehouse, category | List all inventory items |
| | `/api/inventory/:id` | GET | - | Get single inventory item |
| **Orders** | `/api/orders` | GET | warehouse, category, status, month | List all orders |
| | `/api/orders/:id` | GET | - | Get single order |
| **Dashboard** | `/api/dashboard/summary` | GET | All filters | Get KPIs and summary stats |
| **Forecast** | `/api/demand` | GET | - | Get demand forecasts |
| | `/api/backlog` | GET | - | Get backlog items with PO status |
| **Spending** | `/api/spending/summary` | GET | - | Total spending overview |
| | `/api/spending/monthly` | GET | - | Monthly spending breakdown |
| | `/api/spending/categories` | GET | - | Spending by category |
| | `/api/spending/transactions` | GET | - | Recent transactions |
| **Reports** | `/api/reports/quarterly` | GET | - | Quarterly performance stats |
| | `/api/reports/monthly-trends` | GET | - | Month-over-month trends |
