// Map class to 'database'
dataPool.map(User);
dataPool.map(Sandbox);
dataPool.map(Editor);
dataPool.map(SandConsole);



/**
 * Map paths to bridges
 */

// PHP bridge
var Php_bridge = {
    type: 'php',
    base: 'data/php_bridge',
    paths: {
        save: 'save',
        dump: 'dump'
    },
    bridgeTo: function(to) {
        with (Php_bridge) {
            return base + '/' + paths[to] + '.' + type;
        }
    }
};