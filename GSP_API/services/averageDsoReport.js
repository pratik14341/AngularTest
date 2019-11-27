const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const averageDsoReportAction = require('../action/averageDsoReport');
router1.post('/averagedsoreport/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await averageDsoReportAction.getAverageDsoReportList(req.request.body, { userId });
    });
});

module.exports = router1;