/**
 * Starter module for QR code popup.
 *
 * @module qrcode
 * @requires modules/RandomTips
 * @requires modules/InitQrCode
 */
"use strict";

import "./modules/InitQrCode.js";

RandomTips.init().then(() => {
    RandomTips.setContext("popup");
    RandomTips.showRandomTipIfWanted();
});
