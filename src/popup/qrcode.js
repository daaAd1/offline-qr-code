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

const t0 = performance.now();

if (Math.random() < 0.2) {
    RandomTips.init(tips).then(() => {
        RandomTips.setContext("popup");
        const t2 = performance.now();
        console.log(`Random init when tip shows took ${t2 - t0} milliseconds.`);
        RandomTips.showRandomTip();
    });
} else {
    const t2 = performance.now();
    console.log(`Random init WHOLE took ${t2 - t0} milliseconds.`);
    console.info("show no random tip, because randomize did not pass");
    throw Promise.reject(
        new Error("show no random tip, because randomize did not pass")
    );
}
