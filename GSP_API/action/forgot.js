const forgotModel = require('../model/forgot');
const crypto = require('../_helpers/criptoHelper')();
const sms = require('../component/SMS');

module.exports = {
    forgotSendOTP: async (body) => {
        let otp = Math.floor(1000 + Math.random() * 9000);
        let otpMessage = 'Your verification OTP to reset password is ' + otp + '.';
        const result = await forgotModel.forgotSendOTP(body, { otp });
        let userId = -1;
        if (result.userid != -1 && !result.iserror) {
            userId = crypto.encrypt(result.userid.toString());
            let SMSAPI = await sms.sendSMSSync(result.username, otpMessage);
            if (SMSAPI) {
                return {
                    userid: userId.toString(),
                    username: result.username,
                    displayname: result.displayname,
                    iserror: result.iserror,
                    errormessage: result.errormessage
                };
            } else {
                return {
                    userid: userId.toString(),
                    username: result.username,
                    displayname: result.displayname,
                    iserror: true,
                    errormessage: "Error in send OTP, please try again"
                };
            }
        } else {
            return {
                userid: userId.toString(),
                username: result.username,
                displayname: result.displayname,
                iserror: result.iserror,
                errormessage: result.errormessage
            };
        }
    },
    forgotCheckOTP: async (body, args) => {
        const result = await forgotModel.forgotCheckOTP(body, args);
        let userId = -1;
        if (result.userid != -1 && !result.iserror) {
            userId = crypto.encrypt(result.userid.toString());
            return {
                userid: userId.toString(),
                username: result.username,
                displayname: result.displayname,
                iserror: result.iserror,
                errormessage: result.errormessage
            };
        } else {
            return {
                userid: userId.toString(),
                username: result.username,
                displayname: result.displayname,
                iserror: result.iserror,
                errormessage: result.errormessage
            };
        }
    },
    forgotChangePassword: async (body) => {
        const result = await forgotModel.forgotChangePassword(body);
        let userid = -1;
        if (result.userid != -1 && !result.iserror) {
            userid = crypto.encrypt(result.userid.toString());
            return {
                userid: userid.toString(),
                username: result.username,
                displayname: result.displayname,
                iserror: result.iserror,
                errormessage: result.errormessage
            };
        } else {
            return {
                userid: userid.toString(),
                username: result.username,
                displayname: result.displayname,
                iserror: result.iserror,
                errormessage: result.errormessage
            };
        }
    }
}