const Router = require('koa-router');
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const roleAction = require('../action/role');
const router1 = new Router();

router1.post('/role/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return await roleAction.getRoleList(req.request.body);
    });
});

router1.post('/role/save', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = req.request.body;
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await roleAction.rolePermissionsInsert(reqParam, {userId});
    });
});



module.exports = router1;