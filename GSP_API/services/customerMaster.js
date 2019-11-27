const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const customerMasterAction = require('../action/customerMaster');
//For Mobile Get Customer List
router1.post('/customer/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCustomerListForMobile(userId);
    });
});

router1.post('/customer/getteam', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getTeamForMobile(req.request.body, { userId })
    });
});

router1.post('/customer/getlocationlist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getLocationList(req.request.body, { userId })
    });
});

router1.post('/customer/getsalesreports', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getSalesReportsForMobile(req.request.body, { userId });
    });
});

router1.post('/customer/getsalesorderinvoices', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getSalesOrderInvoicesListForMobile(req.request.body, { userId });
    });
});

router1.post('/customer/getsalesorderinvoicesitem', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getSalesOrderInvoicesItemListForMobile(req.request.body, { userId });
    });
});

router1.post('/customer/getsalesreturn', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getSalesReturnListForMobile(req.request.body, { userId });
    });
});

router1.post('/customer/getcollectionlist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCollectionListForMobile(req.request.body, { userId })
    });
});
//For Web Get Customer List
router1.post('/customer/getcustomerlist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCustomerListForWeb(req.request.body, { userId });
    });
});

router1.post('/customer/getlocationandgspteam', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getLocationAndTeamForWeb(req.request.body, {userId})
    });
});

router1.post('/customer/getcustomersaleslist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCustomerSalesListForWeb(req.request.body, {userId})
    });
});

//For Web Get Customer Sales Return List
router1.post('/customer/getcustomersalesreturnlist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCustomerSalesReturnListForWeb(req.request.body, {userId})
    });
});

//For Web Get Customer Collection List
router1.post('/customer/getcustomercollectionlist', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getCustomerCollectionListForWeb(req.request.body, {userId})
    });
});

router1.post('/customer/getledgerreport', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getLedgerReport(req.request.body, {userId});
    });
});

//For Web Get Customer Order Invoices Item
router1.post('/customer/getinvoicesitem', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getSalesOrderInvoicesItemListForWeb(req.request.body, {userId})
    });
});

//For mobile aging graph
router1.post('/customer/getaginggraphdata', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await customerMasterAction.getAgingGraphData(req.request.body, {userId})
    });
});

module.exports = router1;