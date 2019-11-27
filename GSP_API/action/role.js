const roleModel = require('../model/role');

module.exports = {
    getRoleList: async(body) => {
        return await roleModel.getRoleList(body);
    },
    rolePermissionsInsert: async(body, args) => {
        return await roleModel.rolePermissionsInsert(body,args);
    }
}