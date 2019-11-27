const Router = require('koa-router');
const Para = require('../config/Para')();
const db = require('../db');
const config = require('../config');
const crypto = require('../_helpers/criptoHelper')();
const router = new Router();
const errorlog = require('../_helpers/errorlog');

router.post('/sap/masterdata', async (req, res) => {

try {
    
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '1', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("salesdistrictjson", JSON.stringify(reqParam.salesdistrict));
        Para.push("subregionjson", JSON.stringify(reqParam.subregion));
        Para.push("salesofficedepotjson", JSON.stringify(reqParam.salesofficedepot));
        Para.push("brandjson", JSON.stringify(reqParam.brand));
        Para.push("brandcategoryjson", JSON.stringify(reqParam.brandcategory));
        Para.push("regionlistjson", JSON.stringify(reqParam.regionlist));
        Para.push("zonedetailjson", JSON.stringify(reqParam.zonedetail));
        Para.push("subregionplantzonejson", JSON.stringify(reqParam.subregionplantzone));

     let results = await db.execute('usp_loadsapdata', Para.values());
     //console.log(results);
            if(results.result == 1){
                req.body = {
                    salesdistrict: reqParam.salesdistrict.length,
                    subregion: reqParam.subregion.length,
                    salesofficedepot:reqParam.salesofficedepot.length,
                    brand:reqParam.brand.length,
                    brandcategory:reqParam.brandcategory.length,
                    regionlist:reqParam.regionlist.length,
                    zonedetail:reqParam.zonedetail.length,
                    subregionplantzone:reqParam.subregionplantzone.length,
                };
            }
            else{
                req.body = results;
            }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"masterdata","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});

router.post('/sap/materialmaster', async (req, res) => {

 try {   
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '2', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("materialmasterjson", JSON.stringify(reqParam.materialmaster));
                
        let results = await db.execute('usp_loadsapdata', Para.values());
        if(results.result == 1){
         req.body ={
            materialmaster:reqParam.materialmaster.length
         };
        }
        else{
            req.body = results;
        }
    }else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"materialmaster","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});

router.post('/sap/customermaster', async (req, res) => {
    try {    
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());
    // console.log('success');

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '3', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("customermasterjson", JSON.stringify(reqParam.customermaster));                
        let results=  await db.execute('usp_loadsapdata', Para.values());
        if(results.result == 1){
        req.body ={
        customermaster:reqParam.customermaster.length
       };
    }
    else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"customermaster","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
}); 


router.post('/sap/territorymaster', async (req, res) => {
    try {    
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '4', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("territorymasterjson", JSON.stringify(reqParam.territorymaster));                
    let results =  await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){
       req.body ={
        territorymaster:reqParam.territorymaster.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"territorymaster","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});

router.post('/sap/pricelist', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '5', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("pricelistjson", JSON.stringify(reqParam.pricelist));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        pricelist:reqParam.pricelist.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"pricelist","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/salesreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '6', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.salesreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        salesreport:reqParam.salesreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"salesreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/collectionreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '7', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.collectionreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        collectionreport:reqParam.collectionreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"collectionreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/legderreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());
    
    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '8', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.legderreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        legderreport:reqParam.legderreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"legderreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/dsoreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '9', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.dsoreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        dsoreport:reqParam.dsoreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"dsoreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/bonuspoint', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '10', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.bonuspoint));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        bonuspoint:reqParam.bonuspoint.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"bonuspoint","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/inventoryreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '11', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.inventoryreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        inventoryreport:reqParam.inventoryreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"inventoryreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/agingreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    //errorlog.logerror(error,"agingreport","usp_loadsapdata",JSON.stringify(reqParam.agingreport));
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '12', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.agingreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        agingreport:reqParam.agingreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"agingreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});



router.post('/sap/marketingreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '13', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.marketingreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        marketingreport:reqParam.marketingreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"marketingreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});


router.post('/sap/sdoreport', async (req, res) => {
    try {  
    let reqParam = JSON.parse(JSON.stringify(req.request.body));
    //console.log(JSON.stringify(req.request.body));
    //  console.log(reqParam.id.toString());

    let huserid = crypto.decrypt(req.request.header.i.toString());
    let userid = reqParam.id;
    //console.log(reqParam.id.toString());
    if (huserid == userid) {
        Para.clear();
        Para.push("mode", '14', 'int');
        Para.push("loggedby", userid, 'int');
        Para.push("commonjson", JSON.stringify(reqParam.sdoreport));                
    let results = await db.execute('usp_loadsapdata', Para.values());
    if(results.result == 1){    
       req.body ={
        sdoreport:reqParam.sdoreport.length
       };
    } else{
        req.body = results;
    }
    } else {
        req.body = {
            'authorize': config.UsernotAuthorize
        };
    }
} catch (error) {
    errorlog.logError(error,"sdoreport","usp_loadsapdata",JSON.stringify(req.request.body));
    req.body = error;
}
});

module.exports = router;