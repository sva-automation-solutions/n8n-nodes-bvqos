import {
    ApplicationError,
    NodeConnectionType,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

export class BVQCustomNode implements INodeType {
    
	description: INodeTypeDescription = {
        displayName: 'BVQ - OS/Generic',
        name: 'bvq', 
        icon: 'file:Bvq.svg',
        group: ['transform'],
        version: 1,
        subtitle: 'Get BVQ Data from the OS (Generic folder)',
        description: 'Get data from the BVQ API from path BVQ/OS/Generic',
        defaults: {
            name: 'BVQ - OS/Generic',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'bvqapi',
                required: true,
            },
        ],        
        properties: [

            {
                displayName: 'Category',
                name: 'category',
                description: 'Select the category to get the information from',
                type: 'options',
                default: 'Performance',
                options : [
                    {
                        name: 'Performance Overview',
                        value: 'Performance',
                        description: 'Get the information from BVQ/OS/Generic/Performance overview'
                    },
                    {
                        name: 'Configuration Overview',
                        value: 'Configuration',
                        description: 'Get the information from BVQ/OS/Generic/Configuration overview'
                    },
                    {
                        name: 'Storage Performance (E2E)',
                        value : 'storagePerformance',
                        description: 'Get the information from BVQ/OS/Generic/Storage Performance'
                    },
                    {
                        name: 'Capacity',
                        value: 'Capacity',
                        description: 'Get the information from BVQ/OS/Generic/Capacity'
                    },
                    {
                        name: 'Table Views',
                        value: 'tableViews',
                        description: 'Get the information from BVQ/OS/Generic/Table views/..'
                    },
                ],
                required : true,

            },
            {
                displayName: 'Capacity options',
                name: 'capacityOptions',
                description: 'Select what type of information you want to get from the BVQ/OS/Generic/General OS capacity overview path',
                type: 'options',
                default: 'Filesystem',
                options: [
                    {
                        name: 'Filesystem',
                        value: 'Filesystem',
                        description: 'Get the information from BVQ/OS/Generic/Capacity/Filesystem'
                    },
                    {
                        name: 'Memory',
                        value: 'Memory',
                        description: 'Get the information from BVQ/OS/Generic/Capacity/Memory'
                    },
                    {
                        name: 'Network adapter',
                        value: 'Network%20adapter',
                        description: 'Get the information from BVQ/OS/Generic/Capacity/Network adapter'
                    },
                    {
                        name: 'Volume',
                        value : 'Volume',
                        description : 'Get the information from BVQ/OS/Generic/Capacity/Volume'
                    },
                ],
                required : true,
                displayOptions: {
                    show: {
                        category: ['Capacity'],
                    },
                },
            },
            {
                displayName: 'Performance options',
                name: 'performanceOptions',
                description: 'Select what type of information you want to get from the Performance overview path',
                type: 'options',
                default: 'OS%20Instance',
                options: [
                    {
                        name: 'OS Instance',
                        value: 'OS%20Instance',
                        description: 'Get the information from BVQ/OS/Generic/Performance/OS Instance'
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['Performance'],
                    },
                },
            },

            {
                displayName: 'Configuration options',
                name: 'configurationOptions',
                description: 'Select what type of information you want to get from the Configuration overview path',
                type: 'options',
                default: 'Filesystem',
                options: [
                    {
                        name: 'Filesystem',
                        value: 'Filesystem',
                        description: 'Get the information from BVQ/OS/Generic/Configuration/Filesystem'
                    },
                    {
                        name: 'OS Instance',
                        value: 'OS%20Instance',
                        description: 'Get the information from BVQ/OS/Generic/Configuration/OS Instance'
                    },
                    {
                        name: 'OS Network adapter',
                        value: 'OS%20Network%20adapter',
                        description: 'Get the information from BVQ/OS/Generic/Configuration/OS Network adapter'
                    },
                    {
                        name: 'Storage adapter',
                        value: 'Storage%20adapter',
                        description: 'Get the information from BVQ/OS/Generic/Configuration/Storage adapter'
                    }
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['Configuration'],
                    },
                },
            },
            {
                displayName: 'Storage performance options',
                name: 'storagePerformanceOpt',
                description: 'Select what type of information you want to get from the Storage performance overview path',
                type: 'options',
                default: 'OS%20Instance%20%2F%20Storage%20adapter%20%2F%20Volume',
                options: [
                    {
                        name: 'OS Instance/Storage Adapter/Volume',
                        value: 'OS%20Instance%20%2F%20Storage%20adapter%20%2F%20Volume',
                        description: 'Get the information from BVQ/OS/Generic/Storage performance/OS Instance'
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['storagePerformance'],
                    },
                },
            },
            {
                displayName: 'Table views options',
                name: 'tableViewsOptions',
                description: 'Select the category you want to see the table views from',
                type: 'options',
                default: 'System',
                options: [
                    {
                        name: 'System',
                        value: 'System',
                        description: 'Get the information from BVQ/OS/Generic/Table views/System/ ..'
                    },
                    {
                        name: 'Storage',
                        value: 'Storage',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Storage/ ..'
                    },
                    {
                        name: 'Network',
                        value: 'Network',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Network/ ..'
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['tableViews'],
                    },
                },
            },
            {
                displayName: 'Table views/System/ ..',
                name: 'tableViewsSystem',
                description: 'Select the table from BVQ/OS/Generic/Table views/System',
                type: 'options',
                default: 'OS%20Instance',
                options : [
                    {
                        name: 'OS Instance',
                        value: 'OS%20Instance',
                        description: 'Get the information from BVQ/OS/Generic/Table views/System/OS Instance'
                    },
                    {
                        name: 'OS Physical CPU',
                        value: 'OS%20Physical%20CPU',
                        description: 'Get the information from BVQ/OS/Generic/Table views/System/OS Physical CPU'
                    },
                    {
                        name: 'OS Logical CPU',
                        value: 'OS%20Logical%20CPU',
                        description: 'Get the information from BVQ/OS/Generic/Table views/System/OS Logical CPU'
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['tableViews'],
                        tableViewsOptions: ['System'],
                    },
                },
            }, 
            {
                displayName: 'Table views/Storage/ ..',
                name: 'tableViewsStorage',
                description: 'Select the table from BVQ/OS/Generic/Table views/Storage',
                type: 'options',
                default: 'OS%20Storage%20adapter',
                options: [
                    {
                        name: 'Storage adapter',
                        value: 'OS%20Storage%20adapter',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Storage/OS Storage adapter'
                    },
                    {
                        name: 'Volume',
                        value: 'OS%20Volume',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Storage/OS Volume'
                    },
                    {
                        name: 'Filesystem',
                        value: 'OS%20Filesystem',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Storage/OS Filesystem'
                    },
                    {
                        name: 'Swap space',
                        value: 'OS%20Swap%20space',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Storage/OS Swap space'
                    }

                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['tableViews'],
                        tableViewsOptions: ['Storage'],
                    },
                },
            },
            {
                displayName: 'Table views/Network/ ..',
                name: 'tableViewsNetwork',
                description: 'Select the table from BVQ/OS/Generic/Table views/Network',
                type: 'options',
                default: 'OS%20Network%20adapter',
                options: [
                    {
                        name: 'Network adapter',
                        value: 'OS%20Network%20adapter',
                        description: 'Get the information from BVQ/OS/Generic/Table views/Network/OS Network adapter'
                    },
                ],
                required: true,
                displayOptions: {
                    show: {
                        category: ['tableViews'],
                        tableViewsOptions: ['Network'],
                    },
                },
            },

		],
	};

    
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

        // Retrieve credentials
        const credentials = await this.getCredentials('bvqapi', 0);
        if (!credentials) {
            throw new ApplicationError('Missing credentials for BVQ API.');
        }

        const { username, password, apiKey, apiBaseURL, ignoreSslIssues } = credentials as {
			username: string;
			password: string;
            apiKey:string;
			apiBaseURL: string;
			ignoreSslIssues: boolean;
		};

        const Catg = this.getNodeParameter('category', 0) as string;
        let mainCat = 'OS';
        let capacityOption, performOption, configOption, storePerformOption, tableViewsOption;
        let tvSystemOption, tvStorageOption, tvNetworkOption;


        // Ensure API URL is properly formatted
        const baseUrl = apiBaseURL.replace(/\/$/, '');
	    let apiUrl: string;
        
        if(Catg === 'Performance') {
            let performanceURL = 'General%20OS%20performance%20overview%';
            performOption = this.getNodeParameter('performanceOptions', 0) as string;
            apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${performanceURL}2F${performOption}`
        } else if (Catg === 'Configuration'){
            let configurationURL = 'General%20OS%20configuration%20overview%';
            configOption = this.getNodeParameter('configurationOptions', 0) as string;
            apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${configurationURL}2F${configOption}`
        } else if(Catg === 'storagePerformance') {
            let storePerfURL = 'General%20OS%20Storage%20performance%20E2E%20overview%';
            storePerformOption = this.getNodeParameter('storagePerformanceOpt', 0) as string;
            apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${storePerfURL}2F${storePerformOption}`
        } else if(Catg === 'Capacity'){
            let capacityURL = 'General%20OS%20capacity%20overview%';
            capacityOption = this.getNodeParameter('capacityOptions', 0) as string;
            apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${capacityURL}2F${capacityOption}`


        } else if(Catg === 'tableViews') {
            let tableViewsURL = 'Table%20views%'
            tableViewsOption = this.getNodeParameter('tableViewsOptions', 0) as string;
            if(tableViewsOption === 'System') {
                tvSystemOption = this.getNodeParameter('tableViewsSystem', 0) as string;
                apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${tableViewsURL}2F${tableViewsOption}%2F${tvSystemOption}`
            } else if(tableViewsOption === 'Storage') {
                tvStorageOption = this.getNodeParameter('tableViewsStorage', 0) as string;
                apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${tableViewsURL}2F${tableViewsOption}%2F${tvStorageOption}`
            } else if(tableViewsOption === 'Network') {
                tvNetworkOption = this.getNodeParameter('tableViewsNetwork', 0) as string;
                apiUrl = `${baseUrl}/api/data_sources/favorite.json?favoritePath=System%2FOS%2FGeneric%2F${tableViewsURL}2F${tableViewsOption}%2F${tvNetworkOption}`
            } else {
                apiUrl ='';
            }
        
        
        }else {
            apiUrl = ` `;
        }

		for (let i = 0; i < items.length; i++) {
			try {
                const response = await this.helpers.request({
                    method: 'GET',
                    url: apiUrl,
                    rejectUnauthorized: !ignoreSslIssues,
                    auth: { username, password },
                    headers: { 'Content-Type': 'application/json' },
                });

                // Ensure the response is parsed JSON
                const jsonResponse = typeof response === 'string' ? JSON.parse(response) : response;

				returnData.push({ json: jsonResponse });
			} catch (error) {
				throw new ApplicationError(`BVQ API Request Failed: ${error.message}`);
			}
		}
		return [returnData];
	}
}