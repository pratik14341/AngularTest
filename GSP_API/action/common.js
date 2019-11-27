const commonModel = require('../model/common');

module.exports = {
    getMappingSelectionList:async (table, value, text, mapId, mappingTable, mappingTableId, where = "", orderBy = "") => {
        return await commonModel.getMappingSelectionList(table, value, text, mapId, mappingTable, mappingTableId, where, orderBy);
    },
    getSelectionList: async(table, value, text, where = "", orderBy = "") => {
        return await commonModel.getSelectionList(table, value, text, where, orderBy);
    },
    getSubRegionList: async(args) => {
        return await commonModel.getSubRegionList(args);
    },
    getDepotList: async(args) => {
        return await commonModel.getDepotList(args);
    },
    getTerritoryList: async(args) => {
        return await commonModel.getTerritoryList(args);
    },
    getStateList: async(args) => {
        return await commonModel.getStateList(args);
    },
    getZoneList: async(args) => {
        return await commonModel.getZoneList(args);
    },
    getCustomerList: async(args) => {
        return await commonModel.getCustomerList(args);
    }
}