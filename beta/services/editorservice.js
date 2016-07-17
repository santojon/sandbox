with (SandConsoleService) {
    var EditorService = {
        /**
         * Function responsible to update resources on the update of editor
         */
        doOnUpdate: function(editor, code) {
            // add code to download
            document.getElementById('btn-my').href =
                'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(code);

            // manipulate code to match the sandConsole
            var realCode = code.replace(/[^_]console/g, 'cons._console');
            realCode = 'try { ' + realCode + ' } catch (err) { cons._console.error(err); }';

            // update console with code (it will run it!)
            updateConsole(realCode, editor.console);
        }
    };
}