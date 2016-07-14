with (SandboxService) {
    var SandboxController = {
        /**
         * Create editor container
         */
        init: function(fst, lang) {
            // setupe editor
            var flask = new CodeFlask();
            flask.run('#editor', { language: lang || 'javascript' });

            // setup code runner
            flask.onUpdate(function(code) {
                SandboxController.fst = doOnUpdate(code, fst);
            });
            SandboxController.fst = fst;

            // init screen visuals and data
            SandboxController.initScreen(lang);

            // and highlight it
            Prism.highlightAll();

            return flask;
        },
        /**
         * Responsible to initialize and fill some data in page
         */
        initScreen: function(lang) {
            // setup Bhdr code visualization
            document.getElementById('bhdr-text').innerHTML =
                '<pre class="line-numbers"><code class="language-'
                    + (lang || 'js') + '">' + Bhdr + '</code></pre>';

            // Sandbox prop names
            document.getElementById('i-sand').innerHTML =
                    new Sandbox({
                        string: 's',
                        number: 0,
                        object: new Object(),
                        list: [],
                        boolean: true,
                        function: function() {}
                    }).getProps();
        },
        /**
         * Set funcion of 'clear console' button
         */
        setClearing: function() {
            setConsoleClearing();
        },
        /**
         * Function responsible to replace console.log
         */
        _console: {
            _c: function(thing, cls) {
                document.getElementById('console').innerHTML =
                    document.getElementById('console').innerHTML +
                        (SandboxController.fst ? '' : '<br>') +
                            '<span class="' + cls + '"><b>$:</b></span>   ' +
                                thing.toString()
                                    .replace(/SandboxController\._console/g, 'console')
                                        .replace(/_console/g, 'console');

                    SandboxController.fst = false;
            },
            log: function(thing) {
                console.log(thing);
                SandboxController._console._c(thing, 'b');
            },
            warn: function(thing) {
                console.warn(thing);
                SandboxController._console._c(thing, 'y');
            },
            error: function(thing) {
                console.error(thing);
                SandboxController._console._c(thing, 'r');
            }
        }
    };

    /**
     * Extras (for secretness etc.)
     */
     SandboxController._console.toString = function() {
         return '[object Console]';
     };

     SandboxController._console.log.toString = function() {
         return '[object Log]';
     };

     SandboxController._console.warn.toString = function() {
         return '[object Warning]';
     };

     SandboxController._console.error.toString = function() {
         return '[object Error]';
     };

     SandboxController.fst = true;
}