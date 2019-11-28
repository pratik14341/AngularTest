const Router = require('koa-router');
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const userLoginAction = require('../action/userLogin');

const router1 = new Router();
router1.post('/userlogin/list', async (req) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
      return await userLoginAction.getList(req.request.body)
    });
});

router1.post('/userlogin/entry', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userid = crypto.decrypt(req.request.header.i.toString());
        return await userLoginAction.userInsertUpdate(req.request.body,{userid});
    });
});

router1.post('/userlogin/getdata', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userid = crypto.decrypt(req.request.header.i.toString());
        return await userLoginAction.getData(req.request.body, {userid});
    });
});

router1.post('/userlogin/resendsms', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userid = crypto.decrypt(req.request.header.i.toString());
        return await userLoginAction.sendWelcomeSMS(req.request.body, {userid});
    });
});

router1.post('/userlogin/useractiveinactive', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return await userLoginAction.userActiveInactive(req.request.body);
    });
});

router1.post('/userlogin/checkexistsvalidation', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return await userLoginAction.existsValidationCheck(req.request.body);
    });
});



module.exports = router1;