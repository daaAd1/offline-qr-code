import { assert } from "chai";
import * as MessageLevel from "../src/common/modules/data/MessageLevel.js";

describe("common data: MessageLevel", () => {
    describe("MESSAGE_LEVEL", () => {
        it("is there", () => {
            assert.exists(MessageLevel.MESSAGE_LEVEL);
            assert.isNotEmpty(MessageLevel.MESSAGE_LEVEL);
        });

        it("is object", () => {
            assert.isObject(MessageLevel.MESSAGE_LEVEL);
        });

        it("is frozen", () => {
            assert.isFrozen(MessageLevel.MESSAGE_LEVEL);
        });
    });
});
