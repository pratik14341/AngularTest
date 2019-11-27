const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');
const Para = require('../config/Para')();
const RoutesRights = require('../config/routeRights');
const crypto = require('../_helpers/criptoHelper')();
const allFunction = require('../_helpers/AllFunction')();
const errorlog = require('../_helpers/errorlog');
const _ = require('lodash');
const fs = require('fs');
const userSettingAction = require('../action/userSetting');

module.exports =  {
    // singleError : (error) => {
    //     if (error instanceof Error) {
    //         console.log(error);
    //         return { message: 'Internal server error occurred' };
    //     }
    //     if (!(error.message && error.param)) {
    //         console.log(error);
    //         return { message: 'Unknown server error occurred' };
    //     }
    //     return error;
    // },
    // errorBuilder : (t) => {
    //    let errors =[];
    //     if (_.isArray(errors)) {
    //         const errorArray = [];
    //         for (const err of errors) {
    //             errorArray.push(this.singleError(err));
    //         }
    //         console.log("Check Error message 2=> "+errorArray)
    //         return errorArray;
    //     }
    //     return [this.singleError(errors)];
    // },
    wrape : async(req, next, middleware) => {
        try {
            req.body ={
                iserror: false,
                errormessage: "",
                data: await middleware()
            }
            //this.headerSet(req);
        } catch (err) {
            errorlog.logError(err, "executefunction", "", "");
            console.log(err);
            req.body = {
                iserror: true,
                errormessage: "Internal server error occurred",
            }
           // req.status = 400;
            //this.headerSet(req);
           // return;
        }
        next && (await next());
    },
    bearerMiddleware : async(ctx, next) => {
        if (ctx.method == 'POST') {
            let flg = true;
            let authFlg = true;
            let useri = -1;   
            if (ctx.url != '/userlogin' && ctx.url != '/logout' && ctx.url != '/errorslog' && ctx.url != '/forgotSendOTP' && ctx.url != '/forgotCheckOTP' && ctx.url !='/forgotChangePassword') {  //&& !ctx.url.startsWith('/sap/')
                try {
                   // if (ctx.header.authority) {
                        jwt.verify(ctx.header.authority, fs.readFileSync('./config/rsa-public-key.pem'));
                        flg = true;
                    //}
                    if (flg && (ctx.header.i == undefined || ctx.header.i == '')) {
                        flg = false;
                    } else { 
                        useri = crypto.decrypt(ctx.header.i);
                        if (useri == undefined || useri == null) {
                            flg = false;
                        }
                        if (flg && ctx.header.ut) {
                            Para.clear();
                            Para.push("userid", useri, 'int');
                            Para.push("token", ctx.header.ut);
                            Para.push("flagmobile", (ctx.header.im == undefined || ctx.header.im == 0 ? 0 :1 )); //0 for  Web 1 for Mobile calling
    
                            const result = await db.execute('usp_checklogintoken', Para.values());
                            if (result.result == 0) {
                                flg = false;
                            }
                        }
                    }
                } catch (err) {
                    console.log(`Error =` + err);
                    flg = false;
                }
                if (flg) {
                    let userRights = {};
                    let rightsName = '';
                    authFlg = false;
                    if (fs.existsSync(`./userRights/${useri}.txt`)) {
                        userRights = JSON.parse(String(fs.readFileSync(`./userRights/${useri}.txt`)));
    
                    } else {
                        let decuserId = crypto.decrypt(ctx.header.i);
                        userRights = JSON.parse(await userSettingAction.getUserRights(decuserId));
                    }
                    rightsName = (RoutesRights[ctx.url.substring(1).toLowerCase()] || '').toLowerCase();
                    if (rightsName == 'noaction') {
                        authFlg = true;
                    } else {
                        if (rightsName) {
                            if (userRights[rightsName.split('~')[0]]) {
                                if (userRights[rightsName.split('~')[0]][rightsName.split('~')[1]] == 1) {
                                    authFlg = true;
                                }
                            }
                        }
                    }
                }
            }
            //SAP Calling Start Check USer Login Info
            // if (ctx.url.startsWith('/sap/')) {
            // //    console.log(ctx.header.i);
            // //    console.log(ctx.header.ut);
               
               
            //     if (ctx.header.i == undefined || ctx.header.i == '' || ctx.header.ut == undefined || ctx.header.ut == '') {
            //         flg = false;
            //     }
            //     // console.log( 'Flag ' + flg);
            //     if (flg) {
            //         Para.clear();
            //         Para.push("userid", ctx.header.i, 'int');
            //         Para.push("token", ctx.header.ut);
    
            //         const result = await db.executefunction('usp_checklogintoken', Para.values());
            //       //  console.log(Para.values());
                    
            //         if (result.result == 0) {
            //             flg = false;
            //         }
            //     }
            // }
            //  console.log( 'Flag ' + flg);
            //  console.log( 'authFlg ' + authFlg);
            if (flg && authFlg){
                await next();
            }
            else {
                if (!flg)
                    ctx.body = {
                        iserror: true,
                        errormessage: config.UsernotAuthorize,
                    };
                if (!authFlg)
                    ctx.body = {
                        iserror: true,
                        errormessage: config.UserHasNotrights,
                    };
            }
        }
    }
}

