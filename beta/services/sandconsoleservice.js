with (
    Base.merge(
        SandboxService,
        PhpbridgeService
    )
) {
    var SandConsoleService = {
        /**
         * Update the console with the evaluation of current code in editor
         */
        updateConsole: function(code, cons, usr) {
            with (SandConsoleService) {
                // clean the console
                cleanConsole(cons);

                // run the code
                runCode(code, cons);

                // update console buttons events
                setConsoleClearing(cons, usr);
                setConsolePinning(cons);
                // update down and save buttons actions
                setConsoleDataSaving(cons, usr);

                // save status to database
                saveStatus(usr);
            }
        },
        /**
         * Clean the console
         */
        cleanConsole: function(cons) {
            cons.elem.innerHTML = cons.pinBtn + cons.saveBtn + cons.downloadBtn + cons.cleanBtn;
            SandConsoleService.updatePinBt(document.getElementById('pin-cons'), cons);
            cons.isClean = true;
            cons.text = '';
        },
        /**
         * Run code in a console
         */
        runCode: function(code, cons) {
            // process for console.log (if exists)
            var res = eval(code);

            // update console
            cons.elem.innerHTML +=
                ((res !== undefined) ?
                    (((cons.isClean) ? '' : '<br>') + '<span class="g"><b>$:</b></span>   ' + res) :
                    ''
                );

            // set console as dirty
            cons.isClean = false;
            cons.text += res + '\n';
        },
        /**
         * Set funcion of 'clear console' button
         */
        setConsoleClearing: function(cons, usr) {
            document.getElementById('clr-cons').onclick = function() {
                cons.elem.innerHTML = cons.pinBtn + cons.saveBtn + cons.downloadBtn;
                var pinBt = document.getElementById('pin-cons');

                SandConsoleService.updatePinBt(pinBt, cons);
                cons.isClean = true;
                cons.text = '';

                // update pin button action
                SandConsoleService.setConsolePinning(cons);

                // update down and save buttons actions
                SandConsoleService.setConsoleDataSaving(cons, usr);
            };
        },
        /**
         * Set the download and save console buttons actions
         */
        setConsoleDataSaving: function(cons, usr) {
            document.getElementById('save-cons').onclick = function() {
                var me = document.getElementById('save-cons');
                saveFile(cons.text, usr, 'console', me);
            };

            // add console text to download
            document.getElementById('down-cons').href =
                'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(cons.text);
        },
        /**
         * Set the 'pin console' buttom action
         */
        setConsolePinning: function(cons) {
            // pin console button action
            document.getElementById('pin-cons').onclick = function() {
                var pinBt = this;

                if (cons.isPinned) {
                    cons.elem.classList.add('form-control');
                    cons.elem.parentNode.classList.add('container');
                } else {
                    cons.elem.classList.remove('form-control');
                    cons.elem.parentNode.classList.remove('container');
                }
                cons.isPinned = !cons.isPinned;

                SandConsoleService.updatePinBt(pinBt, cons);
            };
        },
        /**
         * Update 'pin console' button status
         */
         updatePinBt: function(pinBt, cons) {
            if (cons.isPinned) {
                pinBt.classList.remove('btn-default');
                pinBt.classList.add('btn-primary');
                pinBt.innerHTML = '<span class="fa fa-thumb-tack"></span>';
                pinBt.title = 'Unpin console';
            } else {
                pinBt.classList.remove('btn-primary');
                pinBt.classList.add('btn-default');
                pinBt.innerHTML = '<span class="glyphicon glyphicon-pushpin"></span>';
                pinBt.title = 'Pin console';
            }
         }
    };
}