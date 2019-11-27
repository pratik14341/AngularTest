const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const agingReportAction = require('../action/agingReport');
router1.post('/collectionreport/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await agingReportAction.getAgingReportList(req.request.body, { userId });
    });
});

module.exports = router1;