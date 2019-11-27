function logErrorInFile(error, functionName, storeProc, params) {    
    fs = require('fs');
    let dt =new Date();
    let filepath = `.\\Logfile\\`;
    if (!fs.existsSync(filepath)){
        fs.mkdirSync(filepath);
    }

    filepath = filepath + dt.getDate() + `-` + (dt.getMonth()+1) + `-` +dt.getFullYear() +`.txt`;
    let errortext = '\n\n==========================' + dt + '==========================\nError Message:= ' + (error.message== undefined?error:error.message) + '\nError Desc:= ' + 
        "message " + (error.stack== undefined?error:error.stack) + "\n" +
        "code "+ (error.code== undefined?"":error.code) + "\n" + JSON.stringify({ All: error}) +
        (storeProc == undefined ?"" : "\nStore Proc := " + storeProc) +
    (functionName == undefined ?"" :  "\nFunction name := " + functionName) +
        (params == undefined ?"" :"\nPara := " + JSON.stringify(params));
    
    fs.appendFile(filepath, errortext+ "\n",  function(err) {});
}

function insertErrorInDb(args) {    
    try {
        ErrorPara = require('../config/Para')();
        const errordb = require('../db');

        ErrorPara.clear();
        ErrorPara.push("errordesc", args.errorDesc);
        ErrorPara.push("errormsg", args.errorMsg);
        ErrorPara.push("spname", args.spName);
        ErrorPara.push("functionname", args.functionName);
        ErrorPara.push("arguments", args.params);        
        errordb.execute('usp_errorlogcrud', ErrorPara.values());
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    logErrorInFile : logErrorInFile,
    logInformationInFile : (information, functionName, storeProc, params) => {
        fs = require('fs');
        let dt =new Date();
        let filepath = `..\\Logfile\\`;
        if (!fs.existsSync(filepath)){
            fs.mkdirSync(filepath);
        }

        filepath = filepath + dt.getDate() + `-` + (dt.getMonth()+1) + `-` +dt.getFullYear() +`.txt`;
        let errortext = '\n\n==========================' + dt + '==========================\nInfo:= ' +information +
            (storeProc == undefined ?"" : "\nStore Proc := " + storeProc) +
            (functionName == undefined ?"" : "\nFunction name := " + functionName) +
            (params == undefined ?"" : "\nPara := " + JSON.stringify(params));
        
        fs.appendFile(filepath, errortext+ "\n",  function(err) {});
    },
    logError: async (error, functionName, storeProc, params) => {
        try {
            const errorMessage = JSON.stringify({
                message: error.stack,
                code: error.code,
                All: error
            }).replace(/\\n/g, " ").replace(/\\r/g, " ").replace(/\\t/g, " ");
            let args = {
                errorDesc: errorMessage,
                errorMsg: error.message,
                spName: storeProc,
                functionName: functionName,
                params: JSON.stringify(params),
            };
            insertErrorInDb(args);
            logErrorInFile(error, functionName, storeProc, params);
            /*
            //ErrorPara = require('../config/Para')();
            //const errordb = require('../db');

            ErrorPara.clear();
            ErrorPara.push("errordesc", errorMessage);
            ErrorPara.push("errormsg", error.message);
            ErrorPara.push("spname", storeProc);
            ErrorPara.push("functionname", functionName);
            ErrorPara.push("arguments", JSON.stringify(params));                      
            errordb.execute('usp_errorlogcrud', ErrorPara.values());
            */            
        } catch (e) {
            console.log(e);
        }
        return "";     
    },
    logErrorFromService: async (error, functionName, storeProc, params) => {
        try {
            /*
            ErrorPara = require('../config/Para')();
            const errordb = require('../db');

            console.log(error);
            ErrorPara.clear();
            ErrorPara.push("errordesc", error == undefined?"":error);
            ErrorPara.push("errormsg", error == undefined?"":error);
            ErrorPara.push("spname", storeProc == undefined?"":storeProc);
            ErrorPara.push("functionname", functionName == undefined?"":functionName);
            ErrorPara.push("arguments", JSON.stringify(params == undefined?"":params));
            
            errordb.execute('usp_errorlogcrud', ErrorPara.values());
            */
            let args = {
                errorDesc: JSON.stringify(error == undefined ? "" : error),
                errorMsg: JSON.stringify(error == undefined ? "" : error),
                spName: (storeProc == undefined ? "" : storeProc),
                functionName: (functionName == undefined ? "" : functionName),
                params: JSON.stringify(params == undefined ? "" : params),
            };
            insertErrorInDb(args);
            logErrorInFile(error,functionName,storeProc,params);
        } catch (e) {
            console.log(e);
        }
        return "";
    },
};