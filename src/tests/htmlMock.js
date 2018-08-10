const TEST_AREA_ID = "testArea";

const elTestArea = document.getElementById(TEST_AREA_ID);

/**
 * Downloads the test file and attach it to the test area.
 *
 * @function
 * @private
 * @param  {string} filename
 * @returns {Promise}
 */
export function setTestHtmlFile(filename) {
    return getTestHtmlFile(filename).then((responseBlob) => setTestHtml(responseBlob));
}

/**
 * Get test HTML code froma file name.
 *
 * @function
 * @private
 * @param  {string} filename
 * @returns {Promise}
 */
export function getTestHtmlFile(filename) {
    return fetch(`./${filename}`).then((response) => {
        if (!response.ok) {
            throw new Error(`Error in network response when fetching ${filename}.`);
        }

        return response.text();
    });
}

/**
 * Set the HTML code as a test code in the test area.
 *
 * @function
 * @private
 * @param  {string} htmlText
 * @returns {void}
 */
export function setTestHtml(htmlText) {
    elTestArea.innerHTML = htmlText;
}

/**
 * Get's the current test HTML code.
 *
 * @function
 * @private
 * @returns {string}
 */
export function getTestHtml() {
    return elTestArea.innerHTML;
}

/**
 * Removes any test HTML code.
 *
 * @function
 * @private
 * @returns {void}
 */
export function cleanup() {
    elTestArea.innerHTML = "";
}
