import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

export class OutlineWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Outline Webhook',
		name: 'outlineWebhook',
		icon: 'file:outline.svg',
		group: ['trigger'],
		version: 1,
		description: 'Receive Outline webhook events',
		defaults: {
			name: 'Outline Webhook',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Document Created',
						value: 'documents.create',
						description: 'Triggers when a document is created',
					},
					{
						name: 'Document Updated',
						value: 'documents.update',
						description: 'Triggers when a document is updated',
					},
					{
						name: 'Document Deleted',
						value: 'documents.delete',
						description: 'Triggers when a document is deleted',
					},
					{
						name: 'Document Archived',
						value: 'documents.archive',
						description: 'Triggers when a document is archived',
					},
					{
						name: 'Document Restored',
						value: 'documents.restore',
						description: 'Triggers when a document is restored',
					},
					{
						name: 'Collection Created',
						value: 'collections.create',
						description: 'Triggers when a collection is created',
					},
					{
						name: 'Collection Updated',
						value: 'collections.update',
						description: 'Triggers when a collection is updated',
					},
					{
						name: 'Collection Deleted',
						value: 'collections.delete',
						description: 'Triggers when a collection is deleted',
					},
					{
						name: 'User Created',
						value: 'users.create',
						description: 'Triggers when a user is created',
					},
					{
						name: 'User Updated',
						value: 'users.update',
						description: 'Triggers when a user is updated',
					},
				],
				default: [],
				description: 'The events to listen for',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const events = this.getNodeParameter('events') as string[];

		// If no events are specified, accept all events
		if (events.length === 0) {
			return {
				workflowData: [
					[
						{
							json: bodyData,
						},
					],
				],
			};
		}

		// Check if the received event matches one of the configured events
		const eventName = bodyData.name as string;
		if (events.includes(eventName)) {
			return {
				workflowData: [
					[
						{
							json: bodyData,
						},
					],
				],
			};
		}

		// Event not configured, don't trigger the workflow
		return {
			noWebhookResponse: true,
		};
	}
}
