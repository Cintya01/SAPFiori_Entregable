sap.ui.define([
    "com/bootcamp/sapui5/finalproject/utils/HomeService",
    "sap/ui/model/json/JSONModel"
    ], function (HomeService, JSONModel){
        "use strict";
    
        return {
            init: function (oNorthwindModel) {
                this._oNorthwindModel = oNorthwindModel;
            },
    
            getDataSuppliers: async function() {
               let oFilters = [];
                return HomeService.readSuppliers(this._oNorthwindModel, oFilters);
            },

            setSuppliersModel: async function (oController, aDatos) {
                let oListModel = oController.getOwnerComponent().getModel('SuppliersCollection');
                 if(!oListModel){
                 const oModel  = new JSONModel([]);
                 oModel.setSizeLimit(1000000);	
                 oController.getOwnerComponent().setModel(oModel, "SuppliersCollection");  
                 oListModel = oController.getOwnerComponent().getModel('SuppliersCollection');
             }
 
             oListModel.setData(aDatos);
         }, 
            
    
    
        };
    });