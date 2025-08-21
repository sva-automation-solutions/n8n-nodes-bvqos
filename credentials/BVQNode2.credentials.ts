import type {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class BVQNode2 implements ICredentialType {
	name = 'bvqapi';
	displayName = 'BVQ API';

	documentationUrl =
        'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
			
		},
		{
			displayName: 'URL',
			name: 'apiBaseURL',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Ignore SSL Issues',
			name: 'ignoreSslIssues',
			type: 'boolean',
			default: false,
			description: 'Accept self-signed or invalid SSL certificates (unsafe)',
		}

	];

	test: ICredentialTestRequest = {
		request: {
			skipSslCertificateValidation: '={{$credentials.ignoreSslIssues}}',
			method: 'GET',
			url: '={{ $credentials.apiBaseURL.endsWith("/") ? $credentials.apiBaseURL + "api/data_sources/favorite.json?favoritePath=System%2FBVQ%2FTable%20views%2FLocalities%2FSite" : $credentials.apiBaseURL + "/api/data_sources/favorite.json?favoritePath=System%2FBVQ%2FTable%20views%2FLocalities%2FSite" }}',
			auth: {
				username: '={{ $credentials.username }}',
				password: '={{ $credentials.password }}',
			},
		},
	};
}