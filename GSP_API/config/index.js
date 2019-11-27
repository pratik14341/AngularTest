module.exports = {
  port: 4000, 
  UsernotAuthorize: 'UsernotAuthorize', 
  UserHasNotrights: 'NoRights', 
  dbconnection: {
    user: 'postgres',
    host: '10.20.1.5',
    database: 'dbGSPAdmin',
    password: 'security',
    port: 5434,
    max: 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  }, 
  cryptoKey: '4Ssdf4FGS0958fkjdjs234ddWEsNPXCfjt960dlgvndDFJFCS', 
  cryptoalgorithm: 'aes-256-ctr',
  // Added by Rohan Dave on 31/08/2019      
  eMailer: {
    outbound: {
      enabled: true,
      name: "Do Not Reply",
      address: 'itadmin@ipathsolutions.co.in',
    },
    configuration: {
      host: 'n3plcpnl0021.prod.ams3.secureserver.net',
      //port: 465,
      //secure: true,  //true for 465 port, false for other ports
      port: 587,
      secure: false,
      auth: {
        user: 'itadmin@ipathsolutions.co.in',
        pass: '^UCZs]{6Y6J?'
      },
    }
  },
  SMS: {
    URL: 'http://sms.xpressdndsms.com/api/mt/SendSMS?user=GSPCRP&password=Gspl@1234&senderid=RIDPLS&channel=Trans&DCS=0&flashsms=0&number=91##Mobileno##&text=##Message##&route=12'
    //URL:'http://sms.indiatext.in/api/mt/SendSMS?user=GSPCRP&password=Gsp@1234&senderid=RIDPLS&channel=Trans&DCS=0&flashsms=0&number=91##Mobileno##&text=##Message##&route=32'
    //URL:'http://sms.indiatext.in/api/mt/SendSMS?user=GSPCRP&password=Gsp@1234&senderid=GSPCRP&channel=Trans&DCS=0&flashsms=0&number=91##Mobileno##&text=##Message##&route=35'
  },
  Report: {
    TempPath: `.\\temp\\`,// '\\\\ipathdc\\Docs\\pratik\\docs',//'C:\\tmp\\',
    logo: 'http://103.244.121.90:9514/src/app/images/logo.png'
  },
  setting: {
    liveWebURL: 'http://103.244.121.90:9514'
  }
  // Added by Rohan Dave on 31/08/2019    
}