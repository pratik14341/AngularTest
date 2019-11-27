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
module.exports = {
    getAverageDsoReportList: async(body,args) => {
        let reqParam = body;
        Para.clear();
        Para.push("mode", '8', 'int');
        Para.push("userid", args.userId, 'int');
        return await allFunction.loadGrid("usp_tblcustomermaster", reqParam, filters, orders, Para.values(), "cc asc");
    }
}