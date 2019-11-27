const productMasterReportModel = require('../model/productMasterReport');

module.exports = {
    getProductMasterReportList: async(body,args) => {
        return await productMasterReportModel.getProductMasterReportList(body, args);
    }
}