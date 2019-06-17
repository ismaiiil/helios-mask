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

var sending_account = null;
var available_offline_accounts = {};
var available_online_accounts = {};
var online_wallet_to_id_lookup = {};
var online_wallet_to_name_lookup = {};
var tfa_enabled = false;

var newBlockListLength = 10

//CASHES
var current_hls_balance_in_wei = 0;
var current_min_gas_price = 1;
var current_incoming_transactions = []

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
            populateOnlineKeystores(online_keystores, password);
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
            //popup(popup_content, 500);
            return reject(popup_content);
        }
    });
});

var hasAccountsCached = () => {
    return Object.keys(available_online_accounts).length !== 0;
}

var logout = () => {available_online_accounts = {};chrome.runtime.reload();}

function populateOnlineKeystores(keystores, password){
    if(keystores.length > 0){
        for(var i = 0; i < keystores.length; i++){
            var keystore = keystores[i]['keystore'];
            var wallet_id = keystores[i]['id'];
            var wallet_name = keystores[i]['name'];
            var new_wallet = helios_web3.eth.accounts.decrypt(JSON.parse(keystore), password);
            if(i === 0) {
                addOnlineWallet(new_wallet, wallet_id, wallet_name);
            }else{
                addOnlineWallet(new_wallet, wallet_id, wallet_name, true);
            }
        }
        console.log(available_online_accounts)
        return true
    }
}

function addOnlineWallet(new_wallet, wallet_id, wallet_name, do_not_make_active_account){
    helios_web3.hls.accounts.wallet.add(new_wallet);
    available_online_accounts[new_wallet.address] = new_wallet;
    online_wallet_to_id_lookup[new_wallet.address] = wallet_id;
    online_wallet_to_name_lookup[new_wallet.address] = wallet_name;
    if(!(do_not_make_active_account === true)) {
        sending_account = new_wallet;
        //refreshDashboard();
    }

    var wallet_name_short = wallet_name.substr(0,25);
    if(wallet_name.length > 25){
        wallet_name_short = wallet_name_short + "...";
    }

    //Now add it to the menu
    // var wallet_menu_item = " <li role=\"presentation\" class=\"nav__item\">\n" +
    //     "                            <a href='#main_page-online_wallet' id='main_page-online_wallet-menu_item' class='nav__link edit_online_wallet' data-address='"+new_wallet.address+"'>\n" +
    //     "                                <div class='wallet_menu_item'>\n" +
    //     "                                     <div class='wallet_menu_item_name'>"+wallet_name_short+"</div><img class='switch_wallet_link' data-address='"+new_wallet.address+"' src='images/use_button.png'>\n" +
    //     "                                </div>\n" +
    //     "                            </a>\n" +
    //     "                        </li>"
    // $('#online_wallets_menu_list').prepend(wallet_menu_item);
}

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
    if (typeof window.logout === 'undefined'){
        window.logout = logout;
    }
    if (typeof window.hasAccountsCached === 'undefined'){
        window.hasAccountsCached = hasAccountsCached;
    }
}


//alert(`Hello ${store.getters.foo}!`);