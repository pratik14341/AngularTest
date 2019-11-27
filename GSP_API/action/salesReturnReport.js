const salesReturnReportModel = require('../model/salesReturnReport');
module.exports = {
    getSalesReturnReportList: async(body, args) => {
        return await salesReturnReportModel.getSalesReturnReportList(body, args);
    }
}