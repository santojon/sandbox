/**
 * The behaviour description for Sandbox page
 * @param params: params object used to load different sandbox things
 */
pages.Sandbox = (params) => {
    // Get all needed scopes (another js objects like controllers, services etc.)
    with (SandboxController) {
        // initialyze code highlighting
        Prism.highlightAll()

        // instantiating the editor
        var editor = new Editor({
            name: 'defaultEditor',
            elem: '#editor',
            flask: new CodeFlask(),
            isFull: false,
            isClean: false,
            console: new SandConsole({
                name: 'defaultConsole',
                elem: 'console',
                isPinned: false,
                isClean: true,
                text: __('Runtime console (press any key in editor to run).'),
                cleanBtn: '\
                        <button id="clr-cons" class="btn btn-sm btn-default pull-right m5" title="' + __('Clear console') + '">\
        						<span class="fa fa-trash"></span>\
        					</button>',
                pinBtn: '<button id="pin-cons" class="btn btn-sm btn-default pull-right m5" title="' + __('Pin console') + '">\
        						<span class="glyphicon glyphicon-pushpin"></span>\
        					</button>',
                downloadBtn: '<a href="data:application/octet-streamcharset=utf-8,"\
    					            download="console.txt" id="down-cons" title="' + __('Download console text') + '"\
    							class="btn btn-sm btn-default pull-right m5">\
    							<span class="glyphicon glyphicon-download-alt"></span>\
    						</a>'
            })
        }).save()

        // init console and editor
        initTools(editor, onEditorUpdate, editor.console)

        // set funcion of 'instructions' button
        document.getElementById('btn-doc').onclick = function () {
            // info div
            var iDiv = document.getElementById('i-container')

            // this button
            var me = document.getElementById('btn-doc')

            // editor div
            var ed = document.getElementById('ed')

            // show instructions and hide editor
            if (iDiv.hidden) {
                ed.hidden = true

                iDiv.hidden = false
                me.title = __('Hide Instructions')
            } else {
                // show editor and hide instructions
                ed.hidden = false

                iDiv.hidden = true
                me.title = __('Show Instructions')
            }
        }

        // set clear editor button action
        document.getElementById('btn-clr-ed').onclick = function () {
            // disable button after clear
            document.getElementById('btn-clr-ed').disabled = true

            // set editor to clean
            editor.isClean = true

            // reset the editor and re-initialyze it
            editor.flask = new CodeFlask()
            initTools(editor, onEditorUpdate)
        }

        // set function of 'fullscreen' buttons
        setEnlarge(editor)

        // set funcion of 'clear console' button
        setClearing(editor.console)

        // set funcion of 'pin console' button
        setPinning(editor.console)

        // hide main instructions (and loader)
        document.getElementById('i-container').hidden = true
        // document.getElementById('loader').hidden = true
    }
}