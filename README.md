# n8n-nodes-outline

![Banner](https://img.shields.io/badge/n8n-nodes-outline-blue.svg)

A community node for n8n that allows you to interact with your Outline knowledge base through its API.

## Features

- ✅ **Full API Coverage**: Access all major Outline resources (Documents, Collections, Users, Teams)
- ✅ **Webhook Support**: Receive real-time events from Outline
- ✅ **Authentication**: Secure API key authentication with built-in credential testing
- ✅ **TypeScript**: Fully typed for better development experience

## Prerequisites

- n8n installed and running
- An Outline instance (hosted or self-hosted)
- An Outline API key (generate one in Settings → API & Apps)

## Installation

```bash
npm install n8n-nodes-outline
```

## Configuration

### Credentials

1. In n8n, go to **Credentials** in the left sidebar
2. Click **New Credential** and search for "Outline API"
3. Configure the credential with:
    - **Base URL**: Your Outline instance URL (e.g., `https://app.getoutline.com` or your self-hosted domain)
    - **API Key**: Your API key from Outline's Settings → API & Apps

### Testing Connection

The credential includes an automatic test to verify your API key and connection. Make sure the test passes before using the nodes.

## Nodes

### Outline Node

The main node for interacting with Outline's API.

#### Supported Resources

##### Documents

- **Create**: Create new documents
- **Get**: Retrieve document information
- **List**: List documents (with optional collection filtering)
- **Search**: Search for documents
- **Update**: Update document content and metadata
- **Delete**: Delete documents

##### Collections

- **Create**: Create new collections
- **Get**: Retrieve collection information
- **List**: List all collections
- **Update**: Update collection details
- **Delete**: Delete collections

##### Users

- **Get**: Get user information
- **List**: List team users

##### Teams

- **Get**: Get team information

##### Auth

- **Get Info**: Get authentication information and validate API key

#### Example Workflows

##### Create a Document

```json
{
	"resource": "document",
	"operation": "create",
	"title": "My New Document",
	"text": "# Welcome\n\nThis is the content of my document in markdown.",
	"collectionId": "your-collection-id",
	"publish": true
}
```

##### Search Documents

```json
{
	"resource": "document",
	"operation": "search",
	"query": "meeting notes",
	"additionalFields": {
		"limit": 10
	}
}
```

##### List Collections

```json
{
	"resource": "collection",
	"operation": "list",
	"additionalFields": {
		"limit": 25,
		"offset": 0
	}
}
```

### Outline Webhook Node

Trigger workflows based on Outline events.

#### Supported Events

- **documents.create**: Document created
- **documents.update**: Document updated
- **documents.delete**: Document deleted
- **documents.archive**: Document archived
- **documents.restore**: Document restored
- **collections.create**: Collection created
- **collections.update**: Collection updated
- **collections.delete**: Collection deleted
- **users.create**: User created
- **users.update**: User updated

#### Configuration

1. Add the **Outline Webhook** node to your workflow
2. Select the events you want to listen for
3. Copy the webhook URL
4. In your Outline instance, go to Settings → Webhooks and add the URL

## Local Development

To test this node locally with your n8n instance:

1. **Clone and build:**

    ```bash
    git clone <repository-url>
    cd n8n-nodes-outline
    bun install
    bun run build
    ```

2. **Link to n8n:**

    ```bash
    # Remove existing custom nodes
    rm -rf ~/.n8n/custom/*

    # Create symbolic link
    ln -s $(pwd) ~/.n8n/custom/n8n-nodes-outline
    ```

3. **Restart n8n** to pick up the new custom node.

## API Reference

This node implements the [Outline API](https://getoutline.com/developers) endpoints. Refer to the official documentation for detailed information about request/response formats and additional parameters.

### Rate Limits

Outline has rate limits in place. The node will respect these limits and return appropriate error messages when limits are exceeded.

### Error Handling

- All API errors are properly handled and returned as structured error objects
- Use the "Continue on Fail" option to handle errors gracefully in your workflows
- Check the `ok` field in responses to determine success/failure

## Examples

### Document Management Workflow

```json
{
	"nodes": [
		{
			"name": "Create Document",
			"type": "n8n-nodes-outline.outline",
			"parameters": {
				"resource": "document",
				"operation": "create",
				"title": "Weekly Report",
				"text": "# Weekly Report\n\n## Achievements\n- Item 1\n- Item 2",
				"collectionId": "collection-id",
				"publish": true
			}
		},
		{
			"name": "Update Document",
			"type": "n8n-nodes-outline.outline",
			"parameters": {
				"resource": "document",
				"operation": "update",
				"documentId": "{{ $node['Create Document'].json.data.id }}",
				"text": "# Updated Weekly Report\n\nContent updated!"
			}
		}
	]
}
```

### Webhook Integration

```json
{
	"nodes": [
		{
			"name": "Document Created Webhook",
			"type": "n8n-nodes-outline.outlineWebhook",
			"parameters": {
				"events": ["documents.create"]
			}
		},
		{
			"name": "Process New Document",
			"type": "n8n-nodes-base.set",
			"parameters": {
				"values": {
					"title": "{{ $node['Document Created Webhook'].json.data.title }}",
					"author": "{{ $node['Document Created Webhook'].json.data.createdBy.name }}"
				}
			}
		}
	]
}
```

## Troubleshooting

### Common Issues

1. **"Cannot find module 'n8n-workflow'"**
    - Ensure n8n is properly installed
    - Restart n8n after installing the node

2. **"401 Unauthorized"**
    - Check your API key is correct
    - Ensure the API key has sufficient permissions
    - Verify the base URL is correct

3. **"Rate limited"**
    - Wait for the rate limit to reset
    - Implement retry logic in your workflows

### Getting Help

- Check the [Outline API documentation](https://getoutline.com/developers)
- Review n8n's [community node documentation](https://docs.n8n.io/integrations/community-nodes/)
- Open an issue in the repository

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [Outline](https://getoutline.com/)
- [n8n](https://n8n.io/)
- [API Documentation](https://getoutline.com/developers)
- [Repository](https://github.com/j-shelfwood/n8n-nodes-outline)
