const masterModel = require('../model/master');

module.exports = {
    getList: async(body) => {        
        return await masterModel.getList(body);
    },
    save: async(body) => {        
        return await masterModel.save(body);
    },
};