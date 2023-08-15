"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
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
    setExtraProperties: (name, value) => {
        sampleData.extraProperties[name] = value;
    }
};
const cloneBySpread = (data) => {
    return Object.assign({}, data);
};
const cloneByObjectAssign = (data) => {
    return Object.assign({}, data);
};
const cloneByObjectCreate = (data) => {
    return Object.create(data);
};
const cloneByDeepClone = (data) => {
    return _.cloneDeep(data);
};
const demoClone = (data, callback) => {
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
};
//demoClone(sampleData, cloneBySpread);
//demoClone(sampleData, cloneByObjectAssign);
//demoClone(sampleData, cloneByObjectCreate);
//demoClone(sampleData, cloneByDeepClone);
function setHiddenProperty(target, source, propertyName = 'password') {
    if (!source) {
        source = target;
    }
    Object.defineProperty(target, propertyName, {
        enumerable: false,
        value: source[propertyName],
    });
}
const demoSetHiddenProperty = (data) => {
    let dataCopy = _.cloneDeep(data);
    setHiddenProperty(dataCopy, data);
};
demoSetHiddenProperty(sampleData);
//# sourceMappingURL=index.js.map