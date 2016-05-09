sap.ui.define([
	"com/duxinnovation/ehs/registroocorrencias/controller/BaseController",
	'jquery.sap.global',
	'sap/m/Button',
	'sap/m/MessageToast',
	'sap/m/Dialog',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/json/JSONModel',
	"com/duxinnovation/ehs/registroocorrencias/model/formatter"
], function(BaseController,jQuery, Button, MessageToast, Dialog, Fragment, Controller, Filter, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("com.duxinnovation.ehs.registroocorrencias.controller.Worklist", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
			var oViewModel;
			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				saveAsTileTitle: this.getResourceBundle().getText("worklistViewTitle"),
				shareOnJamTitle: this.getResourceBundle().getText("worklistViewTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableBusyDelay: 0
			});
			this.setModel(oViewModel, "worklistView");

		},

		
		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash(),
				oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Navigate back to FLP home
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#"
					}
				});
			}
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("worklistView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},
		
        onItemPress : function(oEvent) {
          var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
          var oCtx = oItem.getBindingContext();
          var sPath = oCtx ? oCtx.getPath() : undefined;
          
          var dialog = new Dialog({
				title: 'Available Products',
				contentWidth: "550px",
				contentHeight: "300px",
				// content: new List({
				// 	items: {
				// 		path: '/Ocorrencias',
				// 		template: new StandardListItem({
				// 			title: "{DsOcorre}",
				// 			counter: "{DsStatus}"
				// 		})
				// 	}
				// }),
				beginButton: new Button({
					text: 'Close',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			//to get access to the global model
			this.getView().addDependent(dialog);
			dialog.open();
        },
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject: function(oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("IdEpiepi")
			});
		},
		handleTableSelectDialogPress: function(oEvent) {
		    var that = this;
		    
		    var oDummyController = {
		        onOpen: function(){
		            alert("init");
		            console.log(this.getView().byId("MainForm")); 
			        this.getView().byId("MainForm").bindElement("/Ocorrencias('2')");
		        }, 
    			closeDialog: function(){
    				that._oDialog.close();
    			},
    			submitDialog: function(){
    			    alert("Salvar");
    				that._oDialog.close();
    			}
    			
    		};
		
			if (!that._oDialog) {
				that._oDialog = sap.ui.xmlfragment("Create","com.duxinnovation.ehs.registroocorrencias.fragment.Create", oDummyController);
			}
		
			var data = {
            	actionText: "Fechar",
            	submitText: "Salvar"
            };
            
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(data);
            
			that._oDialog.setModel(oModel);
			that._oDialog.open();
		}

	});

});