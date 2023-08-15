import * as _ from 'lodash';

let sampleData = {
    id: 1,
    name: 'Ace',
    password: 'P@5sw0rd',
    extraProperties: {
        ages: 18,
        hobbies: [
            'climbing',
            'swimming',
            'basketball',
            'movie'
        ],
        birthday: new Date('1990-03-03 08:00:00')
    },
    setExtraProperties: (name: string, value: any) => {
        sampleData.extraProperties[name] = value;
    }
}


const cloneBySpread = (data: any) => {
    return { ...data };
}

const cloneByObjectAssign = (data: any): any => {
    return Object.assign({}, data);
}

const cloneByObjectCreate = (data: any): any => {
    return Object.create(data);
}

const cloneByDeepClone = (data: any): any => {
    return _.cloneDeep(data);
}

const demoClone = (data: any, callback: (data: any) => any) => {
    console.log('===== Before Demo =====');
    console.log('Data:', data);
    console.log('\n');

    const copy = callback(data);
    copy.id = 2;
    copy.extraProperties.ages = 20;

    console.log('===== After Demo =====');
    console.log('Data:', data);
    console.log('Copy Data:', copy);
    console.log('\n');
}

//demoClone(sampleData, cloneBySpread);
//demoClone(sampleData, cloneByObjectAssign);
//demoClone(sampleData, cloneByObjectCreate);
demoClone(sampleData, cloneByDeepClone);
