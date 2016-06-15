module.exports = {
    debounce: function(callback, delay) {
        var timeoutId;

        return function() {
            var args = arguments;
            var timeoutCallback = function() {
                return callback.apply(this, args);
            };

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(timeoutCallback, delay);
        };
    },

    throttle: function(callback, delay) {
        var isWaiting = false;

        return function() {
            if(isWaiting) return false;

            callback.apply(this, arguments);

            isWaiting = true;
            setTimeout(function() { isWaiting = false; }, delay);

            return true;
        };
    }
};
