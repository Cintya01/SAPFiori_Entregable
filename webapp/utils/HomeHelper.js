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


            onSearch: async function (controller) {
                let aFilters = [];
                let sIdOrName= controller.byId("idOrNameInput").getValue();
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
                let sCountry = controller.byId("countrySelect").getSelectedKey();
                if (sCountry) {
                    aFilters.push(new Filter("Country", FilterOperator.Contains, sCountry))
                }
    
                try{
                    const aSuppliers = await HomeService.readSuppliers(this._oNorthwindModel, aFilters);
                    this.setSuppliersModel(this, aSuppliers);
                }catch{
                    console.error("error en data filtro")
                }
             },
    



             setSuppliersModel: async function (controller, aDatos) {
                let oListModel = controller.getView().getModel('SuppliersCollection');
                if (!oListModel) {
                    const oModel = new JSONModel([]);
                    oModel.setSizeLimit(1000000);
                    controller.getView().setModel(oModel, "SuppliersCollection");
                    oListModel = controller.getView().getModel('SuppliersCollection');
                }

             oListModel.setData(aDatos);
         }, 

         

            
    
    
        };
    });