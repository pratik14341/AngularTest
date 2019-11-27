const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const productMasterReportAction = require('../action/productMasterReport');
router1.post('/inventoryreport/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await productMasterReportAction.getProductMasterReportList(req.request.body, { userId });
    });
});

module.exports = router1;