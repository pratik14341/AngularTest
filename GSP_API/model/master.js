const db = require('../db');
const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const filters = {};
const orders = {};

module.exports = {
    getList: async(body) => {        
        let reqParam = JSON.parse(JSON.stringify(body));
        Para.clear();
        Para.add("mode", "1", "int");
        if (reqParam.keyname == 'role') {

            Para.add("idtext", "roleid");
            Para.add("nametext", "rolename");
            Para.add("tablename", "tblrole");
            filters.id = "roleid";
            filters.name = "rolename";
        }
        return await allFunction.loadGrid("usp_masterentrycrud", reqParam, filters, orders, Para.values());
    },
    save: async(body) => {        
        let reqParam = JSON.parse(JSON.stringify(body));
        Para.clear();
        Para.add("mode", (reqParam.id > 0) ? "3" : "2", "int");
        if (reqParam.id > 0) Para.add("id", reqParam.id, "int");
        Para.add("name", reqParam.name);
        if (reqParam.keyname == 'role') {
            Para.add("idtext", "roleid");
            Para.add("nametext", "rolename");
            Para.add("tablename", "tblrole");
        }
        return await db.execute('usp_masterentrycrud', Para.values());
    },
};