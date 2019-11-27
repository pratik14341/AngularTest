//RouteName : UserKeyName
//'userrights':'noaction',
//'userrights':'dashboard~r'
//left and Right URL will be small case.
module.exports = {

    // No Action
    'userrights': 'noaction',
    'userleftmenuandrights': 'noaction',
    'usergridsavelayout': 'noaction',
    'usergridgetlayout': 'noaction',
    'usergridremovelayout': 'noaction',
    'bindcombobox/lookup': 'noaction',
    'bindcombobox/singletable': 'noaction',
    'bindcombobox/mappingtable': 'noaction',
    'bindcombobox/headquarter': 'noaction',
    'bindcombobox/subusertype': 'noaction',
    'bindcombobox/zone': 'noaction',
    'bindcombobox/subregion': 'noaction',
    'bindcombobox/depot': 'noaction',
    'bindcombobox/territory': 'noaction',
    'bindcombobox/role': 'noaction',
    'masterentry/list': 'noaction',
    'masterentry/save': 'noaction',
    'bindcombobox/state': 'noaction',
    'bindcombobox/blockreason': 'noaction',
    'splashcall': 'noaction',
    'bindcombobox/customer': 'noaction',
    'bindcombobox/salesreason': 'noaction',
    'bindcombobox/collectionreason': 'noaction',

    // SAP Service
    'sap/masterdata': 'noaction',
    // added by purvesh
    'sap/materialmaster': 'noaction',
    'sap/customermaster': 'noaction',
    'sap/territorymaster': 'noaction',
    'sap/pricelist': 'noaction',
    'sap/salesreport': 'noaction',
    'sap/collectionreport': 'noaction',
    'sap/dsoreport': 'noaction',
    'sap/legderreport': 'noaction',
    'sap/bonuspoint': 'noaction',
    'sap/inventoryreport': 'noaction',
    'sap/agingreport': 'noaction',
    'sap/marketingreport': 'noaction',
    'sap/sdoreport': 'noaction',


    // Particular Rights
    'employee/employeelist': 'employee~r',
    'userlogin/list': 'userlogin~r',
    'userlogin/entry': 'userlogin~w',
    'userlogin/getdata': 'userlogin~r',
    'userlogin/update': 'userlogin~w',
    'userlogin/resendsms': 'userlogin~w',
    'userlogin/useractiveinactive': 'userlogin~d',
    'userlogin/checkexistsvalidation': 'userlogin~w',
    'role/list': 'role~r',
    'role/save': 'role~w',

    // customer master
    'customer/list': 'customermaster~w',
    'customer/getteam': 'customermaster~w',
    'customer/getsalesreports': 'customermaster~w',
    'customer/getsalesorderinvoices': 'customermaster~w',
    'customer/getsalesorderinvoicesitem': 'customermaster~w',
    'customer/getsalesreturn': 'customermaster~w',
    'customer/getcollectionlist': 'customermaster~w',
    'customer/getcustomerlist': 'customermaster~w',
    'customer/getlocationandgspteam': 'customermaster~w',
    'customer/getcustomersaleslist': 'customermaster~w',
    'customer/getcustomersalesreturnlist': 'customermaster~w',
    'customer/getcustomercollectionlist': 'customermaster~w',
    'customer/getledgerreport': 'customermaster~w',
    'customer/getinvoicesitem': 'customermaster~w',
    'customer/getlocationlist': 'customermaster~w',
    'customer/getaginggraphdata': 'customermaster~w',

    // Order Management
    'order/list': 'customermaster~w',
    'order/saveorder': 'customermaster~w',
    'order/getorderhistory': 'customermaster~w',

    // Sales Report
    'salesreport/list': 'salesreport~r',
    'salesreturnreport/list': 'salesreturn~r',
    'collectionreport/list': 'collectionreport~r',
    'inventoryreport/list': 'inventoryreport~r',
    'averagedsoreport/list': 'averagedso~r',

    'subregion/list': 'subregion~r',
    'subregion/entry': 'subregion~w',

    // Plan and Visit
    'planandvisit/list': 'customermaster~w',
    'planandvisit/savecustomervisitplan': 'customermaster~w',
    'planandvisit/updatecustomervisitplan': '',
    'planandvisit/checkincustomervisit': '',
    'planandvisit/checkoutcustomervisit': '',
    'planandvisit/retailerplanedlist': '',
    'planandvisit/farmerplanedlist': '',
    'planandvisit/reviewmeetingplanedlist': '',
    'planandvisit/farmermeetingplanedlist': ''

}