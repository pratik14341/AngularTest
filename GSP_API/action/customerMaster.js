const customerMasterModel = require('../model/customerMaster');

module.exports = {
    getCustomerListForMobile: async(userId) => {
        return await customerMasterModel.getCustomerListForMobile(userId);
    },
    getTeamForMobile: async(body, args) => {
        return await customerMasterModel.getTeamForMobile(body, args);
    },
    getLocationList: async(body, args) => {
        return await customerMasterModel.getLocationList(body, args);
    },
    getSalesReportsForMobile: async(body, args) => {
        return await customerMasterModel.getSalesReportsForMobile(body,args);
    },
    getSalesOrderInvoicesListForMobile: async(body, args) => {
        return await customerMasterModel.getSalesOrderInvoicesListForMobile(body, args);
    },
    getSalesOrderInvoicesItemListForMobile: async(body, args) => {
        return await customerMasterModel.getSalesOrderInvoicesItemListForMobile(body, args);
    },
    getSalesReturnListForMobile: async(body, args) => {
        return await customerMasterModel.getSalesReturnListForMobile(body, args);
    },
    getCollectionListForMobile: async(body, args) => {
        return await customerMasterModel.getCollectionListForMobile(body, args);
    },
    getCustomerListForWeb: async(body, args) => {
        return await customerMasterModel.getCustomerListForWeb(body,args);
    },
    getLocationAndTeamForWeb: async(body, args) => {
        return await customerMasterModel.getLocationAndTeamForWeb(body, args);
    },
    getCustomerSalesListForWeb: async(body, args) => {
        return await customerMasterModel.getCustomerSalesListForWeb(body, args);
    },
    getCustomerSalesReturnListForWeb: async(body, args) => {
        return await customerMasterModel.getCustomerSalesReturnListForWeb(body,args);
    },
    getCustomerCollectionListForWeb: async(body, args) => {
        return await customerMasterModel.getCustomerCollectionListForWeb(body, args);
    },
    getSalesOrderInvoicesItemListForWeb: async(body, args) => {
        return await customerMasterModel.getSalesOrderInvoicesItemListForWeb(body, args);
    },
    getLedgerReport: async(body, args) => {
        return await customerMasterModel.getLedgerReport(body, args);
    },
    getAgingGraphData: async(body, args) => {
        return await customerMasterModel.getAgingGraphData(body, args);
    }

}