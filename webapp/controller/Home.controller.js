sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/finalproject/utils/HomeHelper",
     "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, HomeHelper, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Home", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this._loadData();
            HomeHelper.setInitModelLocalData(this.getOwnerComponent());
            
        },

        onPress: async function () {
            let oLocalDataModel = this.getOwnerComponent().getModel("LocalDataModel");
        
            if (!oLocalDataModel) {
                console.error("El modelo LocalDataModel no está disponible.");
                return;
            }
        
            let values = oLocalDataModel.getData();
        
            let oFilter = [];
        
            if (values.valueInput) {
                if (!isNaN(values.valueInput)) {
                    oFilter.push(new Filter("SupplierID", FilterOperator.EQ, values.valueInput));
                } else {
                    oFilter.push(new Filter("ContactName", FilterOperator.Contains, values.valueInput));
                }
            }
        
            if (values.selectedKey) {
                oFilter.push(new Filter("Country", FilterOperator.EQ, values.selectedKey));
            }
        
            let oDatos = await HomeHelper.getDataSuppliers(oFilter);
            await HomeHelper.setSuppliersModel(this, oDatos[0].results);
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource();

            let oDatos = oSource.getBindingContext("SuppliersCollection").getObject();

            this.oRouter.navTo("detail", {
                ProductID: oDatos.ProductID
            });
        },

        async _loadData() {
            try {
                let oDatos = await HomeHelper.getDataSuppliers(this.getView().getModel());
                let uniqueCountries = [...new Set(oDatos[0].results.map(item => item.Country))];

                let oCountriesModel = new sap.ui.model.json.JSONModel({ 
                    Countries: uniqueCountries.map(country => ({ Country: country }))
                });
            
                this.getView().setModel(oCountriesModel, "CountriesModel");

                
                console.log("Modelo actualizado:", this.getView().getModel("CountriesModel").getData());
                this.getView().getModel("CountriesModel").refresh(true);
                await HomeHelper.setSuppliersModel(this, oDatos[0].results);
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        },

       
        
    });

});