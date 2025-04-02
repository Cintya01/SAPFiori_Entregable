sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/finalproject/utils/HomeHelper"
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Home", {
        onInit() {
            
            this._loadData();
            
            
        },

        async _loadData() {
            try {
                let oDatos = await HomeHelper.getDataSuppliers(this.getView().getModel());
                await HomeHelper.setSuppliersModel(this, oDatos[0].results);
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            }
        },

        onInputSearch: function () {
            HomeHelper.onSearch(this);
        },

        onCountrySearch: function(){
            HomeHelper.onSearch(this);
        }
        
    });

});