// Added by Rohan Dave on 31/08/2019
const config = require('../config');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const mailClient = nodeMailer.createTransport(config.eMailer.configuration);

// this will check file exisit or not if exist then only attach
async function checkAttachmentFileExists(path) {
    let bExists = false;
    return new Promise((resolve, reject) => {
        fs.access(path,fs.F_OK,(error) => { 
            if (error) {
               resolve(bExists); 
            }
            else {
                bExists = true;
                resolve(bExists);
            }
        });        
    }); 
}

// this is the main function to make any mail related thing like formAddress, replyTo, attachment related 
async function prepareMailForSend(params) {    
    let emailOptions = {};
    let tempFilePath = '';
    let fileName = '';
    let bFileExists = true;
    emailOptions = { ...params };
    emailOptions.from = {
        name: config.eMailer.outbound.name,
        address: config.eMailer.outbound.address,
    };    
    emailOptions.attachments = [];
    if (!emailOptions.replyTo || emailOptions.replyTo === '') {
        emailOptions.replyTo = config.eMailer.outbound.address;
    }
    if (params && params.attachments && params.attachments.length > 0) {        
        for (var i = 0; i < params.attachments.length; i++) {
            if (params.attachments[i].path && params.attachments[i].path !== '') {
                tempFilePath = params.attachments[i].path;                
                if (path.isAbsolute(tempFilePath)) {
                    bFileExists = await checkAttachmentFileExists(tempFilePath);
                }
                else { // https://www.jquery-az.com/wp-content/uploads/2015/10/logo.jpg if path like this
                    bFileExists = true;
                }                                
                fileName = path.basename(tempFilePath);
                if (bFileExists) {
                    emailOptions.attachments.push({ filename: fileName, path: tempFilePath });
                }
            }
        }    
    }
    
    return emailOptions;
}

module.exports = {
    // use this if you need to wait for response of mailsend
    sendEmailSync: async(params) => {
        let bResult = false;        
        try {
            params = await prepareMailForSend(params);
            const result = await mailClient.sendMail(params);
            if (result && result.messageId) {
                bResult = true;
            }
            else {
                bResult = false;
            }
        }
        catch(exception) {            
            bResult = false;
        }
        return bResult;
    }, 

    //use this if you don't need to wait for response. just call and send
    sendEmailAsync: async(params) => {                     
        params = await prepareMailForSend(params);        
        mailClient.sendMail(params,(error, result) => {
        });
    },
};