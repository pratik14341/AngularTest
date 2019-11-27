const loginModel = require('../model/login');
const userSettingAction = require('./userSetting');
const jwt = require('jsonwebtoken');
const crypto = require('../_helpers/criptoHelper')();

module.exports = {
    splashCall: async (body, args) => {
        return await loginModel.splashCall(body, args);
    },
    userWebLogin: async (body, args) => {
        const result = await loginModel.userLogin(body, args);
        let userId = -1;
        let token;
        let userRights;
        let allrights;
        let leftMenu;
        let userLayout;
        if (result.userid != -1) {
            userId = crypto.encrypt(result.userid.toString());
            token = jwt.sign({ 'usname': body.username }, require('fs').readFileSync('./config/rsa-private.pem'), { algorithm: 'RS256' })
            userRights = await userSettingAction.getUserRights(result.userid);
            leftMenu = await userSettingAction.getUserLeftMenu(JSON.parse(userRights));
            userLayout = await userSettingAction.getUserLayout(result.userid)
        }
        
      
        return {
            iserror: result.iserror,
            errormessage: result.errormessage,
            successmessage: result.successmessage,
            userid: userId.toString(),
            utoken: result.token,
            displayname: result.displayname,
            token: userId == -1 ? '' : token,
            userRights: userRights,
            userleftMenu: userId == -1 ? '' : leftMenu,
            gridcolumns: userId == -1 ? '' : userLayout
        };
    },
    userMobileLogin: async (body, args) => {
        const result = await loginModel.userLogin(body, args);
        let token;
        let userid = -1;
        if (result.userid != -1) {
            userid = crypto.encrypt(result.userid.toString());
            token = jwt.sign({ 'usname': body.username }, require('fs').readFileSync('./config/rsa-private.pem'), { algorithm: 'RS256' })
        }
        let userrights;
        let allrights;
        let leftMenu;
        allrights = await userSettingAction.getUserMobileRights(result.userid);
        userrights = allrights.result;
        leftMenu = allrights.mobileresult;
        return {
            iserror: result.iserror,
            errormessage: result.errormessage,
            successmessage: result.successmessage,
            userid: userid.toString(),
            utoken: result.token,
            displayname: result.displayname,
            token: userid == -1 ? '' : token,
            userRights: userrights,
            leftMenu: leftMenu
        };
    }
}