const averageDsoReportModel = require('../model/averageDsoReport');

module.exports = {
    getAverageDsoReportList: async(body,args) => {
        return await averageDsoReportModel.getAverageDsoReportList(body, args);
    }
}