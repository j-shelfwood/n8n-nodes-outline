import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
} from 'n8n-workflow';

import { outlineApiRequest } from './GenericFunctions';

export class Outline implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Outline',
		name: 'outline',
		icon: 'file:outline.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Outline knowledge base',
		defaults: {
			name: 'Outline',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'outlineApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Collection',
						value: 'collection',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'Auth',
						value: 'auth',
					},
				],
				default: 'document',
				required: true,
			},

			// Collection Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['collection'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new collection',
						action: 'Create a collection',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a collection',
						action: 'Delete a collection',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a collection',
						action: 'Get a collection',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all collections',
						action: 'List collections',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a collection',
						action: 'Update a collection',
					},
				],
				default: 'list',
				required: true,
			},

			// Document Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['document'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new document',
						action: 'Create a document',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a document',
						action: 'Delete a document',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a document',
						action: 'Get a document',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all documents',
						action: 'List documents',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search documents',
						action: 'Search documents',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a document',
						action: 'Update a document',
					},
				],
				default: 'list',
				required: true,
			},

			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get user information',
						action: 'Get a user',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all users',
						action: 'List users',
					},
				],
				default: 'list',
				required: true,
			},

			// Team Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['team'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get team information',
						action: 'Get team info',
					},
				],
				default: 'get',
				required: true,
			},

			// Auth Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['auth'],
					},
				},
				options: [
					{
						name: 'Get Info',
						value: 'info',
						description: 'Get authentication information',
						action: 'Get auth info',
					},
				],
				default: 'info',
				required: true,
			},

			// Collection fields
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the collection',
			},
			{
				displayName: 'Collection Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The name of the collection',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the collection',
			},

			// Document fields
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the document',
			},
			{
				displayName: 'Document Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The title of the document',
			},
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create', 'list'],
					},
				},
				default: '',
				description: 'The ID of the collection to create the document in or filter by',
			},
			{
				displayName: 'Content',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The content of the document in markdown format',
			},
			{
				displayName: 'Publish',
				name: 'publish',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['create'],
					},
				},
				default: true,
				description: 'Whether to publish the document immediately',
			},

			// Search fields
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['search'],
					},
				},
				default: '',
				description: 'The search query',
			},

			// User fields
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the user',
			},

			// Additional options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 100,
						},
						default: 25,
						description: 'Number of results to return',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						typeOptions: {
							minValue: 0,
						},
						default: 0,
						description: 'Number of results to skip',
					},
				],
				displayOptions: {
					show: {
						operation: ['list', 'search'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'collection') {
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const body: IDataObject = {
							name,
						};

						if (description) {
							body.description = description;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/collections.create',
							body
						);
					}

					if (operation === 'get') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;

						const body: IDataObject = {
							id: collectionId,
						};

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/collections.info',
							body
						);
					}

					if (operation === 'list') {
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i
						) as IDataObject;

						const body: IDataObject = {};

						if (additionalFields.limit) {
							body.limit = additionalFields.limit;
						}
						if (additionalFields.offset) {
							body.offset = additionalFields.offset;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/collections.list',
							body
						);
					}

					if (operation === 'update') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						const name = this.getNodeParameter('name', i, '') as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const body: IDataObject = {
							id: collectionId,
						};

						if (name) {
							body.name = name;
						}
						if (description) {
							body.description = description;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/collections.update',
							body
						);
					}

					if (operation === 'delete') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;

						const body: IDataObject = {
							id: collectionId,
						};

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/collections.delete',
							body
						);
					}
				}

				if (resource === 'document') {
					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const text = this.getNodeParameter('text', i, '') as string;
						const collectionId = this.getNodeParameter('collectionId', i, '') as string;
						const publish = this.getNodeParameter('publish', i, true) as boolean;

						const body: IDataObject = {
							title,
							text,
							publish,
						};

						if (collectionId) {
							body.collectionId = collectionId;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.create',
							body
						);
					}

					if (operation === 'get') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						const body: IDataObject = {
							id: documentId,
						};

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.info',
							body
						);
					}

					if (operation === 'list') {
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i
						) as IDataObject;
						const collectionId = this.getNodeParameter('collectionId', i, '') as string;

						const body: IDataObject = {};

						if (collectionId) {
							body.collectionId = collectionId;
						}
						if (additionalFields.limit) {
							body.limit = additionalFields.limit;
						}
						if (additionalFields.offset) {
							body.offset = additionalFields.offset;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.list',
							body
						);
					}

					if (operation === 'search') {
						const query = this.getNodeParameter('query', i) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i
						) as IDataObject;

						const body: IDataObject = {
							query,
						};

						if (additionalFields.limit) {
							body.limit = additionalFields.limit;
						}
						if (additionalFields.offset) {
							body.offset = additionalFields.offset;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.search',
							body
						);
					}

					if (operation === 'update') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const title = this.getNodeParameter('title', i, '') as string;
						const text = this.getNodeParameter('text', i, '') as string;

						const body: IDataObject = {
							id: documentId,
						};

						if (title) {
							body.title = title;
						}
						if (text) {
							body.text = text;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.update',
							body
						);
					}

					if (operation === 'delete') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						const body: IDataObject = {
							id: documentId,
						};

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/documents.delete',
							body
						);
					}
				}

				if (resource === 'user') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;

						const body: IDataObject = {
							id: userId,
						};

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/users.info',
							body
						);
					}

					if (operation === 'list') {
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							i
						) as IDataObject;

						const body: IDataObject = {};

						if (additionalFields.limit) {
							body.limit = additionalFields.limit;
						}
						if (additionalFields.offset) {
							body.offset = additionalFields.offset;
						}

						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/users.list',
							body
						);
					}
				}

				if (resource === 'team') {
					if (operation === 'get') {
						responseData = await outlineApiRequest.call(
							this,
							'POST',
							'/teams.info',
							{}
						);
					}
				}

				if (resource === 'auth') {
					if (operation === 'info') {
						responseData = await outlineApiRequest.call(this, 'POST', '/auth.info', {});
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as INodeExecutionData[]);
				} else {
					returnData.push({
						json: responseData,
						pairedItem: {
							item: i,
						},
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
