const Router = require('koa-router');
const router1 = new Router();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const crypto = require('../_helpers/criptoHelper')();
const _ = require('lodash');
const orderManagementAction = require('../action/orderManagement')

router1.post('/order/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return await orderManagementAction.getOrderList(req.request.body)
    });
});

router1.post('/order/saveorder', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await orderManagementAction.saveOrder(req.request.body, {userId})
    });
});

router1.post('/order/getorderhistory', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await orderManagementAction.getOrderHistory(req.request.body, {userId})
    });
});

router1.post('/order/getorderapprovallist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await orderManagementAction.getOrderApprovalList(req.request.body, {userId})
    });
});

router1.post('/order/saveorderapproval', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await orderManagementAction.saveOrderApproval(req.request.body, {userId})
    });
});
module.exports = router1;