const Router = require('koa-router');
const MiddlewareWrapper = require('../component/middlewareWrapper');
const router1 = new Router();
const subRegionAction = require('../action/subRegion');
router1.post('/subregion/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {        
        const args = {
            userId: req.request.header.i.toString(),
        }
        return await subRegionAction.getList(req.request.body, args);
    });
});

module.exports = router1;
