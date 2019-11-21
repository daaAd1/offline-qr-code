import { assert } from "chai";

import * as GlobalConsts from "../src/common/modules/data/GlobalConsts.js";

describe("common data: GlobalConsts", () => {
    describe("ADDON_NAME", () => {
        it("is there", () => {
            assert.exists(GlobalConsts.ADDON_NAME);
            assert.isNotEmpty(GlobalConsts.ADDON_NAME);
        });

        it("is string", () => {
            assert.isString(GlobalConsts.ADDON_NAME);
        });
    });

    describe("ADDON_NAME_SHORT", () => {
        it("is there", () => {
            assert.exists(GlobalConsts.ADDON_NAME_SHORT);
            assert.isNotEmpty(GlobalConsts.ADDON_NAME_SHORT);
        });

        it("is string", () => {
            assert.isString(GlobalConsts.ADDON_NAME_SHORT);
        });
    });
});
