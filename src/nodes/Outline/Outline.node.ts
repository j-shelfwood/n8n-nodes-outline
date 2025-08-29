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
                        name: 'Attachment',
                        value: 'attachment',
                    },
                    {
                        name: 'Auth',
                        value: 'auth',
                    },
                    {
                        name: 'Collection',
                        value: 'collection',
                    },
                    {
                        name: 'Comment',
                        value: 'comment',
                    },
                    {
                        name: 'Document',
                        value: 'document',
                    },
                    {
                        name: 'Event',
                        value: 'event',
                    },
                    {
                        name: 'File Operation',
                        value: 'fileOperation',
                    },
                    {
                        name: 'Group',
                        value: 'group',
                    },
                    {
                        name: 'Team',
                        value: 'team',
                    },
                    {
                        name: 'User',
                        value: 'user',
                    },
                ],
                default: 'document',
                required: true,
            },

            // Attachment Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['attachment'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create an attachment',
                        action: 'Create an attachment',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete an attachment',
                        action: 'Delete an attachment',
                    },
                    {
                        name: 'Get Redirect URL',
                        value: 'redirect',
                        description: 'Get redirect URL for an attachment',
                        action: 'Get attachment redirect URL',
                    },
                ],
                default: 'create',
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
                        name: 'Get Config',
                        value: 'config',
                        description: 'Get authentication configuration',
                        action: 'Get auth config',
                    },
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
                        name: 'Add Group',
                        value: 'addGroup',
                        description: 'Add a group to a collection',
                        action: 'Add group to collection',
                    },
                    {
                        name: 'Add User',
                        value: 'addUser',
                        description: 'Add a user to a collection',
                        action: 'Add user to collection',
                    },
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
                        name: 'Export',
                        value: 'export',
                        description: 'Export a collection',
                        action: 'Export a collection',
                    },
                    {
                        name: 'Export All',
                        value: 'exportAll',
                        description: 'Export all collections',
                        action: 'Export all collections',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a collection',
                        action: 'Get a collection',
                    },
                    {
                        name: 'Get Documents',
                        value: 'documents',
                        description: 'Get documents in a collection',
                        action: 'Get collection documents',
                    },
                    {
                        name: 'Get Group Memberships',
                        value: 'groupMemberships',
                        description: 'Get group memberships for a collection',
                        action: 'Get collection group memberships',
                    },
                    {
                        name: 'Get Memberships',
                        value: 'memberships',
                        description: 'Get user memberships for a collection',
                        action: 'Get collection memberships',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List all collections',
                        action: 'List collections',
                    },
                    {
                        name: 'Remove Group',
                        value: 'removeGroup',
                        description: 'Remove a group from a collection',
                        action: 'Remove group from collection',
                    },
                    {
                        name: 'Remove User',
                        value: 'removeUser',
                        description: 'Remove a user from a collection',
                        action: 'Remove user from collection',
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

            // Comment Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                    },
                },
                options: [
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a comment',
                        action: 'Create a comment',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete a comment',
                        action: 'Delete a comment',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a comment',
                        action: 'Get a comment',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List comments',
                        action: 'List comments',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        description: 'Update a comment',
                        action: 'Update a comment',
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
                        name: 'Add User',
                        value: 'addUser',
                        description: 'Add a user to a document',
                        action: 'Add user to document',
                    },
                    {
                        name: 'Answer Question',
                        value: 'answerQuestion',
                        description: 'Answer a question about a document using AI',
                        action: 'Answer question about document',
                    },
                    {
                        name: 'Archive',
                        value: 'archive',
                        description: 'Archive a document',
                        action: 'Archive a document',
                    },
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
                        name: 'Export',
                        value: 'export',
                        description: 'Export a document',
                        action: 'Export a document',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a document',
                        action: 'Get a document',
                    },
                    {
                        name: 'Get Drafts',
                        value: 'drafts',
                        description: 'Get draft documents',
                        action: 'Get draft documents',
                    },
                    {
                        name: 'Get Memberships',
                        value: 'memberships',
                        description: 'Get user memberships for a document',
                        action: 'Get document memberships',
                    },
                    {
                        name: 'Get Users',
                        value: 'users',
                        description: 'Get users with access to a document',
                        action: 'Get document users',
                    },
                    {
                        name: 'Get Viewed',
                        value: 'viewed',
                        description: 'Get recently viewed documents',
                        action: 'Get viewed documents',
                    },
                    {
                        name: 'Import',
                        value: 'import',
                        description: 'Import a document',
                        action: 'Import a document',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List all documents',
                        action: 'List documents',
                    },
                    {
                        name: 'Move',
                        value: 'move',
                        description: 'Move a document',
                        action: 'Move a document',
                    },
                    {
                        name: 'Remove User',
                        value: 'removeUser',
                        description: 'Remove a user from a document',
                        action: 'Remove user from document',
                    },
                    {
                        name: 'Restore',
                        value: 'restore',
                        description: 'Restore an archived document',
                        action: 'Restore a document',
                    },
                    {
                        name: 'Search',
                        value: 'search',
                        description: 'Search documents',
                        action: 'Search documents',
                    },
                    {
                        name: 'Templatize',
                        value: 'templatize',
                        description: 'Create a template from a document',
                        action: 'Templatize a document',
                    },
                    {
                        name: 'Unpublish',
                        value: 'unpublish',
                        description: 'Unpublish a document',
                        action: 'Unpublish a document',
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

            // Event Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['event'],
                    },
                },
                options: [
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List events (audit trail)',
                        action: 'List events',
                    },
                ],
                default: 'list',
                required: true,
            },

            // File Operation Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['fileOperation'],
                    },
                },
                options: [
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete a file operation',
                        action: 'Delete a file operation',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a file operation',
                        action: 'Get a file operation',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List file operations',
                        action: 'List file operations',
                    },
                    {
                        name: 'Redirect',
                        value: 'redirect',
                        description: 'Get redirect URL for file operation result',
                        action: 'Get file operation redirect',
                    },
                ],
                default: 'list',
                required: true,
            },

            // Group Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                    },
                },
                options: [
                    {
                        name: 'Add User',
                        value: 'addUser',
                        description: 'Add a user to a group',
                        action: 'Add user to group',
                    },
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a new group',
                        action: 'Create a group',
                    },
                    {
                        name: 'Delete',
                        value: 'delete',
                        description: 'Delete a group',
                        action: 'Delete a group',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a group',
                        action: 'Get a group',
                    },
                    {
                        name: 'Get Memberships',
                        value: 'memberships',
                        description: 'Get group memberships',
                        action: 'Get group memberships',
                    },
                    {
                        name: 'List',
                        value: 'list',
                        description: 'List all groups',
                        action: 'List groups',
                    },
                    {
                        name: 'Remove User',
                        value: 'removeUser',
                        description: 'Remove a user from a group',
                        action: 'Remove user from group',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        description: 'Update a group',
                        action: 'Update a group',
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

            // Attachment fields
            {
                displayName: 'Attachment ID',
                name: 'attachmentId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['attachment'],
                        operation: ['delete', 'redirect'],
                    },
                },
                default: '',
                description: 'The ID of the attachment',
            },
            {
                displayName: 'File Name',
                name: 'fileName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['attachment'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'The name of the file',
            },
            {
                displayName: 'Content Type',
                name: 'contentType',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['attachment'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'The MIME type of the file (e.g., image/png)',
            },
            {
                displayName: 'File Size',
                name: 'fileSize',
                type: 'number',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['attachment'],
                        operation: ['create'],
                    },
                },
                default: 0,
                description: 'Size of the file in bytes',
            },

            // Comment fields
            {
                displayName: 'Comment ID',
                name: 'commentId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['get', 'update', 'delete'],
                    },
                },
                default: '',
                description: 'The ID of the comment',
            },
            {
                displayName: 'Comment Data',
                name: 'commentData',
                type: 'string',
                typeOptions: {
                    rows: 3,
                },
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['create', 'update'],
                    },
                },
                default: '',
                description: 'The content of the comment',
            },

            // Group fields
            {
                displayName: 'Group ID',
                name: 'groupId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                        operation: ['get', 'update', 'delete', 'addUser', 'removeUser', 'memberships'],
                    },
                },
                default: '',
                description: 'The ID of the group',
            },
            {
                displayName: 'Group Name',
                name: 'groupName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['group'],
                        operation: ['create'],
                    },
                },
                default: '',
                description: 'The name of the group',
            },

            // File Operation fields
            {
                displayName: 'File Operation ID',
                name: 'fileOperationId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['fileOperation'],
                        operation: ['get', 'delete', 'redirect'],
                    },
                },
                default: '',
                description: 'The ID of the file operation',
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
                        operation: ['get', 'update', 'delete', 'documents', 'addUser', 'removeUser', 'memberships', 'addGroup', 'removeGroup', 'groupMemberships', 'export'],
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
                        operation: ['get', 'update', 'delete', 'archive', 'restore', 'move', 'export', 'addUser', 'removeUser', 'memberships', 'users', 'unpublish', 'templatize'],
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

            // Search and advanced fields
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['search', 'answerQuestion'],
                    },
                },
                default: '',
                description: 'The search query or question',
            },
            {
                displayName: 'Target Collection ID',
                name: 'targetCollectionId',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['move'],
                    },
                },
                default: '',
                description: 'The ID of the target collection to move the document to',
            },
            {
                displayName: 'Parent Document ID',
                name: 'parentDocumentId',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['create', 'move'],
                    },
                },
                default: '',
                description: 'The ID of the parent document',
            },
            {
                displayName: 'Template',
                name: 'template',
                type: 'boolean',
                displayOptions: {
                    show: {
                        resource: ['document'],
                        operation: ['create'],
                    },
                },
                default: false,
                description: 'Whether to create the document as a template',
            },

            // User/Group assignment fields
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
            {
                displayName: 'User ID',
                name: 'userId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['collection', 'document', 'group'],
                        operation: ['addUser', 'removeUser'],
                    },
                },
                default: '',
                description: 'The ID of the user to add or remove',
            },
            {
                displayName: 'Permission',
                name: 'permission',
                type: 'options',
                options: [
                    {
                        name: 'Read',
                        value: 'read',
                    },
                    {
                        name: 'Read & Write',
                        value: 'read_write',
                    },
                ],
                displayOptions: {
                    show: {
                        resource: ['collection', 'document'],
                        operation: ['addUser', 'addGroup'],
                    },
                },
                default: 'read',
                description: 'The permission level to grant',
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
                        displayName: 'Date Filter',
                        name: 'dateFilter',
                        type: 'options',
                        options: [
                            {
                                name: 'Day',
                                value: 'day',
                            },
                            {
                                name: 'Week',
                                value: 'week',
                            },
                            {
                                name: 'Month',
                                value: 'month',
                            },
                            {
                                name: 'Year',
                                value: 'year',
                            },
                        ],
                        default: '',
                        description: 'Filter by date range',
                    },
                    {
                        displayName: 'Include Archived',
                        name: 'includeArchived',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to include archived documents in results',
                    },
                    {
                        displayName: 'Include Drafts',
                        name: 'includeDrafts',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to include draft documents in results',
                    },
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
                    {
                        displayName: 'Sort',
                        name: 'sort',
                        type: 'options',
                        options: [
                            {
                                name: 'Created At',
                                value: 'createdAt',
                            },
                            {
                                name: 'Updated At',
                                value: 'updatedAt',
                            },
                            {
                                name: 'Title',
                                value: 'title',
                            },
                            {
                                name: 'Index',
                                value: 'index',
                            },
                        ],
                        default: 'updatedAt',
                        description: 'Field to sort by',
                    },
                    {
                        displayName: 'Direction',
                        name: 'direction',
                        type: 'options',
                        options: [
                            {
                                name: 'Ascending',
                                value: 'ASC',
                            },
                            {
                                name: 'Descending',
                                value: 'DESC',
                            },
                        ],
                        default: 'DESC',
                        description: 'Sort direction',
                    },
                    {
                        displayName: 'Status Filter',
                        name: 'statusFilter',
                        type: 'multiOptions',
                        options: [
                            {
                                name: 'Published',
                                value: 'published',
                            },
                            {
                                name: 'Draft',
                                value: 'draft',
                            },
                            {
                                name: 'Archived',
                                value: 'archived',
                            },
                        ],
                        default: ['published'],
                        description: 'Filter by document status',
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

                if (resource === 'attachment') {
                    if (operation === 'create') {
                        const fileName = this.getNodeParameter('fileName', i) as string;
                        const contentType = this.getNodeParameter('contentType', i) as string;
                        const fileSize = this.getNodeParameter('fileSize', i) as number;
                        const documentId = this.getNodeParameter('documentId', i, '') as string;

                        const body: IDataObject = {
                            name: fileName,
                            contentType,
                            size: fileSize,
                        };

                        if (documentId) {
                            body.documentId = documentId;
                        }

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/attachments.create',
                            body
                        );
                    }

                    if (operation === 'delete') {
                        const attachmentId = this.getNodeParameter('attachmentId', i) as string;

                        const body: IDataObject = {
                            id: attachmentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/attachments.delete',
                            body
                        );
                    }

                    if (operation === 'redirect') {
                        const attachmentId = this.getNodeParameter('attachmentId', i) as string;

                        const body: IDataObject = {
                            id: attachmentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/attachments.redirect',
                            body
                        );
                    }
                }

                if (resource === 'auth') {
                    if (operation === 'info') {
                        responseData = await outlineApiRequest.call(this, 'POST', '/auth.info', {});
                    }

                    if (operation === 'config') {
                        responseData = await outlineApiRequest.call(this, 'POST', '/auth.config', {});
                    }
                }

                if (resource === 'comment') {
                    if (operation === 'create') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const commentData = this.getNodeParameter('commentData', i) as string;

                        const body: IDataObject = {
                            documentId,
                            data: commentData,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/comments.create',
                            body
                        );
                    }

                    if (operation === 'get') {
                        const commentId = this.getNodeParameter('commentId', i) as string;

                        const body: IDataObject = {
                            id: commentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/comments.info',
                            body
                        );
                    }

                    if (operation === 'list') {
                        const documentId = this.getNodeParameter('documentId', i, '') as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {};

                        if (documentId) {
                            body.documentId = documentId;
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
                            '/comments.list',
                            body
                        );
                    }

                    if (operation === 'update') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const commentData = this.getNodeParameter('commentData', i) as string;

                        const body: IDataObject = {
                            id: commentId,
                            data: commentData,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/comments.update',
                            body
                        );
                    }

                    if (operation === 'delete') {
                        const commentId = this.getNodeParameter('commentId', i) as string;

                        const body: IDataObject = {
                            id: commentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/comments.delete',
                            body
                        );
                    }
                }

                if (resource === 'event') {
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
                            '/events.list',
                            body
                        );
                    }
                }

                if (resource === 'fileOperation') {
                    if (operation === 'get') {
                        const fileOperationId = this.getNodeParameter('fileOperationId', i) as string;

                        const body: IDataObject = {
                            id: fileOperationId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/fileOperations.info',
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
                            '/fileOperations.list',
                            body
                        );
                    }

                    if (operation === 'delete') {
                        const fileOperationId = this.getNodeParameter('fileOperationId', i) as string;

                        const body: IDataObject = {
                            id: fileOperationId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/fileOperations.delete',
                            body
                        );
                    }

                    if (operation === 'redirect') {
                        const fileOperationId = this.getNodeParameter('fileOperationId', i) as string;

                        const body: IDataObject = {
                            id: fileOperationId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/fileOperations.redirect',
                            body
                        );
                    }
                }

                if (resource === 'group') {
                    if (operation === 'create') {
                        const groupName = this.getNodeParameter('groupName', i) as string;

                        const body: IDataObject = {
                            name: groupName,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.create',
                            body
                        );
                    }

                    if (operation === 'get') {
                        const groupId = this.getNodeParameter('groupId', i) as string;

                        const body: IDataObject = {
                            id: groupId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.info',
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
                            '/groups.list',
                            body
                        );
                    }

                    if (operation === 'update') {
                        const groupId = this.getNodeParameter('groupId', i) as string;
                        const groupName = this.getNodeParameter('groupName', i) as string;

                        const body: IDataObject = {
                            id: groupId,
                            name: groupName,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.update',
                            body
                        );
                    }

                    if (operation === 'delete') {
                        const groupId = this.getNodeParameter('groupId', i) as string;

                        const body: IDataObject = {
                            id: groupId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.delete',
                            body
                        );
                    }

                    if (operation === 'addUser') {
                        const groupId = this.getNodeParameter('groupId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;

                        const body: IDataObject = {
                            id: groupId,
                            userId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.add_user',
                            body
                        );
                    }

                    if (operation === 'removeUser') {
                        const groupId = this.getNodeParameter('groupId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;

                        const body: IDataObject = {
                            id: groupId,
                            userId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/groups.remove_user',
                            body
                        );
                    }

                    if (operation === 'memberships') {
                        const groupId = this.getNodeParameter('groupId', i) as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {
                            id: groupId,
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
                            '/groups.memberships',
                            body
                        );
                    }
                }

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

                    if (operation === 'documents') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {
                            id: collectionId,
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
                            '/collections.documents',
                            body
                        );
                    }

                    if (operation === 'addUser') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;
                        const permission = this.getNodeParameter('permission', i, 'read') as string;

                        const body: IDataObject = {
                            id: collectionId,
                            userId,
                            permission,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.add_user',
                            body
                        );
                    }

                    if (operation === 'removeUser') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;

                        const body: IDataObject = {
                            id: collectionId,
                            userId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.remove_user',
                            body
                        );
                    }

                    if (operation === 'memberships') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {
                            id: collectionId,
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
                            '/collections.memberships',
                            body
                        );
                    }

                    if (operation === 'addGroup') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const groupId = this.getNodeParameter('groupId', i) as string;
                        const permission = this.getNodeParameter('permission', i, 'read') as string;

                        const body: IDataObject = {
                            id: collectionId,
                            groupId,
                            permission,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.add_group',
                            body
                        );
                    }

                    if (operation === 'removeGroup') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const groupId = this.getNodeParameter('groupId', i) as string;

                        const body: IDataObject = {
                            id: collectionId,
                            groupId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.remove_group',
                            body
                        );
                    }

                    if (operation === 'groupMemberships') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {
                            id: collectionId,
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
                            '/collections.group_memberships',
                            body
                        );
                    }

                    if (operation === 'export') {
                        const collectionId = this.getNodeParameter('collectionId', i) as string;

                        const body: IDataObject = {
                            id: collectionId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.export',
                            body
                        );
                    }

                    if (operation === 'exportAll') {
                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/collections.export_all',
                            {}
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

                    if (operation === 'answerQuestion') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const question = this.getNodeParameter('question', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                            question,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.answer_question',
                            body
                        );
                    }

                    if (operation === 'archive') {
                        const documentId = this.getNodeParameter('documentId', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.archive',
                            body
                        );
                    }

                    if (operation === 'restore') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const revisionId = this.getNodeParameter('revisionId', i, '') as string;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        if (revisionId) {
                            body.revisionId = revisionId;
                        }

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.restore',
                            body
                        );
                    }

                    if (operation === 'duplicate') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const title = this.getNodeParameter('title', i, '') as string;
                        const collectionId = this.getNodeParameter('collectionId', i, '') as string;
                        const parentDocumentId = this.getNodeParameter('parentDocumentId', i, '') as string;
                        const publish = this.getNodeParameter('publish', i, true) as boolean;

                        const body: IDataObject = {
                            id: documentId,
                            publish,
                        };

                        if (title) {
                            body.title = title;
                        }
                        if (collectionId) {
                            body.collectionId = collectionId;
                        }
                        if (parentDocumentId) {
                            body.parentDocumentId = parentDocumentId;
                        }

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.duplicate',
                            body
                        );
                    }

                    if (operation === 'move') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const collectionId = this.getNodeParameter('collectionId', i, '') as string;
                        const parentDocumentId = this.getNodeParameter('parentDocumentId', i, '') as string;
                        const index = this.getNodeParameter('index', i, '') as number;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        if (collectionId) {
                            body.collectionId = collectionId;
                        }
                        if (parentDocumentId) {
                            body.parentDocumentId = parentDocumentId;
                        }
                        if (index) {
                            body.index = index;
                        }

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.move',
                            body
                        );
                    }

                    if (operation === 'import') {
                        const file = this.getNodeParameter('file', i) as string;
                        const collectionId = this.getNodeParameter('collectionId', i, '') as string;
                        const parentDocumentId = this.getNodeParameter('parentDocumentId', i, '') as string;
                        const publish = this.getNodeParameter('publish', i, true) as boolean;

                        const body: IDataObject = {
                            file,
                            publish,
                        };

                        if (collectionId) {
                            body.collectionId = collectionId;
                        }
                        if (parentDocumentId) {
                            body.parentDocumentId = parentDocumentId;
                        }

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.import',
                            body
                        );
                    }

                    if (operation === 'export') {
                        const documentId = this.getNodeParameter('documentId', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.export',
                            body
                        );
                    }

                    if (operation === 'templatize') {
                        const documentId = this.getNodeParameter('documentId', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.templatize',
                            body
                        );
                    }

                    if (operation === 'unpublish') {
                        const documentId = this.getNodeParameter('documentId', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.unpublish',
                            body
                        );
                    }

                    if (operation === 'memberships') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const additionalFields = this.getNodeParameter(
                            'additionalFields',
                            i
                        ) as IDataObject;

                        const body: IDataObject = {
                            id: documentId,
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
                            '/documents.memberships',
                            body
                        );
                    }

                    if (operation === 'addUser') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;
                        const permission = this.getNodeParameter('permission', i, 'read') as string;

                        const body: IDataObject = {
                            id: documentId,
                            userId,
                            permission,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.add_user',
                            body
                        );
                    }

                    if (operation === 'removeUser') {
                        const documentId = this.getNodeParameter('documentId', i) as string;
                        const userId = this.getNodeParameter('userId', i) as string;

                        const body: IDataObject = {
                            id: documentId,
                            userId,
                        };

                        responseData = await outlineApiRequest.call(
                            this,
                            'POST',
                            '/documents.remove_user',
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
