var throttle = function(fn, delay) {
    var timer = null;
    var delay = delay || 500;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    };
};

module.exports = throttle;
