sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
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

        onRowPress: async function(oEvent){
            let oSource = oEvent.getSource();
            let aDatos = oSource.getBindingContext().getObject();

            this.oDialog ??= await this.loadFragment({
                name:"com.bootcamp.sapui5.finalproject.view.fragments.Dialog"
            });
            this.oDialog.open(aDatos);
        },

        onCloseMaterialDialog: function () {
            this.oDialog.close();
          }

    });
});
