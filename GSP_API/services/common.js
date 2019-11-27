const Router = require('koa-router');
// const db = require('../db')
const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const errorlog = require('../_helpers/errorlog');
const router1 = new Router();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const commonAction = require('../action/common');
const crypto = require('../_helpers/criptoHelper')();


router1.post('/bindcombobox/lookup', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = JSON.parse(JSON.stringify(req.request.body));
        return await commonAction.getMappingSelectionList("tbllookupvalues",
        "lookupvalueid", "lookupvalue", "lookupnameid", "tbllookupname", "lookupnameid",
        !allFunction.isNullOrEmpty(reqParam.notIncludewhere) ? " lookupvalue not in (" + reqParam.notIncludewhere +
            ") And lower(lookupname) = '" + reqParam.lookupname.toLowerCase() + "'"
            : " lower(lookupname) = '" + reqParam.lookupname.toLowerCase() + "'",
        allFunction.isNullOrEmpty(reqParam.orderby) ? "lookupvalue" : reqParam.orderby);
    });
});

router1.post('/bindcombobox/headquarter', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = { 'tablename': "tblheadquarter", 'value': 'headquarterid', 'text': 'headquarter', where: '', orderby: '' };
        return await commonAction.getSelectionList(reqParam.tablename, reqParam.value, reqParam.text, reqParam.where, reqParam.orderBy);
    });
});

router1.post('/bindcombobox/subusertype', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let para = JSON.parse(JSON.stringify(req.request.body));
        let reqParam = { 'tablename': "tblsubusertype", 'value': 'subusertypeid', 'text': 'subusertype', 'mapId': 'usertypeid', 'mappingTable': 'tbllookupvalues', 'mappingTableId': 'lookupvalueid', where: 'maptable.lookupvalueid=' + para.usertypeid + '', orderby: '' };
        return await commonAction.getMappingSelectionList(reqParam.tablename, reqParam.value, reqParam.text, reqParam.mapId, reqParam.mappingTable, reqParam.mappingTableId, reqParam.where, reqParam.orderBy);
    });
});

router1.post('/bindcombobox/salesreason', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = { 'tablename': "tblvisitreason", 'value': 'visitreasonid', 'text': 'reason', where: "key  = 'sales'", orderby: '' };
        return await commonAction.getSelectionList(reqParam.tablename, reqParam.value, reqParam.text, reqParam.where, reqParam.orderBy);
    });
});

router1.post('/bindcombobox/collectionreason', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = { 'tablename': "tblvisitreason", 'value': 'visitreasonid', 'text': 'reason', where: "key  = 'collection'", orderby: '' };
        return await commonAction.getSelectionList(reqParam.tablename, reqParam.value, reqParam.text, reqParam.where, reqParam.orderBy);
    });
});

router1.post('/bindcombobox/zone', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getZoneList({userId});
    });
}); 

router1.post('/bindcombobox/customer', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getCustomerList({userId});
    });
}); 

router1.post('/bindcombobox/subregion', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getSubRegionList({userId});
    });
});

router1.post('/bindcombobox/depot', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getDepotList({userId});
    });
});

router1.post('/bindcombobox/territory', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getTerritoryList({userId});
    });
});

router1.post('/bindcombobox/role', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = { 'tablename': "tblrole", 'value': 'roleid', 'text': 'rolename', where: '', orderby: '' };
        return await commonAction.getSelectionList(reqParam.tablename, reqParam.value, reqParam.text, reqParam.where, reqParam.orderBy);
    });
});

router1.post('/bindcombobox/state', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await commonAction.getStateList({userId});
    });
});

router1.post('/bindcombobox/blockreason', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        return [ { "t":"GST/PAN"},{ "t":"Legal Status"},{ "t":"Legal Department"},{ "t":"Credit-Order Block"},{ "t":"Legal Case to Other Company"},{ "t":"Balance Confirmation"},{ "t":"Cheque Return"},{ "t":"Inactive Customer"},{ "t":"Special Case"},{ "t":"Sp. Case Remark"}];
    });
});

router1.post('/errorslog', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let reqParam = JSON.parse(JSON.stringify(req.request.body));
        errorlog.logErrorFromService(reqParam.error, reqParam.functionname, reqParam.storeproc, reqParam.params);
        return { result: 1 };
    });
});

module.exports = router1;