pages.Sandbox = function(params) {
    // Get all needed scopes (another js objects like controllers, services etc.)
    with (
        /**
         * The merge function in Base compiles all functions and attributes
         * in objects into a single one, used to 'import' into this file,
         * to use its functions and attribues as local ones
         */
        Base.merge(
            SandboxController,
            Utils
        )
    ) {
        // initialyze screen
        initScreen();

        var santojon = new User({ username: 'santojon' }).save();
        // the editor
        var editor = new Editor({
            user: santojon,
            name: 'defaultEditor',
            elem: '#editor',
            flask: new CodeFlask(),
            isFull: false,
            isClean: false,
            console: new SandConsole({
                name: 'defaultConsole',
                elem: document.getElementById('console'),
                isPinned: false,
                isClean: true,
                text: 'Runtime console (press any key in editor to run).',
                cleanBtn: '\
                    <button id="clr-cons" class="btn btn-sm btn-default pull-right m5" title="Clear console">\
    						<span class="glyphicon glyphicon-erase"></span>\
    					</button>',
                pinBtn: '<button id="pin-cons" class="btn btn-sm btn-default pull-right m5" title="Pin console">\
    						<span class="glyphicon glyphicon-pushpin"></span>\
    					</button>',
    			saveBtn: '<button id="save-cons" title="Save console text to server"\
							class="btn btn-sm btn-default pull-right m5">\
							<span class="fa fa-floppy-o"></span>\
						</button>',
				downloadBtn: '<a href="data:application/octet-stream;charset=utf-8,"\
					            download="console.txt" id="down-cons" title="Download console text"\
							class="btn btn-sm btn-default pull-right m5">\
							<span class="glyphicon glyphicon-download-alt"></span>\
						</a>'
            })
        }).save();

        // init console and editor
        initTools(editor, onEditorUpdate, santojon.username, editor.console);

        // set funcion of 'show code' button
        document.getElementById('btn-bhdr-doc').onclick = function() {
            var bhdrDiv = document.getElementById('bhdr-container');
            var me = document.getElementById('btn-bhdr-doc');

            var i = document.getElementById('i-container');
            var ed = document.getElementById('ed');

            if (!i.hidden) {
                document.getElementById('btn-doc').onclick();
            }

            if (bhdrDiv.hidden) {
                ed.hidden = true;

                bhdrDiv.hidden = false;
                me.title = 'Hide Bhdr code';
            } else {
                ed.hidden = false;

                bhdrDiv.hidden = true;
                me.title = 'Show Bhdr code';
            }
        };

        // set funcion of 'instructions' button
        document.getElementById('btn-doc').onclick = function() {
            var iDiv = document.getElementById('i-container');
            var me = document.getElementById('btn-doc');

            var bhdrDiv = document.getElementById('bhdr-container');
            var ed = document.getElementById('ed');

            if (!bhdrDiv.hidden) {
                document.getElementById('btn-bhdr-doc').onclick();
            }

            if (iDiv.hidden) {
                ed.hidden = true;

                iDiv.hidden = false;
                me.title = 'Hide Instructions';
            } else {
                ed.hidden = false;

                iDiv.hidden = true;
                me.title = 'Show Instructions';
            }
        };

        // set save button action
        document.getElementById('btn-save').onclick = function() {
            var me = document.getElementById('btn-save');
            saveFile(editor.text, 'santojon', 'code', me);
        };

        // set clear editor button action
        document.getElementById('btn-clr-ed').onclick = function() {
            document.getElementById('btn-clr-ed').disabled = true;
            editor.isClean = true;
            editor.flask = new CodeFlask();
            initTools(editor, onEditorUpdate, santojon.username);
        };

        // set funcion of 'expand' button
        document.getElementById('btn-full').onclick = function() {
            var me = document.getElementById('btn-full');
            var h = document.getElementById('header');
            var con = document.getElementById('content');

            var ed = document.getElementById(editor.elem.substr(1));
            var i = document.getElementById('i-text');
            var b = document.getElementById('bhdr-text');

            // if is fullscreen
            if (editor.isFull) {
                h.classList.remove('full');
                con.classList.remove('full');

                me.title = 'Expand panels';
                me.innerHTML = '<span class="glyphicon glyphicon-resize-full"></span>';

                ed.style.height = '390px';
                i.style.height = '390px';
                b.style.height = '390px';
            } else {
                // otherwise
                h.classList.add('full');
                con.classList.add('full');

                me.title = 'Shrink panels';
                me.innerHTML = '<span class="glyphicon glyphicon-resize-small"></span>';

                var newH = (con.offsetHeight - 48).toString() + 'px';
                ed.style.height = newH;
                i.style.height = newH;
                b.style.height = newH;
            }

            editor.isFull = !editor.isFull;
        };

        // test
        document.getElementById('btn-full').onclick();
        document.getElementById('btn-full').onclick();

        // set funcion of 'clear console' button
        setClearing(editor.console);

        // set funcion of 'clear console' button
        setPinning(editor.console);

        // set data saving for console
        setConsoleDataSaving(editor.console, santojon.username);

        // grant all is visible
        unhideAll();

        // but hide main lib code and instructions (and loader)
        document.getElementById('bhdr-container').hidden = true;
        document.getElementById('i-container').hidden = true;
        document.getElementById('loader').hidden = true;
    }
};