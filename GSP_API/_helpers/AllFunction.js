module.exports = function () {
    const db = require('../db');
    const Para = require('../config/Para')();
    const fs = require("fs");
    const config = require('../config');
    //Added by Rohan Dave on 21/09/2019(report stuff)
    const _str = require('underscore.string');
    const koaPug = require('koa-pug');
    const pug = new koaPug({
        viewPath: './reports',
        basedir: './reports',
    });
    const pdfHelper = require('../_helpers/pdfHelper');
    //Added by Rohan Dave on 21/09/2019(report stuff)

    return {
        coalesce(args) {
            var len = arguments.length;
            for (var i = 0; i < len; i++) {
                if (arguments[i] !== null && arguments[i] !== undefined) {
                    return arguments[i];
                }
            }
            return null;
        },
        isNullOrEmpty(str) {
            if (typeof str != 'undefined' && str && str != "") {
                console.log("false");
                return false;
            }
            return true;
        },
        toGridOrder(orders, tableArray, defaultOrder = "1 desc") {
            if (orders != undefined) {
                defaultOrder = orders.filter(x => x.dir != undefined).reduce((prev, current) => prev + (prev != '' ? ', ' : '') +
                    (this.coalesce(tableArray[current.field.toLowerCase()], current.field.toLowerCase()) + ' ' + current.dir), '') || "1 desc";
            }
            return defaultOrder;
        },
        toGridFilter(filters, tableArray) {
            let strFilter = " ";
            if (filters != undefined)
                strFilter = this.toFilterDescriptor(filters.filters, filters.logic, tableArray, strFilter);

            if (strFilter == " ") {
                strFilter = " 1 = 1 ";
            } else {
                strFilter = strFilter.replace(/\( and/gi, "(");
                strFilter = strFilter.replace(/\( or/gi, "(");
            }
            return strFilter;
        },
        toFilterDescriptor(filters, operators, tableArray, strFilter = " 1 = 1 ") {
            if (filters != undefined && filters) {
                if (filters.length > 0) strFilter += " (";
                let i = 0;
                for (i = 0; i < filters.length; i++) {

                    if (filters[i].filters == undefined) {
                        strFilter = `${strFilter} ${this.toFilterLower(filters[i].operator, this.coalesce(tableArray[filters[i].field.toLowerCase()], filters[i].field.toLowerCase()))} ${this.toOperatorDependValue(filters[i].operator, filters[i].value)}`;
                    } else {
                        strFilter = `${strFilter} ${this.toFilterDescriptor(filters[i].filters, filters[i].logic, tableArray, "")}`;
                    }
                    if ((i + 1) < filters.length) {
                        strFilter = `${strFilter} ${operators} `;
                    }
                }
                if (filters.length > 0) strFilter += " )";
            }
            return strFilter;
        },
        toFilterLower(_operator, value) {
            switch (_operator) {
                case 'contains':
                    return ` lower(${value})`;
                case 'doesnotcontain':
                    return ` lower(${value})`;
                case 'startswith':
                    return ` lower(${value})`;
                case 'endswith':
                    return ` lower(${value})`;
            }
            return value;
        },
        toOperatorDependValue(_operator, value) {
            if (value && value.toString().indexOf("00.000Z") !== -1 && value.toString().indexOf("T") !== -1) {
                try {
                    value = require('dateformat')(new Date(value).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }), 'dd/mm/yyyy');
                } catch (e) { }
            }
            switch (_operator) {
                case 'eq':
                    return ` = '${value}'`;
                case 'neq':
                    return ` !=  '${value}'`;
                case 'gte':
                    return ` >=  '${value}'`;
                case 'gt':
                    return ` >  '${value}'`;
                case 'lte':
                    return ` <=  '${value}'`;
                case 'lt':
                    return ` <  '${value}'`;
                case 'contains':
                    return ` like  '%${value.toLowerCase()}%'`;
                case 'doesnotcontain':
                    return ` Not like  '%${value.toLowerCase()}%'`;
                case 'startswith':
                    return ` like  '${value.toLowerCase()}%'`;
                case 'endswith':
                    return ` like  '%${value.toLowerCase()}'`;
                case 'isnull':
                    return ` is null `;

                default: return ` like  '%${value.toString().toLowerCase()}%`;
            }
        },
        loadGrid(spName, reqParam, filters, orders, otherFilter = undefined, defaultOrder = undefined) {
            return this.loadLocalGrid(spName,
                reqParam.skip,
                reqParam.take,
                this.toGridOrder(reqParam.sort, orders, defaultOrder),
                this.toGridFilter(reqParam.filter, filters),
                otherFilter);
        },
        loadLocalGrid: async (spName, skip, pgCount, orderBy, filters, otherFilter = undefined) => {
            Para.clear();
            Para.push("skip", skip);
            Para.push("pagecount", pgCount);
            Para.push("orderby", orderBy);
            Para.push("otherfilter", filters);

            if (otherFilter != undefined) Para.append(otherFilter);
            const result = await db.execute(spName, Para.values(), true);
            if (result == null) {
                return { count: 0, data: [] };
            } else { return { count: result[0].counts || result.length, data: result }; }

        },
        convertImageToBase64: async (filepath, defaultfilepath) => {
            let data = "";
            if (!fs.existsSync(filepath)) {
                if (fs.existsSync(defaultfilepath)) {
                    data = await fs.readFileSync(defaultfilepath).toString('base64');
                }
            } else {
                data = await fs.readFileSync(filepath).toString('base64');
            }
            return data
        },
        //Added by Rohan Dave on 21/09/2019(report stuff)
        convertReportToBase64: async (reportName, options, fileName) => {
            try {
                options.logo = config.Report.logo;
                const path = `${config.Report.TempPath}\\${fileName}.pdf`;
                options._str = _str;
                const reportHtml = await pug.render(reportName, options, {}, true);
                //console.log(reportHtml)
                await pdfHelper.renderToFileSync(reportHtml, path);
                const resultString = fs.readFileSync(path).toString('base64');
                fs.unlinkSync(path); //once read remove file for storage save etc
                return resultString;
            }
            catch (error) {
                throw error;
            }
        },
        //Added by Rohan Dave on 21/09/2019(report stuff)
    };
};