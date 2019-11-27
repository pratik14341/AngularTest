const db = require('../db');
const Para = require('../config/Para')();

module.exports = {
    forgotSendOTP: async(body, args) => {
        var reqParam = body;
        Para.clear();
        Para.push("mode", "1", "int")
        Para.push("username", reqParam.username);
        Para.push("otp", args.otp);
        console.log("OTP - " + args.otp);
        return await db.execute('usp_forgotpassword', Para.values());
    },
    forgotCheckOTP: async(body, args) => {
        var reqParam = body;
        Para.clear();
        Para.push("mode", "2", "int")
        Para.push("username", reqParam.username);
        Para.push("userid", args.userId, "int");
        Para.push("otp", reqParam.otp);
        return await db.execute('usp_forgotpassword', Para.values());
    },
    forgotChangePassword: async(body) => {
        var reqParam = body;
        Para.clear();
        Para.push("mode", "3", "int")
        Para.push("username", reqParam.username);
        Para.push("userid", reqParam.userid, "int");
        Para.push("otp", reqParam.otp);
        Para.push("password", reqParam.password);
       return await db.execute('usp_forgotpassword', Para.values());
    }

}