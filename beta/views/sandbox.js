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

        // the editor
        var editor = new Editor({
            name: 'defaultEditor',
            elem: '#editor',
            flask: new CodeFlask(),
            isFull: false,
            isClean: true,
            show: true,
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
    					</button>'
            })
        }).save();

        // init console and editor
        initTools(editor.console, editor, onEditorUpdate);

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

        // set funcion of 'expand' button
        document.getElementById('btn-full').onclick = function() {
            var me = document.getElementById('btn-full');
            var h = document.getElementById('header');
            var con = document.getElementById('content');

            var ed = document.getElementById(editor.elem.substr(1));
            var i = document.getElementById('i-container');
            var b = document.getElementById('bhdr-container');

            // if is fullscreen
            if (hasClass(h, 'full')) {
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

                var newH = con.offsetHeight.toString() + 'px';
                ed.style.height = newH;
                i.style.height = newH;
                b.style.height = newH;
            }
        };

        // set funcion of 'clear console' button
        setClearing(editor.console);

        // set funcion of 'clear console' button
        setPinning(editor.console);

        // grant all is visible
        unhideAll();

        // but hide main lib code and instructions (and loader)
        document.getElementById('bhdr-container').hidden = true;
        document.getElementById('i-container').hidden = true;
        document.getElementById('loader').hidden = true;
    }
};