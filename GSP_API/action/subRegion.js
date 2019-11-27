const subRegionModel = require('../model/subRegion');

module.exports = {
    getList: async(body, args) => {        
        return await subRegionModel.getList(body, args);
    },    
};