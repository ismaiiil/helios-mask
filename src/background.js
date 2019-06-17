import store from './store';
global.browser = require('webextension-polyfill');
var web3_main = require('./web3.js');
var helios_web3 = web3_main.web3;
var accountHelpers = require('./helpers/account_helpers');
var numerical = require("./helpers/numerical_helpers");
var fileSaver = require("file-saver");
var HeliosUtils = require('helios-utils');
var ConnectionMaintainer = HeliosUtils.ConnectionMaintainer;
var getNodeMessageFromError = HeliosUtils.getNodeMessageFromError;
var KeystoreServer = HeliosUtils.KeystoreServer;

var availableNodes = [
    "wss://bootnode.heliosprotocol.io:30304"
];

var connectionMaintainer = new ConnectionMaintainer(helios_web3, availableNodes);
connectionMaintainer.startNetworkConnectionMaintainerLoop();

var onlineKeystoreServerUrl = 'https://heliosprotocol.io/wallet-serverside/';

var server = new KeystoreServer(onlineKeystoreServerUrl);

var login = (username, password) => new Promise((resolve, reject) => {
    console.log("calling login")
    server.signIn(username, password, null)
    .then(function(response){
        if(response !== false && "success" in response) {
            //success
            //set_username_status(username);
            var online_keystores = response['keystores'];
            console.log(online_keystores);
            //populateOnlineKeystores(online_keystores, password);
            //close_popup();
            //switchToPage('main_page');
            var tfa_enabled = (response['2fa_enabled'] === 'true');
            console.log(tfa_enabled);
            //set_two_factor_authentication_status(tfa_enabled);
            //afterLoginInit();
            return resolve(true);
        }else{
            //fail
            var popup_content = "Oops, something went wrong:<br><br>" + response['error_description'];
            console.log(popup_content)
            //popup(popup_content, 500);
            return reject;
        }
    });
});

if (typeof window !== 'undefined') {
    if (typeof window.helios_web3 === 'undefined'){
        window.helios_web3 = helios_web3;
    }
    if (typeof window.fileSaver === 'undefined'){
        window.fileSaver = fileSaver;
    }
    if (typeof window.accountHelpers === 'undefined'){
        window.accountHelpers = accountHelpers;
    }
    if (typeof window.numerical === 'undefined'){
        window.numerical = numerical;
    }
    if (typeof window.connectionMaintainer === 'undefined'){
        window.connectionMaintainer = connectionMaintainer;
    }
    if (typeof window.server === 'undefined'){
        window.server = server;
    }
    if (typeof window.getNodeMessageFromError === 'undefined'){
        window.getNodeMessageFromError = getNodeMessageFromError;
    }
    if (typeof window.login === 'undefined'){
        window.login = login;
    }
}


alert(`Hello ${store.getters.foo}!`);