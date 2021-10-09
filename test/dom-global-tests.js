var assert = require("assert");
var is = require("@sindresorhus/is");

var BlobPolyfill = require("../Blob.js");

require("jsdom-global")();

global.Blob = BlobPolyfill.Blob;
global.URL = BlobPolyfill.URL;

var structuredClone = require("realistic-structured-clone");

describe("blob-polyfill with DOM globals", function () {
    it("ArrayBuffer Blob can be structured-cloned, data can be recovered", function () {
        var testString = "Testing...";
        var arrayBuffer = stringToArrayBuffer(testString);
        var blob = new Blob([arrayBuffer]);
        var clonedBlob = structuredClone(blob);
        return clonedBlob.arrayBuffer().then(function (value) {
            var testStringRecovered = arrayBufferToString(value);
            assert.strictEqual(testString, testStringRecovered);
        });
    });

});

function stringToArrayBuffer(string) {
	const buf = new ArrayBuffer(string.length * 2); // 2 bytes for each char
	const bufView = new Uint16Array(buf);
	for (let i = 0, strLen = string.length; i < strLen; i++) {
		bufView[i] = string.charCodeAt(i);
	}
	return buf;
}

function arrayBufferToString(buffer) {
	const array = new Uint16Array(buffer);
	return String.fromCharCode.apply(null, array);
}
