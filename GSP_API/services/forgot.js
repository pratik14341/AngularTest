const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const forgotAction = require('../action/forgot');


router1.post('/forgotSendOTP', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return await forgotAction.forgotSendOTP(req.request.body);
    });
});

router1.post('/forgotCheckOTP', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        try {
            let reqParam = req.request.body;
            let userId = crypto.decrypt(reqParam.userid.toString())
            return await forgotAction.forgotCheckOTP(reqParam, {userId});
        } catch (error) {
            throw error
        }
    });
});

router1.post('/forgotChangePassword', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        try {
            var reqParam = req.request.body;
            reqParam.userid = crypto.decrypt(reqParam.userid.toString());
            return await forgotAction.forgotChangePassword(reqParam);
        } catch (error) {
            throw error
        }
    });
});

module.exports = router1;