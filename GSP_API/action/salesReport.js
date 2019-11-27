const salesReportModel = require('../model/salesReport');

module.exports = {
    getSalesReportList: async(body,args) => {
        return await salesReportModel.getSalesReportList(body, args);
    }
}