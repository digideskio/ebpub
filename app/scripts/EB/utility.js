'use strict';

var EB = EB || {
    App: {}
};


EB.util = (function () {

    var namespace = function (nsName) {
        var parts = nsName.split('.'),
                parent = EB,
                i;

        // strip leading global
        if (parts[0] === 'EB') {
            parts = parts.slice(1);
        }

        for (i = 0; i < parts.length; i += 1) {
            // create a property if it doesn't exist
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    return {
        namespace: namespace
    };

})();