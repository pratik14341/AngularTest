// Added by Rohan Dave on 21/09/2019(report stuff)

const wkhtmltopdf = require('wkhtmltopdf');
const config = require('../config');
//wkhtmltopdf.command = 'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe';
//const headerhtml = require('../reports/headerhtml');

module.exports = {  
  renderToFileSync: function(html, fileName) {    
    return new Promise((resolve, reject) => {
      wkhtmltopdf(
        html,
        {
          pageSize: 'A4',
          B: '5mm',
          L: '10mm',
          R: '10mm',
          T: '5mm',
          output: fileName,
          zoom: 1.22, //config.wkhtmltopdf.zoom,
          printMediaType: true,
          "footerRight": "Page [page] of [topage]",
          //"header-html": "C:\\Pratik\\SVN\\GSP Admin\\GSP_API\\reports\\header.html",
        },
        (error, result) => {
          resolve(result);
        }
      );
    });
  },
};
