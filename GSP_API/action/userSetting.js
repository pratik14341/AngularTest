const userSettingModel =  require('../model/userSetting');

module.exports = {
    getUserRights:async(userId) => {
        return await userSettingModel.getUserRights(userId);
    },
    getUserLeftMenu: async(userRights) => {
        return await userSettingModel.getUserLeftMenu(userRights);
    },
    getUserLayout: async(userId) => {
        return await userSettingModel.getUserLayout(userId);
    },
    saveUserGridLayout: async(body, args) => {
        return await userSettingModel.saveUserGridLayout(body, args);
    },
    removeUserGridLayout: async(body, args) => {
        return await userSettingModel.removeUserGridLayout(body, args);
    },
    getUserMobileRights: async(userId) => {
        return await userSettingModel.getUserMobileRights(userId)
    }
}