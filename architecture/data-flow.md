# Data Flow Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Vue as Vue Component
    participant Store as Composable<br/>State
    participant API as API Client
    participant Server as FastAPI<br/>Backend
    participant Data as JSON<br/>Data
    
    User->>Vue: Interact (select filters)
    Vue->>Store: Update filter state
    activate Store
    Store->>Vue: Emit data updated event
    deactivate Store
    
    Vue->>API: Call api.getItems(filters)
    activate API
    API->>Server: GET /api/items?filters
    deactivate API
    
    activate Server
    Server->>Data: Load from memory
    Server->>Server: apply_filters()
    Server->>Server: filter_by_month()
    Server->>Server: Validate with Pydantic
    Server-->>API: Return JSON response
    deactivate Server
    
    API-->>Vue: Parse response
    Vue->>Vue: Update items ref
    Vue->>Vue: Computed properties recalculate
    Vue->>Vue: Re-render template
    Vue-->>User: Display filtered data
```

## Data Flow Steps

1. **User Input**: Select filters in FilterBar component
2. **State Update**: Composable state updates (category, warehouse, status, month)
3. **API Call**: Frontend calls api.js with current filter values
4. **Network Request**: HTTP GET request sent to FastAPI backend
5. **Backend Processing**: 
   - Load in-memory data
   - Apply filters sequentially
   - Validate with Pydantic models
6. **Response**: JSON response returned to frontend
7. **State Update**: Component updates reactive refs with new data
8. **Recomputation**: Computed properties recalculate derived data
9. **Render**: Vue re-renders template with updated data
10. **Display**: User sees filtered results
