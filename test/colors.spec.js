/* eslint-disable no-undef */
import { assert } from "chai";
import * as Colors from "../src/common/modules/Colors.js";

const COLOR_ARRAY = Object.freeze({
    // contrast 1
    WHITE: [255, 255, 255],
    BLACK: [0, 0, 0],

    // contrast 2
    "#00FEFF": [0, 254, 255], // nearly Cyan (#00FFFF), teal50 from Firefox Photon
    "#FF0000": [255, 0, 0], // red

    // contrast 3
    "#4F477D": [79, 71, 125],
    "#757D47": [17, 125, 71]
});

describe("common module: Color", () => {
    describe("CONTRAST_RATIO", () => {
        it("is there", () => {
            assert.exists(Colors.CONTRAST_RATIO);
            assert.isNotEmpty(Colors.CONTRAST_RATIO);
        });

        it("is frozen", () => {
            assert.isFrozen(Colors.CONTRAST_RATIO);
        });
    });

    describe("contrastRatio()", () => {
        const ALLOWED_DELTA = 0.01;

        it("returns minimum contrast ratio for same color", () => {
            assert.strictEqual(
                Colors.contrastRatio(COLOR_ARRAY.WHITE, COLOR_ARRAY.WHITE),
                1
            );
            assert.strictEqual(
                Colors.contrastRatio(COLOR_ARRAY.BLACK, COLOR_ARRAY.BLACK),
                1
            );
            assert.strictEqual(
                Colors.contrastRatio(
                    COLOR_ARRAY["#00FEFF"],
                    COLOR_ARRAY["#00FEFF"]
                ),
                1
            );
        });

        it("returns maxiumum contrast ratio for black/white", () => {
            assert.strictEqual(
                Colors.contrastRatio(COLOR_ARRAY.WHITE, COLOR_ARRAY.BLACK),
                21
            );
            assert.strictEqual(
                Colors.contrastRatio(COLOR_ARRAY.BLACK, COLOR_ARRAY.WHITE),
                21
            );
        });

        it("returns correct contrast ratio for #00FEFF/white (low)", () => {
            assert.approximately(
                Colors.contrastRatio(COLOR_ARRAY["#00FEFF"], COLOR_ARRAY.WHITE),
                1.26,
                ALLOWED_DELTA
            );
            assert.approximately(
                Colors.contrastRatio(COLOR_ARRAY.WHITE, COLOR_ARRAY["#00FEFF"]),
                1.26,
                ALLOWED_DELTA
            );
        });

        it("returns correct contrast ratio for #00FEFF/black (high)", () => {
            assert.approximately(
                Colors.contrastRatio(COLOR_ARRAY["#00FEFF"], COLOR_ARRAY.BLACK),
                16.62,
                ALLOWED_DELTA
            );
            assert.approximately(
                Colors.contrastRatio(COLOR_ARRAY.BLACK, COLOR_ARRAY["#00FEFF"]),
                16.62,
                ALLOWED_DELTA
            );
        });

        it("returns correct contrast ratio for #00FEFF/#4F477D (medium)", () => {
            assert.approximately(
                Colors.contrastRatio(
                    COLOR_ARRAY["#00FEFF"],
                    COLOR_ARRAY["#4F477D"]
                ),
                6.57,
                ALLOWED_DELTA
            );
            assert.approximately(
                Colors.contrastRatio(
                    COLOR_ARRAY["#4F477D"],
                    COLOR_ARRAY["#00FEFF"]
                ),
                6.57,
                ALLOWED_DELTA
            );
        });
    });

    describe("invertColor()", () => {
        it("inverts white to black", () => {
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY.WHITE),
                "#000000"
            );
        });

        it("inverts black to white", () => {
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY.BLACK),
                "#ffffff"
            );
        });

        it("inverts #00FEFF and #FF0000 correctly", () => {
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY["#00FEFF"]),
                "#ff0100"
            );
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY["#FF0000"]),
                "#00ffff"
            );
        });

        it("inverts #4F477D and #757D47 correctly", () => {
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY["#4F477D"]),
                "#b0b882"
            );
            assert.strictEqual(
                Colors.invertColor(COLOR_ARRAY["#757D47"]),
                "#ee82b8"
            );
        });
    });

    describe("hexToRgb()", () => {
        it("splits color correctly: black", () => {
            assert.deepEqual(
                Colors.hexToRgb("#000000"),
                COLOR_ARRAY.BLACK,
                "hex with # does not work"
            );
            assert.deepEqual(
                Colors.hexToRgb("000000"),
                COLOR_ARRAY.BLACK,
                "hex without # does not work"
            );
        });

        it("splits color correctly: white uppercase", () => {
            assert.deepEqual(
                Colors.hexToRgb("#FFFFFF"),
                COLOR_ARRAY.WHITE,
                "hex with # does not work"
            );
            assert.deepEqual(
                Colors.hexToRgb("FFFFFF"),
                COLOR_ARRAY.WHITE,
                "hex without # does not work"
            );
        });

        it("splits color correctly: white lowercase", () => {
            assert.deepEqual(
                Colors.hexToRgb("#ffffff"),
                COLOR_ARRAY.WHITE,
                "hex with # does not work"
            );
            assert.deepEqual(
                Colors.hexToRgb("ffffff"),
                COLOR_ARRAY.WHITE,
                "hex without # does not work"
            );
        });

        it("splits color correctly: #4f477D", () => {
            assert.deepEqual(
                Colors.hexToRgb("#4f477D"),
                COLOR_ARRAY["#4F477D"],
                "hex with # does not work"
            );
            assert.deepEqual(
                Colors.hexToRgb("4f477D"),
                COLOR_ARRAY["#4F477D"],
                "hex without # does not work"
            );
        });

        it("splits color correctly: #00feff", () => {
            assert.deepEqual(
                Colors.hexToRgb("#00feff"),
                COLOR_ARRAY["#00FEFF"],
                "hex with # does not work"
            );
            assert.deepEqual(
                Colors.hexToRgb("00feff"),
                COLOR_ARRAY["#00FEFF"],
                "hex without # does not work"
            );
        });

        it("split color fails for invalid values: obvious ones", () => {
            assert.strictEqual(Colors.hexToRgb("4"), null);
            assert.strictEqual(Colors.hexToRgb(null), null);
            assert.strictEqual(Colors.hexToRgb("#"), null);
        });

        it("split color fails for not supported three-letter colors", () => {
            assert.strictEqual(Colors.hexToRgb("#000"), null);
            assert.strictEqual(Colors.hexToRgb("000"), null);
            assert.strictEqual(Colors.hexToRgb("#123"), null);
            assert.strictEqual(Colors.hexToRgb("123"), null);
        });
    });
});
