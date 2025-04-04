sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("com.bootcamp.sapui5.finalproject.controller.Dialog", {
      onInit(){},

      onCloseMaterialDialog: function () {
        this.oDialog.close();
      }
  
    

  });
});
