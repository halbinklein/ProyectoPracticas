sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/m/Dialog","sap/m/Button","sap/m/library","sap/m/MessageBox"],function(e,o,t,s,n,i){"use strict";return e.extend("mantenimientousuario.controller.View_Test",{onInit:function(){this.onGetUsuarios();this.onGetUsuariosoData()},onGetUsuariosoData:function(){var e="https://services.odata.org/TripPinRESTierService/(S(lfwunkdtmnng4f0vm14tstia))/People";var o=this;$.ajax({type:"GET",url:e,contentType:"application/json",async:false,beforeSend:function(){sap.ui.core.BusyIndicator.show(0)},success:function(e){console.log(e);if(e){o.getView().setModel(new sap.ui.model.json.JSONModel(e),"listaUseroData")}else{o.getView().setModel(new sap.ui.model.json.JSONModel([]),"listaUseroData")}o.getView().getModel("listaUseroData").refresh()},error:function(e){console.log(e)},complete:function(){sap.ui.core.BusyIndicator.hide()}})},onGetUsuarios:function(){var e=this.getApiVSM()+"/product/findAll";var o=this;$.ajax({type:"GET",url:e,contentType:"application/json",async:false,beforeSend:function(){sap.ui.core.BusyIndicator.show(0)},success:function(e){console.log("DATOS DESDE MI BACKEND:");console.log(e);if(e){o.getView().setModel(new sap.ui.model.json.JSONModel(e),"listaUser")}else{o.getView().setModel(new sap.ui.model.json.JSONModel([]),"listaUser")}o.getView().getModel("listaUser").refresh()},error:function(e){console.log(e)},complete:function(){sap.ui.core.BusyIndicator.hide()}})},onOpenDialogUser:function(e){o.load({name:"mantenimientousuario.view.fragment.dialogUser",controller:this}).then(function(o){this._oDialog3=o;if(e){this._oDialog3.setModel(new sap.ui.model.json.JSONModel(e),"oInfo")}this._oDialog3.open()}.bind(this))},onSaveUsuario:function(e){var o=this._oDialog3.getModel("oInfo").getData();console.log(o);var t={};var s="";var n="";if(o.CLIENTEID!=undefined){n="POST";t={clienteid:o.CLIENTEID,nombre:o.NOMBRE,apellido:o.APELLIDO,correo:o.EMAIL};s=this.getApiVSM()+"/product/update"}else{n="POST";t={nombre:o.NOMBRE,apellido:o.APELLIDO,correo:o.EMAIL};s=this.getApiVSM()+"/product/create"}var i=this;$.ajax({type:n,url:s,contentType:"application/json",data:JSON.stringify(t),async:false,beforeSend:function(){sap.ui.core.BusyIndicator.show(0)},success:function(e){i.onGetUsuarios();i.onCloseUser();i.getView().byId("tbl-tabla_general").clearSelection();sap.m.MessageToast.show("Se procesó correctamente")},error:function(e){console.log(e)},complete:function(){sap.ui.core.BusyIndicator.hide()}})},onCloseUser:function(){this._oDialog3.close()},onEditUser:function(){var e=this.getView().byId("idProductsTable0");var o=e.getSelectedItem().getBindingContext("listaUser").getObject();console.info("oIndice:");console.info(o);if(o.length>1){return sap.m.MessageToast.show("Seleccione solo un registro")}else if(o.length==0){return sap.m.MessageToast.show("No se ha seleccionado registro")}var t=this.getView().getModel("listaUser").getProperty("/selectGeneral");console.log(t);this.onOpenDialogUser(o)},onListTablaGeneral:function(){var e=this.getView().byId("txtBuscar");console.info(e.getValue());var o=e.getValue();var t=this.getApiVSM()+"/product/find";var s=this;$.ajax({type:"POST",url:t,contentType:"application/json",data:JSON.stringify({nombre:o}),async:false,beforeSend:function(){sap.ui.core.BusyIndicator.show(0)},success:function(e){console.log(e);if(e){s.getView().setModel(new sap.ui.model.json.JSONModel(e),"listaUser")}else{s.getView().setModel(new sap.ui.model.json.JSONModel([]),"listaUser")}s.getView().getModel("listaUser").refresh()},error:function(e){console.log(e)},complete:function(){sap.ui.core.BusyIndicator.hide()}})},onDeleteUser:function(){var e=this;var o=this.getView().byId("idProductsTable0");var t=o.getSelectedItem().getBindingContext("listaUser").getObject();console.info("oIndice:");console.info(t);alert("Eliminando"+t.NOMBRE);if(t.length>1){return sap.m.MessageToast.show("Seleccione solo un registro")}else if(t.length==0){return sap.m.MessageToast.show("No se ha seleccionado registro")}var s="POST";var n={clienteid:t.CLIENTEID};var i=this.getApiVSM()+"/product/delete";$.ajax({type:s,url:i,contentType:"application/json",data:JSON.stringify(n),async:false,beforeSend:function(){sap.ui.core.BusyIndicator.show(0)},success:function(o){e.onGetUsuarios();e.onCloseUser();e.getView().byId("tbl-tabla_general").clearSelection();sap.m.MessageToast.show("Se procesó correctamente")},error:function(e){console.log(e)},complete:function(){sap.ui.core.BusyIndicator.hide()}});var a=this.getView().getModel("listaUser").getProperty("/selectGeneral");console.log(a)},onGetParametro:function(e){if(e.getParameter("rowContext")){this.getView().getModel("listaUser").setProperty("/selectGeneral",e.getParameter("rowContext").getObject())}},getApiVSM:function(){return"https://sjp_app_node_001-forgiving-reedbuck-rm.cfapps.us10-001.hana.ondemand.com"}})});
//# sourceMappingURL=View_Test.controller.js.map