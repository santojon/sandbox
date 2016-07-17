with (
    Base.merge(
        SandConsoleService,
        SandboxService,
        EditorService
    )
) {
    var SandboxController = {
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

            // and highlight it all
            Prism.highlightAll();
        },
        /**
         * Initialize editor and console
         */
        initTools: function(sandConsole, editor, doOnUpdate) {
            // init console
            if (sandConsole) sandConsole.init();

            // init editor
            if (editor && doOnUpdate) {
                editor.init(
                    'javascript',
                    doOnUpdate,
                    {
                        isFull: editor.isFull,
                        text: defCode.asString()
                    }
                );

                // add code to download
                document.getElementById('btn-my').href =
                    'data:application/octet-stream;charset=utf-8,'
                        + encodeURIComponent(defCode.asString());
            }
        },
        /**
         * Do when editor updates
         */
        onEditorUpdate: function(code) {
            doOnUpdate(Editor.find({ name: 'defaultEditor' }), code);
        },
        /**
         * Set the clear console button action
         */
        setClearing: function(cons) {
            setConsoleClearing(cons);
        },
        /**
         * Set the pin console button action
         */
        setPinning: function(cons) {
            setConsolePinning(cons);
        }
    };
}