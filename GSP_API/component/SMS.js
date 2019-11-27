// Added by Pratik on 11/09/2019
const config = require('../config');
const http = require('http');
module.exports = {
    // use this if you need to wait for response of Send SMS
    sendSMSSync: async(username,Message) => {
        let bResult = false;        
        try {
            let SMSAPI = config.SMS.URL.replace('##Mobileno##',username).replace('##Message##',Message);
            const hashedPassword = await new Promise((resolve, reject) => {
               http.get(SMSAPI, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    resp.on('end', () => {
                        console.log(data)
                        if (data) {
                            if(JSON.parse(data).ErrorCode == "000")
                            {
                                resolve(true);
                            } else{
                                resolve(false);    
                            }
                        } else  {
                            resolve(false);
                        }
                    });
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                   reject(false);
                });
              });
              return hashedPassword;
        }
        catch(exception) {    
          //  console.log(exception)        
            bResult = false;
        }
        return bResult;
    }, 
    sendSMSAsync: async(username,Message) => {                     
        let bResult = false;        
        try {
            let SMSAPI = config.SMS.URL.replace('##Mobileno##',username).replace('##Message##',Message);
            
               http.get(SMSAPI, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    resp.on('end', () => {
                    });
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
                bResult = true
        }
        catch(exception) {    
          //  console.log(exception)        
            bResult = false;
        }
        return bResult;
    },

};