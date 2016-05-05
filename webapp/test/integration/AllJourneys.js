jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.require("sap.ui.test.Opa5");

jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.Common");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.Worklist");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.Object");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.NotFound");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.Browser");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.pages.App");

sap.ui.test.Opa5.extendConfig({
	arrangements: new com.duxinnovation.ehs.registroocorrencias.test.integration.pages.Common(),
	viewNamespace: "com.duxinnovation.ehs.registroocorrencias.view."
});

// Start the tests
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.WorklistJourney");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.ObjectJourney");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.NavigationJourney");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.NotFoundJourney");
jQuery.sap.require("com.duxinnovation.ehs.registroocorrencias.test.integration.FLPIntegrationJourney");