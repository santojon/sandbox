with (
    Base.merge(
        SandConsoleService,
        SandboxService,
        EditorService,
        PhpbridgeService
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
        initTools: function(editor, doOnUpdate, usr, sandConsole) {
            // init console
            if (sandConsole) sandConsole.init();

            // init editor
            if (editor && doOnUpdate) {
                editor.init(
                    'javascript',
                    doOnUpdate,
                    {
                        user: User.find({ username: usr }),
                        isFull: editor.isFull,
                        isClean: editor.isClean,
                        text: (editor.isClean ? '' : editor.text) || defCode.asString()
                    }
                );

                // add code to download
                document.getElementById('btn-my').href =
                    'data:application/octet-stream;charset=utf-8,'
                        + encodeURIComponent(defCode.asString());
            }

            dump(dataPool.exportAs('json'));
        },
        /**
         * Do when editor updates
         */
        onEditorUpdate: function(code, usr) {
            doOnUpdate(Editor.find({ user: usr }), code, usr);
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
        },
        /**
         * Set data saving for console
         */
        setConsoleDataSaving: function(cons, usr) {
            setConsoleDataSaving(cons, usr);
        },
        /**
         * Save to server via PHP
         */
        saveFile: function(code, usr, type, bt) {
            saveFile(code, usr, type, bt);
        }
    };
}