with (SandboxService) {
    var SandConsoleService = {
        /**
         * Update the console with the evaluation of current code in editor
         */
        updateConsole: function(code, cons) {
            with (SandConsoleService) {
                // clean the console
                cleanConsole(cons);

                // run the code
                runCode(code, cons);

                // update console buttons events
                setConsoleClearing(cons);
                setConsolePinning(cons);

                // save status to database
                saveStatus();
            }
        },
        /**
         * Clean the console
         */
        cleanConsole: function(cons) {
            cons.elem.innerHTML = cons.pinBtn + cons.cleanBtn;
            SandConsoleService.updatePinBt(document.getElementById('pin-cons'), cons);
            cons.isClean = true;
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
                    (((cons.isClean) ? '' : '<br>') + '<span class="g"><b>$:</b></span>   ' + eval(code)) :
                    ''
                );

            // set console as dirty
            cons.isClean = false;
        },
        /**
         * Set funcion of 'clear console' button
         */
        setConsoleClearing: function(cons) {
            document.getElementById('clr-cons').onclick = function() {
                cons.elem.innerHTML = cons.pinBtn;
                var pinBt = document.getElementById('pin-cons');

                SandConsoleService.updatePinBt(pinBt, cons);
                cons.isClean = true;

                // update pin buttom action
                SandConsoleService.setConsolePinning(cons);
            };
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
         *Update 'pin console' button status
         */
         updatePinBt: function(pinBt, cons) {
            if (cons.isPinned) {
                pinBt.classList.remove('btn-default');
                pinBt.classList.add('btn-primary');
                pinBt.title = 'Unpin console';
            } else {
                pinBt.classList.remove('btn-primary');
                pinBt.classList.add('btn-default');
                pinBt.title = 'Pin console';
            }
         }
    };
}