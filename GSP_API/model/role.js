const db = require('../db');
const Para = require('../config/Para')();

module.exports = {
    getRoleList: async (body) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '1', 'int');
        Para.add("roleid", reqParam.roleid, "int");
        return await db.execute('usp_tblrolepermissioncrud', Para.values(), true);
    },
    rolePermissionsInsert: async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '2', 'int');
        Para.add("roleid", reqParam.roleid, "int");
        Para.push("rolespecialpermissionrecords", JSON.stringify(reqParam.RoleRights));
        Para.push("loggedby", args.userId, 'int');
        return await db.execute('usp_tblrolepermissioncrud', Para.values(), true);
    }
}