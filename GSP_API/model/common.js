const Para = require('../config/Para')();
const db = require('../db');

module.exports = {
    getMappingSelectionList: async (table, value, text, mapId, mappingTable, mappingTableId, where = "", orderBy = "") => {
        try {
            Para.clear();
            Para.add("table", table);
            Para.add("value", value);
            Para.add("text", text);
            Para.add("mapid", mapId);
            Para.add("mappingtable", mappingTable);
            Para.add("mappingtableid", mappingTableId);
            if (typeof where != 'undefined' && where && where != "") {
                Para.add("where", where);
            }
            if (typeof orderBy != 'undefined' && orderBy && orderBy != "") {
                Para.add("orderby", orderBy);
            }
            return await db.execute("usp_getmappingselectionlist", Para.values(), true);
        }
        catch (ex) {
            if (ex.InnerException != null)
                innerException = ex.InnerException.Message;
            throw ex;
        }
    },
    getSelectionList: async(table, value, text, where = "", orderBy = "") => {
        Para.clear();
        // Para.add("mode", 1, 'int');
        Para.add("table", table);
        Para.add("value", value);
        Para.add("text", text);
        Para.add("where", where);
        Para.add("orderby", orderBy);
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getSelectionListInSp: async (spName, para) => {
        return await db.execute(spName, para, true);
    },
    getSubRegionList: async(args) => {
        Para.clear();
        Para.add("mode", 4, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getDepotList: async(args) => {
        Para.clear();
        Para.add("mode", 5, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getTerritoryList: async(args) => {
        Para.clear();
        Para.add("mode", 6, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getStateList: async(args) => {
        Para.clear();
        Para.add("mode", 7, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getZoneList: async(args) => {
        Para.clear();
        Para.add("mode", 8, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    },
    getCustomerList: async(args) => {
        Para.clear();
        Para.add("mode", 9, 'int');
        Para.add("userid", args.userId, 'int');
        return await db.execute("usp_getdropdownlist", Para.values(), true);
    }
}