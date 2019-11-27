const db = require('../db');
const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const config = require('../config/index');
const sms = require('../component/SMS');
const filters = {
    "userid": 'userid::character varying'
    , "username": 'u.username'
    , "displayname": 'u.displayname'
    , "employeecode": "u.employeecode"
    , "address1": "u.address1"
    , "address2": "u.address2"
    , "pincode": "u.pincode"
    , "email": "u.email"
    , "salescode": "u.salescode"
    , "designation": "u.designation"
    , "dob": "to_char(u.dob,'dd/MM/yyyy')"
    , "gender": "gender.lookupvalue"
    , "usertype": "usertype.lookupvalue"
    , "subusertype": "sut.subusertype"
    , "grade": "grade.lookupvalue"
    , "headquarter": "headquarter.headquarter"
    , "vehicle": "vehicle.lookupvalue"
    , "createddate": "to_char(u.createddate,'dd/MM/yyyy')"
    , "createdby": "cby.displayname"
    , "sendsms": "CASE WHEN(u.sendsms) THEN 'Yes' ELSE 'No' end"
    , "isactive": "CASE WHEN(u.isinactive) THEN 'NO' ELSE 'YES' end"
    , "modifieddate": "to_char(u.modifieddate,'dd/MM/yyyy')"
    , "modifiedby": "mby.displayname"
    , "password": "u.password"
    , "rolename": "role.rolename"
};
const orders = {};
const message = 'Dear ##displayname##, \nWelcome to Ridhdhi Plus mobile app. \nYou can download the app from below link. \nAndroid: - \niOS: - \n\nYou can access the portal from below link: \n##liveWebURL## \nUse your registered number for login.\n\n Riddhi+ Team';

module.exports = {
    getList: async (body) => {
        let reqParam = body;
        Para.clear();
        Para.add("mode", "1", "int");
        return await allFunction.loadGrid("usp_userlogincrud", reqParam, filters, orders, Para.values(), "displayname asc");
    },
    userInsertUpdate: async (body, args) => {
        let reqParam = body;
        Para.clear();
        if (reqParam.userid > 0) {
            Para.push("userid", reqParam.userid, 'int');
            Para.push("mode", '4', 'int');
        } else {
            let username = reqParam.userentry[0].username;
            let sendsms = reqParam.userentry[0].sendsms;
            let smsMessage = message.replace('##liveWebURL##', config.setting.liveWebURL).replace('##displayname##', reqParam.displayname);
            if (sendsms) {
                let SMSAPI = await sms.sendSMSAsync(username, smsMessage);
            }
            Para.push("mode", '3', 'int');
        }
        Para.push("loggedby", args.userid, 'int');
        Para.push("json", JSON.stringify(reqParam.userentry));

        return await db.execute('usp_userlogincrud', Para.values());
    },
    getData: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '2', 'int');
        Para.push("userid", reqParam.userid, 'int');
        Para.push("loggedby", args.userid, 'int');
        return await db.execute('usp_userlogincrud', Para.values());
    },
    sendWelcomeSMS: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '5', 'int');
        Para.push("userid", reqParam.userid, 'int');
        Para.push("loggedby", args.userid, 'int');
        let username = reqParam.username;
        let smsMessage = message.replace('##liveWebURL##', config.setting.liveWebURL).replace('##displayname##', reqParam.displayname);
        let SMSAPI = await sms.sendSMSAsync(username, smsMessage);
        return await db.execute('usp_userlogincrud', Para.values());
    },
    userActiveInactive: async(body) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '6', 'int');
        Para.push("userid", reqParam.userid, 'int');
        Para.push("isactive", reqParam.isactive, 'boolean');
        return await db.execute('usp_userlogincrud', Para.values());
    },
    existsValidationCheck: async(body) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '7', 'int');
        Para.push("userid", reqParam.userid, 'int');
        Para.push("json", JSON.stringify(reqParam.userentry));
        return await db.execute('usp_userlogincrud', Para.values());
    }
}