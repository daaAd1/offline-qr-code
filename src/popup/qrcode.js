/**
 * Starter module for QR code popup.
 *
 * @module qrcode
 * @requires modules/RandomTips
 * @requires modules/InitQrCode
 */
"use strict";

import { tips } from "/common/modules/data/Tips.js";
import * as RandomTips from "/common/modules/RandomTips/RandomTips.js";

import "./modules/InitQrCode.js";

RandomTips.init().then(() => {
    RandomTips.setContext("popup");
    RandomTips.showRandomTipIfWanted(tips);
});
