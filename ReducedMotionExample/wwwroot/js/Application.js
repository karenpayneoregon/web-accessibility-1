var $Application = $Application || {};
$Application = function () {
    const motionKey = 'useReduceMotion';
    var supportsLocalStorage = function () {
        return typeof (Storage) !== "undefined";
    };
    var setMotion = function (value) {
        if (!supportsLocalStorage()) {
            return false;
        }
        localStorage.setItem(motionKey, value);
        return true;
    };

    var getMotion = function () {
        if (localStorage.getItem(motionKey) === null) {
            localStorage.setItem(motionKey, false);
        }

        return localStorage.getItem(motionKey).toLowerCase() === 'true';

    };

    var prefersReducedMotion = function () {
        const results = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Check if the media query matches or is not available.
        return !results || results.matches;
    }

    return {
        setMotion: setMotion,
        getMotion: getMotion,
        prefersReducedMotion: prefersReducedMotion
    };
}();