const userLoginModel = require('../model/userLogin');

module.exports = {
    getList: async(body) => {
        return await userLoginModel.getList(body);
    },
    userInsertUpdate: async(body, args) => {
        return await userLoginModel.userInsertUpdate(body, args);
    },
    getData: async(body,args) => {
        return await userLoginModel.getData(body,args);
    },
    sendWelcomeSMS: async(body,args) => {
        return await userLoginModel.sendWelcomeSMS(body,args);
    },
    userActiveInactive: async(body) => {
        return await userLoginModel.userActiveInactive(body);
    },
    existsValidationCheck: async(body) => {
        return await userLoginModel.existsValidationCheck(body);
    }
}