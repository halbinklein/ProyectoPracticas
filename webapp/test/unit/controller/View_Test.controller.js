/*global QUnit*/

sap.ui.define([
	"mantenimiento_usuario/controller/View_Test.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View_Test Controller");

	QUnit.test("I should test the View_Test controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
