const Router = require('koa-router');
const router1 = new Router();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const loginAction = require('../action/login');
const crypto = require('../_helpers/criptoHelper')();

router1.post('/splashcall', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await loginAction.splashCall(req.request.body, { userId })
    });
});

router1.post('/logout', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        var reqParam = req.request.body;
        let userid = crypto.decrypt(req.request.header.i.toString());
        return {
            logout: "Logout"
        };
    });
});

router1.post('/userlogin', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        var reqParam = req.request.body;
        let flgmobile = 0;
        if ((reqParam.ismobile == undefined || reqParam.ismobile == 0) && reqParam.username != "sapadmin") {
            flgmobile = 0; //Web Calling
            return await loginAction.userWebLogin(reqParam, { flgmobile });
        } else {
            flgmobile = 1; // Mobile Calling
            return await loginAction.userMobileLogin(reqParam, { flgmobile });
        }
    });
});

module.exports = router1;