const db = require('../db');
const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();
const filters = {
    "id": "cm.id"
    , "cc": "cm.customercode"
    , "ccd": "to_char(cm.customercreateddate,'dd/MM/yyyy')"
    , "ib": "CASE WHEN((gstpan::int + legalstatus::int + legaldepartment::int + creditorder::int + legalcaseother::int + balanceconfirm::int + chequereturn::int + inactivecustomer::int + specialcase::int + caseremark::int) > 0 ) then 'Yes' else 'No' end"
    , "br": "CASE WHEN(gstpan = 1::bit) then 'GST/PAN,' else '' end "
        + "|| CASE WHEN(legalstatus = 1::bit) then 'Legal Status,' else '' end "
        + "|| CASE WHEN(legaldepartment = 1::bit) then 'Legal Department,'  else '' end "
        + "|| CASE WHEN(creditorder = 1::bit) then 'Credit-Order Block,' else '' end"
        + "|| CASE WHEN(legalcaseother = 1::bit) then 'Legal Case to Other Company,'  else '' end "
        + "|| CASE WHEN(balanceconfirm = 1::bit) then 'Balance Confirmation,'  else '' end "
        + "|| CASE WHEN(chequereturn = 1::bit) then 'Cheque Return,'  else '' end "
        + "|| CASE WHEN(inactivecustomer = 1::bit) then 'Inactive Customer,'  else '' end"
        + "|| CASE WHEN(specialcase = 1::bit) then 'Special Case,'  else '' end "
        + "|| CASE WHEN(caseremark = 1::bit) then 'Sp. Case Remark,'  else '' end"
    , "cn": "cm.customername"
    , "c": "cd.city1"
    , "mn": "cd.mobileno"
    , "ccat": "cc.lookupvalue"
    , "ct": "ct.lookupvalue"
    , "cat": "category.lookupvalue"
    , "ad": "COALESCE(cd.address1||',','') ||COALESCE(address2||',','') ||COALESCE(city1||',','')||COALESCE(regiondescription)||'-'||COALESCE(postalcode)"
    , "ic": "CASE WHEN((CASE WHEN(cm.tea is not null) then 1 else 0 end + CASE WHEN(cm.mango is not null) then 1 else 0 end + CASE WHEN(cm.seeds is not null) then 1 else 0 end) > 0) then 'Yes' else 'No' end"
    , "crop": "CASE WHEN(cm.tea is not null) then 'Tea,' else '' end || CASE WHEN(cm.mango is not null) then 'Mango,' else '' end || CASE WHEN(cm.seeds is not null) then 'Seeds' else '' end"
    , "sales": "tsr.sales"
    , "sr": "tsr.salesreturn"
    , "cl": "cm.creditlimit"
    , "col": "tcr.collection"
    , "out": "tar.outstanding"
    , "averd": "tdso.averagedays"

    , "ter": "sdm.name"
    , "reg": "sr.name"
    , "st": "regiondescription"
    , "zo": "zone.zone"
    , "gmnm": "gm.srzonalname"
    , "zmnm": "zm.zonalname"
    , "rsnm": "rsm.inchargename"
    , "amnm": "am.areaname"
    , "tmnm": "tm.territoryname"
    , "senm": "se.executivename"
    , "sonm": "so.officername"
    , "srnm": "src.representativename"
    , "sdonm": "1=1"
    , "mdonm": "1=1"
};
const orders = {};
const filtersSales = {
    "invoiceno": "invoiceno",
    "invoicedate": "invoicedate",
    "paytermsdesc": "paytermsdesc",
    "qtycase": "qtycase",
    "gstamout": "gstamout",
    "invoicevalue": "invoicevalue",
};
const filtersSalesReturn = {
    "invoiceno": "invoiceno",
    "invoicedate": "invoicedate",
    "gstamout": "gstamout",
    "invoicevalue": "invoicevalue",
    "refdoc": "refdoc",
    "refdate": "refdate",
    "otherreason": "otherreason",
};
const filtersCollection = {
    "amountinlc": "amountinlc",
    "bankdatatext": "bankdatatext",
    "docdate": "to_char(docdate,'dd/MM/yyyy')",
    "referenceutrno": "referenceutrno",
};
const filtersOrderInvoicesItem = {
    "invoiceno": "invoiceno",
    "materialdescription": "mm.materialdescription",
    "qty": "sr.qty",
    "case": "sr.qtycase",
    "netvalue": "sr.finaltaxablevalue",
    "gst": "cgstamt + sgstamt + igstamt",
    "netamount": "finaltaxablevalue + cgstamt + sgstamt + igstamt",
};
module.exports = {
    getCustomerListForMobile: async (userId) => {
        Para.clear();
        Para.push("mode", '1', 'int');
        Para.push("userid", userId, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getTeamForMobile: async (body, args) => {
        try{
            let reqParam = body;
            Para.clear();
            Para.push("mode", '2', 'int');
            Para.push("userid", args.userId, 'int');
            if (reqParam.customerid > 0) Para.push("customerid", reqParam.customerid, 'int');
            return await db.execute('usp_tblcustomermaster', Para.values(), true);
        } catch (err) {
            errorlog.logError(err, "getTeamForMobile", "", "");
            throw err
        }
    },
    getLocationList: async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '15', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getSalesReportsForMobile: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '3', 'int');
        Para.push("userid", args.userId, 'int');
        if (reqParam.customerid > 0) Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getSalesOrderInvoicesListForMobile: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '4', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getSalesOrderInvoicesItemListForMobile: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '5', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("invoiceno", reqParam.invoiceno);
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getSalesReturnListForMobile: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '6', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getCollectionListForMobile: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '7', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    },
    getCustomerListForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '8', 'int');
        Para.push("userid", args.userId, 'int');
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filters, orders, Para.values(), "cc asc");
    },
    getLocationAndTeamForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '9', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values());
    },
    getCustomerSalesListForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '10', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filtersSales, orders, Para.values());
    },
    getCustomerSalesReturnListForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '11', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filtersSalesReturn, orders, Para.values());
    },
    getCustomerCollectionListForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '12', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filtersCollection, orders, Para.values());
    },
    getSalesOrderInvoicesItemListForWeb: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '14', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("invoiceno", reqParam.invoiceno);
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filtersOrderInvoicesItem, orders, Para.values());
    },
    getLedgerReport: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '13', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        let result = await db.execute('usp_tblcustomermaster', Para.values());
        return await allFunction.convertReportToBase64('ledger', { legderreport: (result.legderreport || result.legderreport.length > 0) ? result.legderreport : [], agingreport: (result.agingreport || result.agingreport.length > 0) ? result.agingreport[0] : {} }, 'ledgeReport_' + args.userId);
    },
    getAgingGraphData: async(body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '16', 'int');
        Para.push("userid", args.userId, 'int');
        Para.push("customerid", reqParam.customerid, 'int');
        return await db.execute('usp_tblcustomermaster', Para.values(), true);
    }
}
