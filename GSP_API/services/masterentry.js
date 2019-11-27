const Router = require('koa-router');
const MiddlewareWrapper = require('../component/middlewareWrapper');
const router1 = new Router();
const masterAction = require('../action/master');

router1.post('/masterentry/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {        
        return await masterAction.getList(req.request.body);
    });
});

router1.post('/masterentry/save', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {        
        return await masterAction.save(req.request.body);
    });
});
module.exports = router1;