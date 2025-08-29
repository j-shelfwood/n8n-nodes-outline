# n8n-nodes-outline Implementation

This document describes the implementation of the n8n-nodes-outline community node package.

## Architecture Overview

The package consists of three main components:

### 1. Credentials (`OutlineApi.credentials.ts`)

**Purpose**: Manages authentication with Outline API
**Features**:

- Base URL configuration (supports both hosted and self-hosted instances)
- API key authentication with secure password input
- Built-in credential testing via `/auth.info` endpoint
- Bearer token authentication header injection

**Key Implementation Details**:

- Uses generic authentication type for flexible header injection
- Includes documentation URL for user reference
- Credential test automatically validates API key on save

### 2. Main Node (`Outline.node.ts`)

**Purpose**: Primary interface for Outline API operations
**Resources Supported**:

- **Documents**: create, get, list, search, update, delete
- **Collections**: create, get, list, update, delete
- **Users**: get, list
- **Teams**: get
- **Auth**: info

**Key Implementation Details**:

- Comprehensive parameter validation and type safety
- Dynamic operation options based on selected resource
- Support for additional fields (pagination, filtering)
- Proper error handling with continue-on-fail support
- Structured response data with proper pairing for n8n workflows

**API Mapping**:

```typescript
// Document operations map to:
create -> POST /documents.create
get -> POST /documents.info
list -> POST /documents.list
search -> POST /documents.search
update -> POST /documents.update
delete -> POST /documents.delete

// Collection operations map to:
create -> POST /collections.create
get -> POST /collections.info
list -> POST /collections.list
update -> POST /collections.update
delete -> POST /collections.delete

// User operations map to:
get -> POST /users.info
list -> POST /users.list

// Team operations map to:
get -> POST /teams.info

// Auth operations map to:
info -> POST /auth.info
```

### 3. Webhook Node (`OutlineWebhook.node.ts`)

**Purpose**: Receives and processes Outline webhook events
**Features**:

- Multi-event selection support
- Event filtering based on configuration
- Webhook URL generation for Outline integration
- Standard n8n webhook response handling

**Supported Events**:

- `documents.create`, `documents.update`, `documents.delete`
- `documents.archive`, `documents.restore`
- `collections.create`, `collections.update`, `collections.delete`
- `users.create`, `users.update`

### 4. Generic Functions (`GenericFunctions.ts`)

**Purpose**: Shared API request helper functionality
**Features**:

- Centralized API request handling
- Credential injection and authentication
- Error handling and response processing
- Type-safe request/response handling

**Implementation**:

```typescript
export async function outlineApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {}
): Promise<any>;
```

## Design Patterns

### 1. Resource-Operation Pattern

- Top-level resource selection (document, collection, user, etc.)
- Operation selection based on resource type
- Dynamic parameter display based on resource + operation combination

### 2. Conditional Parameter Display

Uses n8n's `displayOptions.show` to create intuitive UX:

```typescript
displayOptions: {
    show: {
        resource: ['document'],
        operation: ['create'],
    },
}
```

### 3. Type Safety

- Full TypeScript implementation
- Proper n8n type imports and usage
- JsonObject casting for error handling
- NodeConnectionType for input/output definitions

### 4. Error Handling Strategy

- NodeApiError for API-related errors
- Graceful degradation with continue-on-fail
- Structured error responses for debugging
- Proper error message extraction

## API Integration Details

### Authentication Flow

1. User configures credentials with base URL and API key
2. Credential test validates against `/auth.info` endpoint
3. All requests include `Authorization: Bearer <api-key>` header
4. API responses include user/team context for validation

### Request Pattern

All Outline API endpoints follow RPC-style POST pattern:

```typescript
POST https://app.getoutline.com/api/{method}
Content-Type: application/json
Authorization: Bearer <api-key>

{
  // Request parameters
}
```

### Response Pattern

Standard Outline API response structure:

```typescript
{
  ok: boolean,
  data: any,
  policies?: any,
  pagination?: {
    limit: number,
    offset: number,
    total: number,
    nextPath?: string
  }
}
```

## Key Implementation Decisions

### 1. Comprehensive Resource Coverage

- Implemented all major Outline resources
- Prioritized most common operations for each resource
- Left room for extension with additional operations

### 2. Pagination Support

- Added limit/offset parameters in `additionalFields`
- Supports Outline's standard pagination pattern
- Returns full pagination metadata from API

### 3. Flexible Base URL

- Supports both hosted (`app.getoutline.com`) and self-hosted instances
- Default to hosted for ease of use
- Clear documentation for self-hosted setup

### 4. Webhook Event Filtering

- Multi-select event configuration
- Runtime filtering of webhook payloads
- No-response option for unmatched events

### 5. SVG Icon Design

- Created custom SVG icon representing document/outline concept
- Matches n8n's design guidelines
- Includes Outline branding elements (blue color scheme)

## File Structure

```
src/
├── credentials/
│   └── OutlineApi.credentials.ts
├── nodes/
│   ├── Outline/
│   │   ├── Outline.node.ts
│   │   ├── GenericFunctions.ts
│   │   └── outline.svg
│   └── OutlineWebhook/
│       ├── OutlineWebhook.node.ts
│       └── outline.svg
└── index.ts
```

## Development Considerations

### 1. TypeScript Configuration

- Strict TypeScript settings for type safety
- n8n-workflow peer dependency for proper types
- ESLint configuration for code quality

### 2. Build Process

- TypeScript compilation to JavaScript
- SVG asset copying to distribution
- Proper file structure for n8n loading

### 3. Testing Strategy

- Built-in credential testing
- Manual testing against live Outline API
- Error handling verification

### 4. Documentation

- Comprehensive README with examples
- Inline code documentation
- API reference links

## Future Enhancement Opportunities

1. **Extended Operations**: Add more specialized operations (export, import, etc.)
2. **Batch Operations**: Support for bulk document/collection operations
3. **Advanced Filtering**: More sophisticated search and filter options
4. **Caching**: Implement response caching for frequently accessed data
5. **Rate Limiting**: Built-in rate limit handling and retry logic
6. **Validation**: Enhanced input validation and sanitization
7. **Testing**: Automated test suite for API operations
