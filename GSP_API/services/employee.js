const Router = require('koa-router');
// const db = require('../db')
 const Para = require('../config/Para')();
const allFunction = require('../_helpers/AllFunction')();

const router1 = new Router();
const filters = {
    "employeeid":'e.employeeid::character varying',
    "name": "titles.lookupvalue  || ' '  || e.firstname ||' ' || e.surname"
    ,"startdate": "e.startdate::date"
    ,"finishdate": "e.finishdate::date"
    ,"endofprobation": "e.endofprobation::date"

}
router1.post('/employee/employeelist', async (req, res) => {
 
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(reqParam || json);

   // console.log(allFunction.ToGridFilter(reqParam.filter,filters));
   // console.log(allFunction.ToGridOrder(reqParam.sort,filters));

   Para.clear();
   Para.add("mode","1", "int")

   req.body = await allFunction.loadGrid("usp_employeeinfo",reqParam,filters,filters,Para.values());
//    req.body =  await allFunction.loadGrid("usp_employeeinfo",reqParam.skip, reqParam.take,
//                     allFunction.ToGridOrder(reqParam.sort,filters),
//                     allFunction.ToGridFilter(reqParam.filter,filters));

   
    // let product = require('../temp/product') // eval(String( require('fs').readFileSync('./temp/product.js')));
    // let data = product.slice(reqParam.skip, (reqParam.skip + reqParam.take))
    // req.body = {
    //     count: product.length,
    //     data: data
    // };

});

module.exports = router1;