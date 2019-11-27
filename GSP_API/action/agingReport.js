const agingReportModel = require('../model/agingReport');
module.exports = {
    getAgingReportList: async(body, args) => {
        return await agingReportModel.getAgingReportList(body, args);
    }
}