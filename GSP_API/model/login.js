const db = require('../db');
const Para = require('../config/Para')();

module.exports = {
    splashCall: async (body, args) => {
        var reqParam = body;
        if (reqParam.ismobile == 1) {
            Para.clear();
            Para.push("apkversion", reqParam.version);
            Para.push("userid", args.userId);
            return await db.execute('usp_checkversion', Para.values());
        } else {
            return {};
        }
    },
    userLogin: async (body, args) => {
        var reqParam = body;
        Para.clear();
        Para.push("username", reqParam.username);
        Para.push("password", reqParam.password);
        Para.push("flgmobile", args.flgmobile);
        return await db.execute('usp_checklogin', Para.values());
    }
}