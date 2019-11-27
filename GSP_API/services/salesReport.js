const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const salesReportAction = require('../action/salesReport');
router1.post('/salesreport/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await salesReportAction.getSalesReportList(req.request.body, { userId });
    });
});

module.exports = router1;