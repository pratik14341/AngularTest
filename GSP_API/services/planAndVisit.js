const Router = require('koa-router');
const router1 = new Router();
const crypto = require('../_helpers/criptoHelper')();
const MiddlewareWrapper = require('../component/middlewareWrapper');
const planAndVisitAction = require('../action/planAndVisit');
//For Mobile customer planed list 
router1.post('/planandvisit/list', async (req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.getCustomerPlanedList(req.request.body, { userId });
    });
});

//For mobile save customer planed
router1.post('/planandvisit/savecustomervisitplan', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.saveCustomerVisitPlan(req.request.body, { userId });
    });
});

//For Mobile Update customer planed
router1.post('/planandvisit/updatecustomervisitplan', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.updateCustomerVisitPlan(req.request.body, { userId });
    });
});

//For Mobile save/check-in to visit for customer 
router1.post('/planandvisit/checkincustomervisit', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.checkInCustomerVisit(req.request.body, { userId });
    });
});

//For Mobile save/check-out visit for customer
router1.post('/planandvisit/checkoutcustomervisit', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.checkOutCustomerVisit(req.request.body, { userId });
    });
});

//For Mobile retailer visit planed list 
router1.post('/planandvisit/retailerplanedlist', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.getRetailerPlanedList(req.request.body, { userId });
    });
});

//For Mobile farmer visit planed list 
router1.post('/planandvisit/farmerplanedlist', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.getFarmerPlanedList(req.request.body, { userId });
    });
});

//For Mobile review meeting planed list 
router1.post('/planandvisit/reviewmeetingplanedlist', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.getReviewMeetingPlanedList(req.request.body, { userId });
    });
});

//For Mobile farmer meeting planed list 
router1.post('/planandvisit/farmermeetingplanedlist', async(req, res) => {
    await MiddlewareWrapper.wrape(req, null, async () => {
        let userId = crypto.decrypt(req.request.header.i.toString());
        return await planAndVisitAction.getFarmerMeetingPlanedList(req.request.body, { userId });
    });
});

module.exports = router1;