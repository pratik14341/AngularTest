const db = require('../db');
const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const crypto = require('../_helpers/criptoHelper')();
const filters = {
    "id": 'id::character varying',
    "subregion": 'subregion::character varying',
    "name": 'name::character varying'
};
const orders = {
    "id": 'id',
    "subregion": 'subregion',
    "name": 'name'
};

module.exports = {
    getList: async(body, args) => {        
        const reqParam = JSON.parse(JSON.stringify(body));
        const userId = crypto.decrypt(args.userId.toString());
        Para.clear();
        Para.add("mode", "1", "int");
        Para.add("loggedby", userId, "int");
        return await allFunction.loadGrid("usp_tblsubregioncrud", reqParam, filters, orders, Para.values());        
    },    
};