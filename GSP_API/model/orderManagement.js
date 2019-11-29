const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const db = require('../db');
const _ = require('lodash');
const config = require('../config');

module.exports = {
    getOrderList : async(body) => {
        let reqParam = body;
        //let defaultfile = "\\\\10.20.1.5\\Project\\Nucleus Documents\\Nucleus Tony Data Step\\2019\\Pratik\\GSP Doc\\Product Image\\Default.png"
        let liveurl = config.setting.liveWebURL;
        Para.clear();
        Para.push("mode", '1', 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        let result = await db.execute('usp_tblordermaster', Para.values(), true);
        let data = _(result)
            .groupBy(x => x.pn)
            .map((value, key) => ({key: key, im: value[0].im, ptn: value[0].ptn, list: _.orderBy(value, ['grm'],['desc'])}))
            .value();
        
        _.each(data, async function (value, key) {
            value.im = liveurl+'/src/app/images/productImage/'+value.im//await allFunction.ConvertImageToBase64(value.im,defaultfile);
          });
        return data;
    },
    saveOrder :  async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '2', 'int');
        Para.push("json", JSON.stringify(reqParam.orderData));
        Para.push("json2", JSON.stringify(reqParam.orderItemDetail));
        Para.push("userid", args.userId, 'int');
        return await db.execute('usp_tblordermaster', Para.values());
    },
    getOrderHistory :  async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '3', 'int');
        Para.push("userid", args.userId, 'int');
        let result =  await db.execute('usp_tblordermaster', Para.values(), true);
        let data = _(result)
        .groupBy(x => x.ordermasterid)
        .map((value, key) => (
            {
                ordermasterid: key, 
                customername:value[0].customername, 
                grandtotal: value[0].grandtotal, 
                cashdiscount: value[0].cashdiscount, 
                createddate: value[0].createddate, 
                status: value[0].status, 
                isapproved: value[0].isapproved, 
                list: value.map((item, key) => (
                    {
                        materialname: item.materialname,
                        dimension: item.dimension,
                        quantity: item.quantity
                    }
                ))
            }
            )
            ).orderBy('ordermasterid', 'desc').value();
        return data;
    },
    getOrderApprovalList :  async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '5', 'int');
        Para.push("userid", args.userId, 'int');
        let result =  await db.execute('usp_tblordermaster', Para.values(), true);
        let data = _(result)
        .groupBy(x => x.ordermasterid)
        .map((value, key) => (
            {
                ordermasterid: key, 
                customername:value[0].customername, 
                grandtotal: value[0].grandtotal, 
                cashdiscount: value[0].cashdiscount, 
                createddate: value[0].createddate, 
                status: value[0].status, 
                isapproved: value[0].isapproved, 
                list: value.map((item, key) => (
                    {
                        materialname: item.materialname,
                        dimension: item.dimension,
                        quantity: item.quantity
                    }
                ))
            }
            )
            ).orderBy('ordermasterid', 'desc').value();
        return data;
    },
    saveOrderApproval :  async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '6', 'int');
        Para.push("status", reqParam.status);
        Para.push("ordermasterid", reqParam.ordermasterid, 'int');
        Para.push("userid", args.userId, 'int');
        return await db.execute('usp_tblordermaster', Para.values());
    }
}