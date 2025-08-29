import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OutlineApi implements ICredentialType {
	name = 'outlineApi';
	displayName = 'Outline API';
	documentationUrl = 'https://getoutline.com/developers';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.getoutline.com',
			description:
				'Base URL of your Outline instance (e.g., https://app.getoutline.com or your self-hosted domain)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description:
				'Your Outline API key. Generate one under Settings → API & Apps in your Outline instance.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}/api',
			url: '/auth.info',
			method: 'POST',
		},
	};
}
