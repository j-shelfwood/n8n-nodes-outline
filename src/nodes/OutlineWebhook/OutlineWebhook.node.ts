import {
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	IDataObject,
	NodeConnectionType,
	IHookFunctions,
} from 'n8n-workflow';
import { outlineApiRequest } from '../Outline/GenericFunctions';

export class OutlineWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Outline Webhook',
		name: 'outlineWebhook',
		icon: 'file:outline.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handles Outline webhook events',
		defaults: {
			name: 'Outline Webhook',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'outlineApi',
				required: true,
			},
		],
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

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId) {
					const endpoint = `/webhooks.info`;
					try {
						await outlineApiRequest.call(this, 'POST', endpoint, { id: webhookData.webhookId });
						return true;
					} catch (error) {
						// Webhook does not exist
						delete webhookData.webhookId;
						return false;
					}
				}
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events', []) as string[];
				if (events.length === 0) {
					return false;
				}

				const body = {
					url: webhookUrl,
					name: `n8n - ${this.getWorkflow().name} - ${this.getNode().name}`,
					events,
				};

				const response = await outlineApiRequest.call(this, 'POST', '/webhooks.create', body);

				if (response.data && response.data.id) {
					this.getWorkflowStaticData('node').webhookId = response.data.id;
					return true;
				}

				return false;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId) {
					const body = {
						id: webhookData.webhookId as string,
					};
					try {
						await outlineApiRequest.call(this, 'POST', '/webhooks.delete', body);
					} catch (error) {
						// ignore
					}
					delete webhookData.webhookId;
				}

				return true;
			},
		},
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
