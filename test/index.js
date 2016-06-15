var assert = require('chai').assert;
var sinon = require('sinon');

var debounce = require('../index').debounce;
var throttle = require('../index').throttle;

describe('Debounce', function() {
    var DELAY = 100;

    var ARG1 = 't';
    var ARG2 = 'e';
    var ARG3 = 's';
    var ARG4 = 't';

    var clock;
    var callback;
    var debounced;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        callback = sinon.stub();
        debounced = debounce(callback, DELAY);
    });

    afterEach(function() {
        clock.restore();
        callback = undefined;
        debounced = undefined;
    });

    it('should pass all the arguments to callback', function() {

        debounced(ARG1, ARG2, ARG3, ARG4);

        clock.tick(DELAY);

        assert.isOk(callback.calledWithExactly(ARG1, ARG2, ARG3, ARG4));

    });

    it('should not call callback immediately', function() {
        debounced();
        assert.isNotOk(callback.called);
    });

    it('should call callback after delay', function() {
        debounced();

        clock.tick(DELAY);

        assert.isOk(callback.calledOnce);
    });

    it('should delay callback call if called two times within delay interval', function() {
        debounced();
        clock.tick(DELAY - 1);

        debounced();
        clock.tick(DELAY - 1);

        assert.isNotOk(callback.called);

        clock.tick(1);
        assert.isOk(callback.calledOnce);
    });

    it('should call last callback, if called two times within delay interval', function() {
        debounced(ARG1);
        debounced(ARG2);
        clock.tick(DELAY);

        assert.isOk(callback.calledWithExactly(ARG2));
    });

});

describe('Throttle', function() {
    var DELAY = 100;

    var ARG1 = 't';
    var ARG2 = 'e';
    var ARG3 = 's';
    var ARG4 = 't';

    var clock;
    var callback;
    var debounced;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        callback = sinon.stub();
        throttled = throttle(callback, DELAY);
    });

    afterEach(function() {
        clock.restore();
        callback = undefined;
        throttled = undefined;
    });

    it('should pass all the arguments to callback', function() {

        throttled(ARG1, ARG2, ARG3, ARG4);

        clock.tick(DELAY);

        assert.isOk(callback.calledWithExactly(ARG1, ARG2, ARG3, ARG4));

    });

    it('should call callback immediately', function() {
        throttled();
        assert.isOk(callback.called);
    });

    it('should skip second callback call if called two times within delay interval', function() {
        throttled(ARG1);
        clock.tick(DELAY - 1);

        throttled(ARG2);

        assert.isOk(callback.calledOnce);
        assert.isOk(callback.calledWith(ARG1));
    });

    it('should call both callback if delay itnerval is expired', function() {
        throttled(ARG1);
        clock.tick(DELAY);

        throttled(ARG2);

        assert.isOk(callback.calledTwice);
    });

});
