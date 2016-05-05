sap.ui.define([
	"com/duxinnovation/ehs/registroocorrencias/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.duxinnovation.ehs.registroocorrencias.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function() {
			this.getRouter().navTo("worklist");
		}

	});

});