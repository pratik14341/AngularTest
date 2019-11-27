const { Pool } = require('pg');
const config = require('../config');
const errorlog = require('../_helpers/errorlog');


module.exports = {
  query: async (text, params) => {
    const pool = new Pool(config.dbconnection);
    var result = await pool.query(text, params);
    await pool.end();
    return result;
  },
  execute: async (storeProc, params, returnArray) => {
    try {

      if (returnArray == undefined) returnArray = false;
      let queryString = `select  ${storeProc}(`;
      let paramVal = '';
      if (params != undefined, params != '') {

        params.forEach(element => {
          paramVal += `p_${element.name}:=`;
          if (element.type == 'string') {
            paramVal += `'${element.value.toString().replace(/'/gi, "''")}',`;
          } else {
            paramVal += `${element.value.toString().replace(/'/gi, "''")},`;
          }
        });

        if (paramVal != undefined && paramVal.length > 0) {
          if (paramVal.charAt(paramVal.length - 1) == ',') {
            paramVal = paramVal.substr(0, paramVal.length - 1);
          }
        }
      }
      queryString += `${paramVal})`;

      const pool = new Pool(config.dbconnection);
      var result = await pool.query(queryString);
      pool.end(() => {})
      if (!returnArray) {
        if (result.rows[0][storeProc] == null) return (result.rows[0][storeProc]);
        else return (result.rows[0][storeProc])[0];
      } else {
        return result.rows[0][storeProc];
      }

    } catch (error) {
      if (storeProc != "usp_errorlogcrud") {
        errorlog.logError(error, "execute", storeProc, params);

      }
      throw error;
      //return { error: error.message };
    }
  },
  executeNonQuery: async (storeProc, params) => {
    try {

      let queryString = `select  ${storeProc}(`;
      let paramVal = '';
      if (params != undefined, params != '') {

        params.forEach(element => {
          paramVal += `p_${element.name}:=`;
          if (element.type == 'string') {
            paramVal += `'${element.value}',`;
          } else {
            paramVal += `${element.value},`;
          }
        });

        if (paramVal != undefined && paramVal.length > 0) {
          if (paramVal.charAt(paramVal.length - 1) == ',') {
            paramVal = paramVal.substr(0, paramVal.length - 1);
          }
        }
      }
      queryString += `${paramVal})`;

      const pool = new Pool(config.dbconnection);
      var result = await pool.query(queryString);
      await pool.end();
      return result.rows;


    } catch (error) {
      if (storeProc != "usp_errorlogcrud") {
        errorlog.logError(error, "executeNonQuery", storeProc, params);

      }
      throw error;
      //return { error: error.message };
    }
  },
};
//   module.exports = {
//     query: (text, params) => pool.query(text, params)
//   }

//   module.exports = {
//     query: (text, params, callback) => {
//       const start = Date.now()
//       return pool.query(text, params, (err, res) => {
//         const duration = Date.now() - start
//      //   console.log('executed query', { text, duration, rows: res.rowCount })
//         callback(err, res)
//       })
//     },
//     getClient: (callback) => {
//       pool.connect((err, client, done) => {
//         callback(err, client, done)
//       })
//     }
//   }


//module.exports = {
// query: async (text, params) => {
//     const pool = new Pool(config.dbconnection);
//     var result = await pool.query(text, params)
//     await pool.end()
//     return result;
// }
//   }