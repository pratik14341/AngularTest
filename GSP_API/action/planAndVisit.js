const planAndVisitModel = require('../model/planAndVisit');

module.exports = {
    getCustomerPlanedList: async(body, args) => {
        return await planAndVisitModel.getCustomerPlanedList(body, args);
    },
    saveCustomerVisitPlan: async(body, args) => {
        return await planAndVisitModel.saveCustomerVisitPlan(body, args);
    },
    updateCustomerVisitPlan: async(body, args) => {
        return await planAndVisitModel.updateCustomerVisitPlan(body, args);
    },
    checkInCustomerVisit: async(body, args) => {
        return await planAndVisitModel.checkInCustomerVisit(body, args);
    },
    checkOutCustomerVisit: async(body, args) => {
        return await planAndVisitModel.checkOutCustomerVisit(body, args);
    },
    getRetailerPlanedList: async(body, args) => {
        return await planAndVisitModel.getRetailerPlanedList(body, args);
    },
    getFarmerPlanedList: async(body, args) => {
        return await planAndVisitModel.getFarmerPlanedList(body, args);
    },
    getReviewMeetingPlanedList: async(body, args) => {
        return await planAndVisitModel.getReviewMeetingPlanedList(body, args);
    },
    getFarmerMeetingPlanedList: async(body, args) => {
        return await planAndVisitModel.getFarmerMeetingPlanedList(body, args);
    },
}