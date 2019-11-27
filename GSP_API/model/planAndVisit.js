const para = require('../config/Para')();
const db = require('../db');
const _ = require('lodash');

module.exports = {
    getCustomerPlanedList: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 3 , "int");
        para.add("userid", args.userId, "int");
        let result =   await db.execute("usp_planandvisitcrud", para.values(), true);
        let data = _(result)
        .groupBy(x => x.visitdate)
        .map((value, key) => (
            {
                visitdate: key, 
                list: value.map((item, key) => (
                    {
                        customervisitplanid: item.customervisitplanid,
                        customername: item.customername,
                        customercode: item.customercode,
                        city: item.city1,
                    }
                ))
            }
            )
            ).value();
        return data;
    },
    saveCustomerVisitPlan: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 1, "int");
        para.add("json", JSON.stringify(reqPara.customerVisitPlan))
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    updateCustomerVisitPlan: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 2, "int");
        para.add("json", JSON.stringify(reqPara.customerVisitPlan))
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    checkInCustomerVisit: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 4, "int");
        para.add("json", JSON.stringify(reqPara.customerVisitPlan))
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },  
    checkOutCustomerVisit: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 5, "int");
        para.add("json", JSON.stringify(reqPara.customerVisitPlan))
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    getRetailerPlanedList: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 6, "int");
       // para.add("json", JSON.stringify(reqPara.retailerVisitPlan))
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    getFarmerPlanedList: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 7, "int");
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    getReviewMeetingPlanedList: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 8, "int");
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    },
    getFarmerMeetingPlanedList: async(body, args) => {
        let reqPara = body;
        para.clear();
        para.add("mode", 9, "int");
        para.add("userid", args.userId, "int");
        return await db.execute("usp_planandvisitcrud", para.values())
    }
}