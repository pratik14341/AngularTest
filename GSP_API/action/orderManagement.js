const orderManagementModel = require('../model/orderManagement');

module.exports = {
    getOrderList : async(body) => {
        return await orderManagementModel.getOrderList(body);
    },
    saveOrder :  async(body, args) => {
        return await orderManagementModel.saveOrder(body, args);
    },
    getOrderHistory :  async(body, args) => {
        return await orderManagementModel.getOrderHistory(body, args);
    },
    getOrderApprovalList :  async(body, args) => {
        return await orderManagementModel.getOrderApprovalList(body, args);
    },
    saveOrderApproval :  async(body, args) => {
        return await orderManagementModel.saveOrderApproval(body, args);
    }
}