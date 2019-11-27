const db = require('../db');
const fs = require("fs");
const leftMenu = require('../config/leftMenu');
const Para = require('../config/Para')();
let mobilemenu = require('../config/mobileleftMenu')

module.exports = {
    getUserRights: async (userId) => {
        let result = '';
        if (userId.toString() != '-1') {
            Para.clear();
            Para.push("userid", userId, 'int');
            result = await db.execute('tfn_returnuserrightstable', Para.values());
            fs.writeFile(`./userRights/${userId}.txt`, result.d, function (err) { });
        }
        if (result != '')
            return (result.d);
        else
            return '{}';
    },
    getUserLeftMenu: async (userRights) => {
        let result = '';
        let copyleftMenu = leftMenu;
        if (userRights.toString() != '' && userRights != {}) {
            let checknext = false;
            let subchecknext = false;
            let node;
            copyleftMenu.reduceRight((acc, el, index, object) => {
                checknext = false;

                if (el.r == 'noaction') {
                    checknext = true;
                } else {
                    node = userRights[el.r];
                    if (node && node.r == 1) {
                        checknext = true;
                    }
                }
                if (!checknext)
                    object.splice(index, 1);
                else {
                    if (el.c && el.c.length > 0) {
                        subchecknext = false;
                        el.c.reduceRight((sacc, sel, sindex, sobject) => {
                            subchecknext = false;
                            if (sel.r == 'noaction') {
                                subchecknext = true;
                            } else {
                                node = userRights[sel.r];
                                if (node && node.r == 1) {
                                    subchecknext = true;
                                }
                            }
                            if (!subchecknext)
                                sobject.splice(sindex, 1);

                        }, []);

                        if (!(el.c && el.c.length > 0)) {
                            object.splice(index, 1);
                        }
                    }
                }
            }, []);
        }
        return copyleftMenu;
    },
    getUserLayout: async (userId) => {
        Para.clear();
        Para.push("userid", userId, 'int');
        Para.push("mode", '4', 'int');
        return await db.execute('usp_tblgridcolumnreordercrud', Para.values());
    },
    saveUserGridLayout: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("userid", args.userId, 'int');
        Para.push("reordertype", reqParam.gridcolumns);
        Para.push("reorderpagename", reqParam.gridkey);
        return await db.execute('usp_tblgridcolumnreordercrud', Para.values());
    },
    removeUserGridLayout: async (body, args) => {
        let reqParam = body;
        Para.clear();
        Para.push("userid", args.userId, 'int');
        Para.push("mode", '2', 'int');
        Para.push("reorderpagename", reqParam.gridkey);

        return await db.execute('usp_tblgridcolumnreordercrud', Para.values());
    },
    getUserMobileRights: async (userId) => {
        let result = [];
        let obj = '';
        var mobileresult = [];
        if (userId.toString() != '-1') {
            userId = userId.toString();
            Para.clear();
            Para.push("userid", userId, 'int');
            result = await db.execute('tfn_returnuserrightsmobiletable', Para.values(), true);
            let result2 = await db.execute('tfn_returnuserrightstable', Para.values());
            fs.writeFile(`./userRights/${userId}.txt`, result2.d, function (err) { });
            mobilemenu.reduceRight((acc, mobilej, index, object) => {
                result.reduceRight((acc, leftMenuj, index, object) => {
                    if (leftMenuj.k == mobilej.k && leftMenuj.r == 1) {
                        mobileresult.push(mobilej);
                    }
                }, []);
            }, []);
        }
        mobileresult.sort((a, b) => a.mi - b.mi);
        obj = {
            result: result,
            mobileresult: mobileresult
        };
        if (result != undefined || mobileresult != undefined)
            return (obj);
        else
            return {
                result: [],
                mobileresult: []
            };
    }
}