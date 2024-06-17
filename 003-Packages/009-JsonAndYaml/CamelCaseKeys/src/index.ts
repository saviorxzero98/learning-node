import * as camelcaseKeys from 'camelcase-keys';

let demoObjects = {
    'snake_case': {
        'id': 1,
        'user_name': 'one',
        'data': {
            'level': 1,
            'create_date': new Date()
        },
        'value': {
            'Id': 2,
            'Name': 'two'
        },
        'channel_data': {
            'Id': 2,
            'Name': 'two'
        }
    },
    'kebab-case': {
        'id': 1,
        'user-name': 'one',
        'data': {
            'level': 1,
            'create-date': new Date()
        },
        'value': {
            'Id': 2,
            'Name': 'two'
        },
        'channel-data': {
            'Id': 2,
            'Name': 'two'
        }
    },
    'camelCase': {
        'id': 1,
        'userName': 'one',
        'data': {
            'level': 1,
            'createDate': new Date()
        },
        'value': {
            'Id': 2,
            'Name': 'two'
        },
        'channelData': {
            'Id': 2,
            'Name': 'two'
        }
    },
    'PascalCase': {
        'Id': 1,
        'UserName': 'one',
        'Data': {
            'Level': 1,
            'CreateDate': new Date()
        },
        'Value': {
            'Id': 2,
            'Name': 'two'
        },
        'ChannelData': {
            'Id': 2,
            'Name': 'two'
        }
    },
    'Pascal Case': {
        'Id': 1,
        'User Name': 'one',
        'Data': {
            'Level': 1,
            'Create Date': new Date()
        },
        'Value': {
            'Id': 2,
            'Name': 'two'
        },
        'Channel Data': {
            'Id': 2,
            'Name': 'two'
        }
    },
    'nullObject': null
}


const demo = (name: string, data: any) => {
    console.log(`========== ${name} ==========`);
    console.log(`${JSON.stringify(camelcaseKeys(data, { deep: false, stopPaths: ['value', 'channelData'] }))}`);
    console.log('\n');
}


for(let key of Object.keys(demoObjects)) {
    demo(key, demoObjects[key]);
}

