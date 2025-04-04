sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
], function (Controller, Filter, FilterOperator,JSONModel) {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Detail", {

        onInit: function () {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },


        _onObjectMatched: function (oEvent) {
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;
            this._applyProductFilter(sSupplierID);
            this.getView().bindElement({
                path: "/Suppliers(" + sSupplierID + ")",
                parameters: {
                    expand: "Products"
                }
            });
        },


        _applyProductFilter: function (sSupplierID) {
            let oTable = this.byId("productTable");
            let oBinding = oTable.getBinding("items");
            let oFilter = new Filter("SupplierID", FilterOperator.EQ, sSupplierID);
            oBinding.filter(oFilter);
            
        },

        onRowPress: async function (oEvent) {
            const oSelectedData = oEvent.getSource().getBindingContext().getObject();
            console.log("Data enviada al Dialog:", oSelectedData);
        
            const oDialogModel = new sap.ui.model.json.JSONModel(oSelectedData);
        
            if (!this.oDialog) {
                this.oDialog = await this.loadFragment({
                    name: "com.bootcamp.sapui5.finalproject.view.fragments.Dialog"
                });
        
                this.getView().addDependent(this.oDialog);
            }
            this.oDialog.setModel(oDialogModel, "dialog");
            console.log("Modelo asignado al diálogo:", this.oDialog.getModel("dialog").getData());
        
            this.oDialog.open();
        },

        //Data Pasa pero no se lee en el dialog
        
        onCloseMaterialDialog: function () {
            this.oDialog.close();
          }

    });
});
