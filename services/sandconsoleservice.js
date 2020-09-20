/**
 * Responsible to manage the console and run editor given code
 */
var SandConsoleService = new Sgfd.Service({
    metaName: 'SandConsoleService',
    /**
     * Update the console with the evaluation of current code in editor
     * @param {required} code: the code to run and evaluate to console
     * @param {required} cons: the console to show the evaluation
     */
    updateConsole: (code, cons) => {
        with (SandConsoleService) {
            // clean the console
            cleanConsole(cons)

            // run the code
            runCode(code, cons)

            // update console buttons events
            setConsoleClearing(cons)
            setConsolePinning(cons)

            // update download button action
            setConsoleDataSaving(cons)
        }
    },
    /**
     * Clean the console
     * @param {required} cons: the console to clean
     */
    cleanConsole: (cons) => {
        // set the buttons to show
        document.getElementById(cons.elem).innerHTML =
            cons.pinBtn + cons.downloadBtn + cons.cleanBtn
        SandConsoleService.updatePinBtn(document.getElementById('pin-cons'), cons)
        cons.isClean = true
        cons.text = ''
    },
    /**
     * Run code in a console
     * @param {required} code: the code to run
     * @param {required} cons: the console to put the results
     */
    runCode: (code, cons) => {
        // process for console.log (if exists)
        var res = eval(code)

        // update console
        document.getElementById(cons.elem).innerHTML +=
            ((res !== undefined) ?
                ((cons.isClean ? '' : '<br>') + '<span class="g"><b>$:</b></span>   ' + res) :
                ''
            )

        // set console as dirty
        cons.isClean = false
        cons.text += res + '\n'
    },
    /**
     * Set funcion of 'clear console' button
     * @param {required} cons: the console to setup
     */
    setConsoleClearing: (cons) => {
        // set the buttons to show
        document.getElementById('clr-cons').onclick = () => {
            document.getElementById(cons.elem).innerHTML =
                cons.pinBtn + cons.downloadBtn
            var pinBt = document.getElementById('pin-cons')

            // update pin button
            SandConsoleService.updatePinBtn(pinBt, cons)
            cons.isClean = true
            cons.text = ''

            // update pin button action
            SandConsoleService.setConsolePinning(cons)

            // update download button action
            SandConsoleService.setConsoleDataSaving(cons)
        }
    },
    /**
     * Set the download console button action
     * @param {required} cons: the console to setup
     */
    setConsoleDataSaving: (cons) => {
        // add console text to download
        document.getElementById('down-cons').href =
            'data:application/octet-streamcharset=utf-8,' + encodeURIComponent(cons.text)
    },
    /**
     * Set the 'pin console' buttom action
     * @param {required} cons: the console to setup
     */
    setConsolePinning: (cons) => {
        var pinFunction = () => {
            // unpin it
            if (cons.isPinned) {
                document.getElementById(cons.elem).classList.remove('console-full')
                document.getElementById(cons.elem).parentNode.classList.add('container')
            } else {
                // pin it
                document.getElementById(cons.elem).classList.add('console-full')
                document.getElementById(cons.elem).parentNode.classList.remove('container')
            }
            cons.isPinned = !cons.isPinned

            // update console pinning in screen
            SandConsoleService.updatePinBtn(document.getElementById('pin-cons'), cons)
        }

        var dragbarFunction = () => {
            if (cons.isOverlay) {
                document.getElementById(cons.elem).classList.remove('overlay')
            } else {
                document.getElementById(cons.elem).classList.add('overlay')
            }
            cons.isOverlay = !cons.isOverlay

            // update console pinning in screen
            SandConsoleService.updatePinBtn(document.getElementById('pin-cons'), cons)

            // update console draging in screen
            SandConsoleService.updateDragbar(document.getElementById('dragbar'), cons)
        }

        // pin console button and dragbar action
        document.getElementById('pin-cons').onclick = pinFunction
        document.getElementById('dragbar').onclick = dragbarFunction
    },
    /**
     * Update 'pin console' button status
     * @param {required} pinBt: the pin button on screen
     * @param {required} cons: console to pin
     */
    updatePinBtn: (pinBt, cons) => {
        // change button on pinned console
        if (cons.isPinned) {
            pinBt.classList.remove('btn-default')
            pinBt.classList.add('btn-primary')
            pinBt.innerHTML = '<span class="fa fa-thumb-tack"></span>'
            pinBt.title = __('Unpin console')
        } else {
            // change button on unpinned console
            pinBt.classList.remove('btn-primary')
            pinBt.classList.add('btn-default')
            pinBt.innerHTML = '<span class="glyphicon glyphicon-pushpin"></span>'
            pinBt.title = __('Pin console')
        }
    },

    /**
     * Update 'dragbar' status
     * @param {required} dragbar: the dragbar on screen
     * @param {required} cons: console to pin
     */
    updateDragbar: (dragbar, cons) => {
        // change dragbar location
        if (cons.isOverlay) {
            dragbar.classList.add('dragbar-overlay')
        } else {
            dragbar.classList.remove('dragbar-overlay')
        }
    }
})