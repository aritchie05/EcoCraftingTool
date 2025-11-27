# Server Selection Feature - Implementation Plan

## Overview

Add a server selection feature that allows users to switch between predefined Eco game servers or input a custom server URL. The application will fetch items and recipes from the selected server and merge them with the existing static data.

**Important**: Server API responses have a different JSON structure than the application's internal `IItem` and `IRecipe` interfaces. A dedicated mapping layer is required to transform server API responses to application models.

## Feature Requirements

### User Interface

- Add a server selector dropdown in the header bar (next to locale selector)
- Support selection from a predefined list of servers
- Support custom server URL input
- Persist selected server to browser local storage
- Display server connection status/feedback

### Data Management

- Fetch items from: `{hostname}/api/v1/plugins/EcoPriceCalculator/allItems`
- Fetch recipes from: `{hostname}/api/v1/plugins/EcoPriceCalculator/recipes`
- Merge fetched data with existing static `items.ts` and `recipes.ts`
- Maintain application state after page refresh using local storage

### Default Behavior

- Application uses "default" (static) server configuration initially
- Non-default server selections are saved to local storage
- Application restores last selected server on page load

## Technical Architecture

### 1. Models & Interfaces

#### Create `src/app/model/server-config.ts`

```typescript
export interface ServerConfig {
  id: string;           // Unique identifier (e.g., 'default', 'white-tiger', 'custom')
  name: string;         // Display name
  hostname: string;     // Base URL (e.g., 'https://white-tiger.play.eco')
  isCustom: boolean;    // Flag for custom servers
}
```

#### Predefined Servers List

```typescript
export const PREDEFINED_SERVERS: ServerConfig[] = [
  {
    id: 'default',
    name: 'Default (Static Data)',
    hostname: '',
    isCustom: false
  },
  {
    id: 'white-tiger',
    name: 'White Tiger',
    hostname: 'https://white-tiger.play.eco',
    isCustom: false
  }
];
```

#### Create `src/app/model/server-api/server-api-item.ts`

**Purpose**: Models for server API item responses (different structure from IItem)

```typescript
export interface ServerApiItem {
  // Define based on actual API response structure
  // Example fields (to be determined by actual API):
  id?: string;
  name?: string;
  displayName?: string;
  category?: string;
  // ... other fields from server API
}

export interface ServerItemsResponse {
  items?: ServerApiItem[];
  // ... other fields from API response
}
```

#### Create `src/app/model/server-api/server-recipe.ts`

**Purpose**: Models for server API recipe responses (different structure from IRecipe)

```typescript
export interface ServerApiRecipe {
  // Define based on actual API response structure
  // Example fields (to be determined by actual API):
  id?: string;
  name?: string;
  craftingStation?: string;
  ingredients?: Array<{ item: string, amount: number }>;
  products?: Array<{ item: string, amount: number }>;
  // ... other fields from server API
}

export interface ServerRecipesResponse {
  recipes?: ServerApiRecipe[];
  // ... other fields from API response
}
```

### 2. Data Mapping Layer

#### Create `src/app/service/server-data-mapper.service.ts`

**Purpose**: Transform server API responses to application models (IItem and IRecipe)

**Key Methods**:

- `mapServerItemToIItem(serverItem: ServerApiItem): IItem` - Map single item
- `mapServerItemsToIItems(serverItems: ServerApiItem[]): IItem[]` - Map item array
- `mapServerRecipeToIRecipe(serverRecipe: ServerApiRecipe): IRecipe` - Map single recipe
- `mapServerRecipesToIRecipes(serverRecipes: ServerApiRecipe[]): IRecipe[]` - Map recipe array

**Mapping Strategy**:

```typescript
mapServerItemToIItem(serverItem
:
ServerApiItem
):
IItem
{
  return {
    name: serverItem.displayName || serverItem.name || 'Unknown',
    nameID: serverItem.id || '',
    tag: false,
    price: 0,
    // Map other fields based on actual API structure
    // Handle missing/optional fields with defaults
  };
}

mapServerRecipeToIRecipe(serverRecipe
:
ServerApiRecipe
):
IRecipe
{
  return {
    name: serverRecipe.name || 'Unknown',
    nameID: serverRecipe.id || '',
    level: 0, // Extract from API if available
    labor: 0, // Extract from API if available
    hidden: false,
    ingredients: this.mapServerIngredientsToIngredients(serverRecipe.ingredients || []),
    outputs: this.mapServerProductsToOutputs(serverRecipe.products || []),
    // Map other fields based on actual API structure
  };
}
```

**Important Notes**:

- Actual field mappings must be determined after inspecting real API responses
- Handle nullable/optional fields gracefully
- Provide sensible defaults for missing data
- Log warnings for unmappable data

**Dependencies for Mapping**:

- May need access to static data (skills, tables, items) to resolve references
- Consider injecting or importing static data maps for lookup
- Example: If server recipe includes `skillName: "Mining"`, need to map to `Skill` object from static data

### 3. Server Service

#### Create `src/app/service/server.service.ts`

**Purpose**: Manage server selection, API calls, and data merging

**Key Methods**:

- `getSelectedServer(): ServerConfig` - Get current server from state
- `setSelectedServer(server: ServerConfig): void` - Update selected server
- `fetchServerItems(server: ServerConfig): Observable<ServerItemsResponse>` - Fetch items from API
- `fetchServerRecipes(server: ServerConfig): Observable<ServerRecipesResponse>` - Fetch recipes from API
- `fetchAndMapServerData(server: ServerConfig): Observable<{items: IItem[], recipes: IRecipe[]}>` - Fetch and map data
- `mergeItems(staticItems: IItem[], serverItems: IItem[]): IItem[]` - Merge item arrays
- `mergeRecipes(staticRecipes: IRecipe[], serverRecipes: IRecipe[]): IRecipe[]` - Merge recipe arrays

**Dependencies**:

- `HttpClient` for API calls
- `ServerDataMapperService` for response mapping
- `WebStorageService` for persistence
- RxJS for async operations

**Error Handling**:

- Network failures
- Invalid JSON responses
- Mapping errors
- Timeout handling
- User-friendly error messages via `MessageService`

**Example Implementation Flow**:

```typescript
fetchAndMapServerData(server
:
ServerConfig
):
Observable < {items: IItem[], recipes: IRecipe[]} > {
  return forkJoin({
    itemsResponse: this.http.get<ServerItemsResponse>(`${server.hostname}/api/v1/plugins/EcoPriceCalculator/allItems`),
    recipesResponse: this.http.get<ServerRecipesResponse>(`${server.hostname}/api/v1/plugins/EcoPriceCalculator/recipes`)
  }).pipe(
    map(({itemsResponse, recipesResponse}) => ({
      items: this.mapperService.mapServerItemsToIItems(itemsResponse.items || []),
      recipes: this.mapperService.mapServerRecipesToIRecipes(recipesResponse.recipes || [])
    })),
    timeout(10000), // 10 second timeout
    catchError(error => this.handleError(error))
  );
}
```

### 4. Storage Service Updates

#### Extend `src/app/service/storage.service.ts`

Add methods to `WebStorageService`:

- `getSelectedServerConfig(): ServerConfig | null` - Retrieve saved server
- `saveSelectedServerConfig(server: ServerConfig): void` - Persist server selection

**Storage Keys**:

- `'selectedServer'` - Stores serialized `ServerConfig` object

### 5. Header Component Updates

#### Update `src/app/header/header.component.ts`

**New Properties**:

- `selectedServer: WritableSignal<ServerConfig>` - Current server state
- `predefinedServers: ServerConfig[]` - List of available servers
- `isCustomServerMode: WritableSignal<boolean>` - Toggle for custom input
- `customServerUrl: WritableSignal<string>` - Custom URL input value
- `isLoadingServerData: WritableSignal<boolean>` - Loading indicator

**New Methods**:

- `onServerChange(serverId: string): void` - Handle server selection
- `onCustomServerSubmit(): void` - Handle custom server submission
- `toggleCustomServerMode(): void` - Switch between list/custom input

**Constructor Changes**:

- Inject `ServerService`
- Initialize server state from storage or default

#### Update `src/app/header/header.component.html`

Add server selector UI adjacent to locale selector (around line 16-31):

```html
<!-- Server Selection -->
<mat-form-field appearance="outline" class="mx-3">
  <mat-label>{{ message('serverLabel') }}</mat-label>
  <mat-select [value]="selectedServer().id"
              (selectionChange)="onServerChange($event.value)"
              [disabled]="isLoadingServerData()"
              panelClass="server-select"
              aria-label="Select server">
    @for (server of predefinedServers; track server.id) {
    <mat-option [value]="server.id">
      {{ server.name }}
    </mat-option>
    }
    <mat-option value="custom">{{ message('customServer') }}</mat-option>
  </mat-select>
  @if (isLoadingServerData()) {
  <mat-spinner matSuffix diameter="20"></mat-spinner>
  }
</mat-form-field>

<!-- Custom Server Input (conditional) -->
@if (isCustomServerMode()) {
<mat-form-field appearance="outline" class="mx-3">
  <mat-label>{{ message('customServerUrl') }}</mat-label>
  <input matInput
         [value]="customServerUrl()"
         (input)="customServerUrl.set($event.target.value)"
         placeholder="https://server.play.eco">
  <button mat-icon-button matSuffix
          (click)="onCustomServerSubmit()"
          [disabled]="!customServerUrl() || isLoadingServerData()">
    <span class="material-icons">check</span>
  </button>
</mat-form-field>
}
```

### 6. Data Integration Strategy

#### Items Merging Logic

```typescript
mergeItems(staticItems
:
IItem[], serverItems
:
IItem[]
):
IItem[]
{
  const itemMap = new Map<string, IItem>();

  // Start with static items
  staticItems.forEach(item => itemMap.set(item.nameID, item));

  // Merge/add server items
  serverItems.forEach(item => {
    if (itemMap.has(item.nameID)) {
      // Update existing item (preserve local properties like price, touched)
      const existing = itemMap.get(item.nameID)!;
      itemMap.set(item.nameID, {...existing, ...item, price: existing.price, touched: existing.touched});
    } else {
      // Add new item from server
      itemMap.set(item.nameID, item);
    }
  });

  return Array.from(itemMap.values());
}
```

#### Recipes Merging Logic

```typescript
mergeRecipes(staticRecipes
:
IRecipe[], serverRecipes
:
IRecipe[]
):
IRecipe[]
{
  const recipeMap = new Map<string, IRecipe>();

  // Start with static recipes
  staticRecipes.forEach(recipe => recipeMap.set(recipe.nameID, recipe));

  // Merge/add server recipes
  serverRecipes.forEach(recipe => {
    if (recipeMap.has(recipe.nameID)) {
      // Update existing recipe (preserve user-set prices)
      const existing = recipeMap.get(recipe.nameID)!;
      recipeMap.set(recipe.nameID, {
        ...existing,
        ...recipe,
        basePrice: existing.basePrice,
        price: existing.price,
        profitOverride: existing.profitOverride
      });
    } else {
      // Add new recipe from server
      recipeMap.set(recipe.nameID, recipe);
    }
  });

  return Array.from(recipeMap.values());
}
```

### 7. Application State Management

#### Update `src/app/service/crafting.service.ts`

- Add method: `updateDataSource(items: IItem[], recipes: IRecipe[]): void`
- Re-initialize data maps when server changes
- Trigger recalculations after data update

#### Application Initialization Flow

1. App loads → `HeaderComponent` initializes
2. Check `WebStorageService.getSelectedServerConfig()`
3. If non-default server found → fetch and merge data
4. If default or null → use static data
5. Initialize `CraftingService` with merged data

### 8. Routing Configuration

#### Update `src/app/app.config.ts`

Add Angular Router if not already configured:

```typescript
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideRouter(routes)  // Add routing support
  ]
};
```

**Note**: If the application is single-page with no navigation, routing configuration may be minimal or unnecessary. The server selection can be managed entirely through component state without route changes.

### 9. Message/Localization Updates

#### Update message service with new keys:

- `serverLabel` - "Server"
- `customServer` - "Custom Server"
- `customServerUrl` - "Custom Server URL"
- `serverLoadError` - "Failed to load server data"
- `serverLoadSuccess` - "Server data loaded successfully"
- `invalidServerUrl` - "Invalid server URL"

## API Response Mapping Requirements

### Discovery Process

Before implementation can begin, the actual structure of the server API responses must be discovered and documented. The server API format differs from the application's internal `IItem` and `IRecipe` interfaces.

**Steps for API Discovery**:

1. Make HTTP requests to White Tiger server:
  - `https://white-tiger.play.eco/api/v1/plugins/EcoPriceCalculator/allItems`
  - `https://white-tiger.play.eco/api/v1/plugins/EcoPriceCalculator/recipes`
2. Save sample responses to files for analysis
3. Document the JSON structure and field names
4. Identify corresponding fields between server API and application models
5. Note any missing fields that need default values
6. Create accurate TypeScript interfaces for server responses

### Mapping Requirements

#### Item Mapping

The mapper must transform `ServerApiItem` → `IItem`:

- **Required fields**: `name`, `nameID`, `tag`
- **Optional fields**: `price`, `imageFile`, `xPos`, `yPos`, `filter`, `touched`
- **Default values**: Must be provided for missing optional fields

#### Recipe Mapping

The mapper must transform `ServerApiRecipe` → `IRecipe`:

- **Required fields**: `name`, `nameID`, `level`, `labor`, `ingredients`, `outputs`, `hidden`
- **Optional fields**: `skill`, `craftingTable`, `primaryOutput`, `profitOverride`, `basePrice`, `price`
- **Complex mappings**:
  - Ingredients array structure
  - Outputs array structure
  - Skill references (may need lookup in static skills data)
  - Crafting table references (may need lookup in static tables data)

### Mapping Challenges

- **Reference Resolution**: Server may provide IDs/names that need to be matched to existing static data (skills, tables, items)
- **Nested Objects**: Ingredients and outputs likely have nested structures requiring separate mapping functions
- **Data Validation**: Some server data may be incomplete or invalid and need fallbacks
- **Type Safety**: Mapper must handle type mismatches gracefully

## Implementation Steps

### Phase 0: API Response Discovery

1. Fetch sample data from White Tiger server endpoints
2. Analyze JSON structure of items response
3. Analyze JSON structure of recipes response
4. Document field mappings between server API and application models
5. Create accurate TypeScript interfaces for `ServerApiItem` and `ServerApiRecipe`

### Phase 1: Foundation (Models & Services)

1. Create `server-config.ts` model with `ServerConfig` and predefined servers
2. Create `server-api-item.ts` and `server-recipe.ts` with actual API response interfaces
3. Create `server-data-mapper.service.ts` with mapping logic
4. Create `server.service.ts` with basic structure
5. Add server storage methods to `WebStorageService`
6. Add message keys for server selection

### Phase 2: API Integration & Mapping

1. Implement `fetchServerItems()` and `fetchServerRecipes()` in `ServerService`
2. Implement mapping methods in `ServerDataMapperService`
3. Implement `fetchAndMapServerData()` to orchestrate fetch + map
4. Add error handling and timeout logic
5. Implement `mergeItems()` and `mergeRecipes()` methods
6. Add unit tests for mapping logic
7. Add unit tests for merge logic

### Phase 3: UI Implementation

1. Update `header.component.ts` with server selection logic
2. Update `header.component.html` with server selector UI
3. Add custom server input field with validation
4. Add loading spinner and status indicators
5. Style new UI components to match existing design

### Phase 4: State Management

1. Update `CraftingService` to accept dynamic data
2. Implement data refresh mechanism
3. Ensure calculations update after server change
4. Test with predefined "White Tiger" server

### Phase 5: Persistence & Testing

1. Test local storage save/restore
2. Test page refresh scenarios
3. Test error cases (network failures, invalid URLs)
4. Test data merging with various scenarios
5. Verify no data loss on server switches

### Phase 6: Polish & Documentation

1. Add loading states and user feedback
2. Add tooltips/help text for custom server input
3. Handle edge cases (empty responses, malformed data)
4. Update user documentation if needed

## Testing Strategy

### Unit Tests

- `ServerDataMapperService` mapping logic (API → IItem/IRecipe)
- `ServerService` merge logic
- Storage service server persistence
- API response parsing and error handling

### Integration Tests

- Server selection flow
- Data fetching and merging
- Local storage persistence
- Error handling scenarios

### Manual Testing Scenarios

1. Fresh load → defaults to static data
2. Select "White Tiger" → fetches and merges data
3. Refresh page → restores "White Tiger" selection
4. Switch back to default → uses static data only
5. Enter custom URL → validates and fetches
6. Invalid URL → shows error message
7. Network failure → shows error, retains previous state
8. Server returns partial data → merges successfully

## Considerations & Edge Cases

### API Response Validation

- Verify JSON structure matches expected server API interfaces
- Transform server API format to application format via mapper service
- Handle missing or null fields in mapping layer
- Validate hostname format for custom servers
- Log mapping errors for debugging

### Performance

- Cache server responses (optional enhancement)
- Debounce custom URL input
- Show loading indicators during fetch

### Data Consistency

- Preserve user-set prices when switching servers
- Handle items/recipes that exist in static but not on server
- Handle new items/recipes from server

### Security

- Validate custom server URLs (HTTPS only recommended)
- Handle CORS issues gracefully
- Sanitize error messages to avoid XSS

### User Experience

- Clear indication of active server
- Informative error messages
- Smooth transitions between servers
- Preserve calculation state when possible

## Future Enhancements (Out of Scope)

- Multiple custom servers saved in list
- Server health check/ping before selection
- Auto-refresh server data periodically
- Compare prices across servers
- Export/import server configurations
- Server favorites/bookmarks

## Dependencies

- Angular HttpClient (already in `app.config.ts`)
- Angular Material (Select, Input, Spinner components)
- RxJS for async operations
- ngx-webstorage-service (already used)

## Estimated Complexity

- **API Response Discovery**: 1-2 hours
- **Models & Interfaces**: 2-3 hours (including server API models)
- **Mapper Service Implementation**: 2-3 hours
- **Server Service Implementation**: 3-4 hours
- **UI Implementation**: 2-3 hours
- **State Management**: 2-3 hours
- **Testing & Bug Fixes**: 3-4 hours
- **Total**: ~18-25 hours

## Success Criteria

- ✅ User can select from predefined servers
- ✅ User can input custom server URL
- ✅ Server data fetches and merges correctly
- ✅ Selection persists across page refreshes
- ✅ Default behavior uses static data
- ✅ Error handling provides clear feedback
- ✅ No existing functionality breaks
- ✅ UI matches existing design patterns
