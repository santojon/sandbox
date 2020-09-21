// 'Imports'
with (
Sgfd.Base.merge(
    SandConsoleService,
    EditorService
)
) {
    /**
     * Controller responsible to link Sandbox view to services
     */
    var SandboxController = new Sgfd.Controller({
        metaName: 'SandboxController',
        /**
         * Initialize editor and console
         * @param {required} editor: the editor to initialyze
         * @param {required} doOnUpdate: editor update function
         * @param {optional} sandConsole: the editor console to initialyze
         */
        initTools: (editor, doOnUpdate, sandConsole) => {
            // init console
            if (sandConsole) sandConsole.init()

            // init editor
            if (editor && doOnUpdate) {
                editor.init(
                    'javascript',
                    doOnUpdate, {
                    isFull: editor.isFull,
                    isClean: editor.isClean,
                    text: (editor.isClean ? '' : ((editor.text != '') ? editor.text : defCode.asString()))
                }
                )

                // add code to download
                document.getElementById('btn-my').href =
                    'data:application/octet-streamcharset=utf-8,' +
                    encodeURIComponent(defCode.asString())
            }
        },
        /**
         * Do when editor updates
         * @param {required} code: code to update in the editor
         */
        onEditorUpdate: (code) => {
            doOnEditorUpdate(Editor.get(1), code)
        },
        /**
         * Set the clear console button action
         * @param {required} cons: the console to clear
         */
        setClearing: (cons) => {
            setConsoleClearing(cons)
        },
        /**
         * Set the pin console button action
         * @param {required} cons: the console to pin
         */
        setPinning: (cons) => {
            setConsolePinning(cons)
        },
        /**
         * Set the 'fullscreeen' buttons action
         * @param {required} editor: the editor to enlarge to fullscreen
         */
        setEnlarge: (editor) => {
            // set funcion of 'expand' button of the editor
            document.getElementById('btn-full').onclick = function () {
                setEditorToFullscreen(editor)
            }

            // set funcion of 'expand' button of the info panel
            document.getElementById('btn-full-i').onclick = function () {
                setEditorToFullscreen(editor)
            }

            var dragbarFunction = () => {
                if (editor.isOverlay) {
                    $(editor.elem).removeClass('overlay')
                } else {
                    $(editor.elem).addClass('overlay')
                }
                editor.isOverlay = !editor.isOverlay

                SandboxController.updateDragbar(document.getElementById('ed-dragbar'), editor)
            }
            document.getElementById('ed-dragbar').onclick = dragbarFunction
        },

        /**
         * Update 'dragbar' status
         * @param {required} dragbar: the dragbar on screen
         * @param {required} editor: editor to pin
         */
        updateDragbar: (dragbar, editor) => {
            console.log(dragbar)
            // change dragbar location
            if (editor.isOverlay) {
                dragbar.classList.add('dragbar-overlay')
                dragbar.title = __('Reduce editor')
            } else {
                dragbar.classList.remove('dragbar-overlay')
                dragbar.title = __('Enlarge editor')
            }
        }
    })
}