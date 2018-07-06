import * as Logger from "/common/modules/Logger.js";

import * as QrLibQrGen from "./QrLibQrGen.js";
import * as QrLibKjua from "./QrLibKjua.js";

// abstracts away all specific handling of QR code library
let initFinished = false;
let qrCodeLib = null;

// by default everything has "been changed" (i.e. nothing has been generated yet)
const changedValues = new Set("text", "color", "size");

/**
 * Provide connection to library and get QR code with current options.
 *
 * @name   QrCreator.getQrCodeFromLib
 * @function
 * @private
 * @returns {HTMLElement}
 */
function getQrCodeFromLib() {
    return qrCodeLib.getQr();
}

/**
 * Displays the QR code when options have been set.
 *
 * @name   QrCreator.generate
 * @function
 * @returns {void}
 */
export function generate() {
    if (!initFinished) {
        Logger.logWarning("QrCreator.generate called, but init not yet finished. Abort.");
        return;
    }

    // special shortcuts for SVG output when text does not need to be regenerated
    if (qrCodeLib.GENERATION_TYPE === "svg" && !changedValues.has("text")) {
        // color won't be changed
        // size does not need adjustment for SVGs

        return;
    }

    UserInterface.replaceQr(getQrCodeFromLib());

    changedValues.clear();
}

/**
 * Sets the size of the QR code.
 *
 * @name   QrCreator.setSize
 * @function
 * @param  {int} size
 * @returns {void}
 */
export function setSize(size) {
    if (size <= 1) {
        Logger.logError("tried to create QR code with invalid size of 0 or smaller");
        return;
    }

    qrCodeLib.set("size", size);
}

/**
 * Sets the text for the QR code.
 *
 * Note that this also triggers all user interface actions to display the
 * test in a nice way. (e.g. selection and scrolling)..
 * As such, it is not a good idea for live updating the text. To only set
 * the option for the QR code itself, use {@link setTextInternal()}.
 *
 * @name   QrCreator.setText
 * @function
 * @param  {string} text
 * @returns {void}
 */
export function setText(text) {
    setTextInternal(text);
    UserInterface.setQrInputFieldText(text);
}

/**
 * Sets the text for the QR code, but does not modify the UI.
 *
 * Usually this should not be used, as it can cause an inconsistent display.
 *
 * @name   QrCreator.setTextInternal
 * @function
 * @param  {string} text
 * @returns {void}
 */
export function setTextInternal(text) {
    changedValues.add("text");
    qrCodeLib.set("text", text);
}

/**
 * Generates a QR code from a given tab.
 *
 * @name   QrCreator.generateFromTab
 * @function
 * @param  {browser.tabs} tab
 * @returns {void}
 */
export function generateFromTab(tab) {
    if (tab.url === undefined) {
        throw new Error("URL not yet available.");
    }

    setText(tab.url);
    generate();
}

/**
 * Generates a QR code for multiple tabs.
 *
 * Attention: Currently just uses the first tab, only!
 *
 * @name   QrCreator.generateFromTabs
 * @function
 * @param  {browser.tabs} tabs tabs passed from browser.tabs
 * @returns {void}
 */
export function generateFromTabs(tabs) {
    generateFromTab(tabs[0]);
}

/**
 * Returns the type of the generated QR code.
 *
 * @name   QrCreator.getGenerationType
 * @function
 * @returns {Promise}
 */
export async function getGenerationType() {
    await qrCreatorInit; // module needs to be initiated

    return qrCodeLib.GENERATION_TYPE;
}

/**
 * Initiates module.
 *
 * @name   QrCreator.init
 * @function
 * @returns {Promise}
 */
export function init() {
    QrLibKjua.init();

    // get all settings
    return AddonSettings.get().then((settings) => {
        switch (settings.qrCodeType) {
        case "svg":
            qrCodeLib = QrLibQrGen;
            break;
        case "canvas":
            qrCodeLib = QrLibKjua;
            break;
        default:
            throw new Error("invalid QR code type setting");
        }

        qrCodeLib.set("qrColor", settings.qrColor);
        qrCodeLib.set("qrBackgroundColor", settings.qrBackgroundColor);
        qrCodeLib.set("qrErrorCorrection", settings.qrErrorCorrection);

        initFinished = true;
    });
}
