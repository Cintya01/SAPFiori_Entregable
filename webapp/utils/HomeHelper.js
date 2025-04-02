sap.ui.define([
    "com/bootcamp/sapui5/finalproject/utils/HomeService",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    ], function (HomeService, JSONModel, Filter, FilterOperator){
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

         onSearch: async function () {
            let aFilters = [];
            let sIdOrName= this.byId("idOrNameInput").getValue();
            //filtro id o nombre
            if(sIdOrName) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("SupplierID", FilterOperator.Contains, sIdOrName),
                        new Filter("ContactName", FilterOperator.Contains, sIdOrName),
                    ],

                }));
            }
            //filtro dropdown pais
            let sCountry = this.byId("countrySelect").getSelectedKey();
            if (sCountry) {
                aFilters.push(new Filter("Country", FilterOperator.Contains, sCountry))
            }

            try{

            }catch{
                
            }
         }
            
    
    
        };
    });