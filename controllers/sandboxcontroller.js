with (SandboxService) {
    var SandboxController = {
        /**
         * Create editor container
         */
        init: function(lang) {
            // setupe editor
            var flask = new CodeFlask();
            flask.run('#editor', { language: lang || 'javascript' });

            var fst = true;

            // setup code runner
            flask.onUpdate(function(code) {
                // add code to download
                document.getElementById('btn-my').href =
                    'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(code);

                // try to run it
                if (fst) {
                    fst = false;
                    document.getElementById('console').innerHTML = '<span class="y"><b>$:</b></span>   ' +
                        eval(code.replace(/console\.log/g, 'SandboxController._console'));
                } else {
                    document.getElementById('console').innerHTML =
                        document.getElementById('console').innerHTML + '<br>' +
                            '<span class="y"><b>$:</b></span>   ' +
                                eval(code.replace(/console\.log/g, 'SandboxController._console'));
                }
            });

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

            // and highlight it
            Prism.highlightAll();

            return flask;
        },
        /**
         * Function responsible to replace console.log
         */
        _console: function(thing) {
            console.log(thing);
            document.getElementById('console').innerHTML =
                document.getElementById('console').innerHTML + '<br>' +
                    '<span class="y"><b>$:</b></span>   ' + thing.toString();

            return thing.toString();
        }
    };
}