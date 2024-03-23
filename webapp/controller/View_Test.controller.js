sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Dialog, Button,mobileLibrary,MessageBox) {
        "use strict";

        return Controller.extend("mantenimientousuario.controller.View_Test", {
            onInit: function () {
                /* Llamamos al servicio*/
                this.onGetUsuarios();
                this.onGetUsuariosoData();
            },
            onGetUsuariosoData: function(){

                //var texto = txtBuscar

                var _url = "https://services.odata.org/TripPinRESTierService/(S(lfwunkdtmnng4f0vm14tstia))/People";
                var _this = this;
                $.ajax({
                    type: "GET",
                    url: _url,
                    contentType: "application/json",
                    //data: JSON.stringify(oData),
                    async: false,
                    beforeSend: function () {
                        sap.ui.core.BusyIndicator.show(0);
                    },
                    success: function (data) {

                        console.log(data);

                        if(data){
                            _this.getView().setModel(new sap.ui.model.json.JSONModel(data), "listaUseroData");
                        }else{
                            _this.getView().setModel(new sap.ui.model.json.JSONModel([]), "listaUseroData");
                        }
                        _this.getView().getModel("listaUseroData").refresh();
                    },error: function(error){
                        console.log(error);
                    },
                    complete: function(){
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
    
            },

            onGetUsuarios: function(){

                //var texto = txtBuscar

                var _url = this.getApiVSM() + "/api/find";
                //var _url = "https://sjp_app_node_001-mediating-fox-ay.cfapps.us10-001.hana.ondemand.com";
                var _this = this;
                $.ajax({
                    type: "GET",
                    url: _url,
                    contentType: "application/json",
                    //data: JSON.stringify(oData),
                    async: false,
                    beforeSend: function () {
                        sap.ui.core.BusyIndicator.show(0);
                    },
                    success: function (data) {

                        console.log(data);

                        if(data){
                            _this.getView().setModel(new sap.ui.model.json.JSONModel(data), "listaUser");
                        }else{
                            _this.getView().setModel(new sap.ui.model.json.JSONModel([]), "listaUser");
                        }
                        _this.getView().getModel("listaUser").refresh();
                    },error: function(error){
                        console.log(error);
                    },
                    complete: function(){
                        sap.ui.core.BusyIndicator.hide();
                    }
                });
    
            },
            onOpenDialogUser: function(oModel){
                Fragment.load({
                    name: "mantenimientousuario.view.fragment.dialogUser",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog3 = oDialog;
                    if(oModel){
                        this._oDialog3.setModel(new sap.ui.model.json.JSONModel(oModel), "oInfo");
                    }
                    this._oDialog3.open();
                }.bind(this));
            },
            onSaveUsuario: function(oEvent){
                var oData = this._oDialog3.getModel("oInfo").getData();
                console.log(oData);
                var oDatax = {}
                var _url = ""
                var tipo = ""
                
                //console.log(oData.CLIENTEID);

                if(oData.CLIENTEID != undefined){
                    tipo = "POST";
                    
                    oDatax = {
                        "clienteid": oData.CLIENTEID,
                        "nombre": oData.NOMBRE,
                        "apellido": oData.APELLIDO,
                        "correo": oData.EMAIL
                    };
                    
                    
                    //_url = "https://sjp_app_node_001-mediating-fox-ay.cfapps.us10-001.hana.ondemand.com" + "/update";
                    _url = this.getApiVSM() + "/api/update";

                }else{
                    tipo = "POST";

                    oDatax = {
                        "nombre": oData.NOMBRE,
                        "apellido": oData.APELLIDO,
                        "correo": oData.EMAIL
                    };
                    
                    //_url = "https://sjp_app_node_001-mediating-fox-ay.cfapps.us10-001.hana.ondemand.com" + "/create";
                    _url = this.getApiVSM() + "/api/create";
                }

                var _this = this;
                $.ajax({
                    type: tipo,
                    url: _url,
                    contentType: "application/json",
                    data: JSON.stringify(oDatax),
                    async: false,
                    beforeSend: function () {
                        sap.ui.core.BusyIndicator.show(0)
                    },
                    success: function (data) {
                        _this.onGetUsuarios();
                        _this.onCloseUser();
                        _this.getView().byId("tbl-tabla_general").clearSelection();
                        sap.m.MessageToast.show("Se procesó correctamente");
                    },
                    error: function (data) {
                        console.log(data)
                    },
                    complete: function () {
                        sap.ui.core.BusyIndicator.hide()
                    }
                });
            },
            onCloseUser: function(){
                this._oDialog3.close();
            },
            onEditUser: function(){
                var oTabla = this.getView().byId("tbl-tabla_general");
                var oIndice = oTabla.getSelectedIndices()
                if(oIndice.length > 1){
                    return sap.m.MessageToast.show("Seleccione solo un registro");
                }else if(oIndice.length == 0){
                    return sap.m.MessageToast.show("No se ha seleccionado registro");
                }
                
                var oData = this.getView().getModel("listaUser").getProperty("/selectGeneral")
                console.log(oData)
                this.onOpenDialogUser(oData);
            },
            onGetParametro: function(oEvent){
                if(oEvent.getParameter("rowContext")){
                    this.getView().getModel("listaUser").setProperty("/selectGeneral",oEvent.getParameter("rowContext").getObject());
                }
            },
            getApiVSM: function(){
                return "https://sjp_app_node_001-mediating-fox-ay.cfapps.us10-001.hana.ondemand.com";
                //return "./backend/";
            },
        });
    });
