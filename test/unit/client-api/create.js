"use strict";

// const lambdaTester = require("lambda-tester");

const assert = require('chai').assert;
const api = require("../../../client-api/books/create").handler;

describe('CreatBook', function () {
    it('api should return success', function(){
        const testObj = {};
        let result = handler(testObj);
        assert.equal(result, 'success')
    });

    it('api should return string', function () {
        const testObj = {};
        let result = handler(testObj);
        assert.typeof(result, 'string');
    });
});
