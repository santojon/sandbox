// 'Imports'
with (SandConsoleService) {
    /**
     * Responsible to manage Editor dynamics
     */
    var EditorService = new Sgfd.Service({
        metaName: 'EditorService',
        /**
         * Function responsible to update resources on the update of editor
         * @param {required} editor: the editor to update
         * @param {required} code: the code to use in update
         */
        doOnEditorUpdate: (editor, code) => {
            // add code to download
            document.getElementById('btn-my').href =
                'data:application/octet-streamcharset=utf-8,' + encodeURIComponent(code)

            // update editor's code
            editor.text = code

            var realCode = code
            if (code && code !== '') {
                // manipulate code to match the sandConsole
                realCode = code.replace(/[^_]console/g, 'cons._console')
                realCode = 'try { ' + realCode + ' } catch (err) { cons._console.error(err) }'

                // update clean button
                document.getElementById('btn-clr-ed').disabled = false
                editor.isClean = false
            }

            // update console with code (it will run it!)
            updateConsole(realCode, editor.console)
        },
        /**
         * Function responsible to set editor to fullscreen
         * @param {required} editor: the editor to enlarge
         */
        setEditorToFullscreen: (editor) => {
            // self
            var me = document.getElementById('btn-full')
            var me_i = document.getElementById('btn-full-i')

            //
            // elements to expand
            //
            var h = document.getElementById('header')
            var con = document.getElementById('content')

            // editor
            var ed = document.getElementById(editor.elem.substr(1))

            // info panel
            var i = document.getElementById('i-text')

            // if is fullscreen (get all to the normal size)
            if (editor.isFull) {
                h.classList.add('container')
                con.classList.add('container')
                h.classList.remove('full')
                con.classList.remove('full')

                me.title = __('Expand panels')
                me.innerHTML = '<span class="glyphicon glyphicon-resize-full"></span>'
                me_i.title = __('Expand panels')
                me_i.innerHTML = '<span class="glyphicon glyphicon-resize-full"></span>'

                ed.style.height = '413px'
                i.style.height = '413px'
            } else {
                // otherwise (set all to fullscreem)
                h.classList.remove('container')
                con.classList.remove('container')
                h.classList.add('full')
                con.classList.add('full')

                me.title = __('Shrink panels')
                me.innerHTML = '<span class="glyphicon glyphicon-resize-small"></span>'
                me_i.title = __('Shrink panels')
                me_i.innerHTML = '<span class="glyphicon glyphicon-resize-small"></span>'

                var newH = (con.offsetHeight - 48).toString() + 'px'
                ed.style.height = newH
                i.style.height = newH
            }

            editor.isFull = !editor.isFull
        }
    })
}