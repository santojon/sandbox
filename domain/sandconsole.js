// -----------------------------------------------
// Appends things into class
// -----------------------------------------------

/**
 * Responsible to preset the console
 */
SandConsole.prototype.init = function () {
    // console options
    var con = this

    // default text
    if (con.text) {
        document.getElementById(con.elem).innerHTML += con.text
        con.isClean = false
    }

    // pin btn
    if (con.pinBtn) {
        document.getElementById(con.elem).innerHTML += con.pinBtn
    }

    // downloadBtn
    if (con.downloadBtn) {
        document.getElementById(con.elem).innerHTML += con.downloadBtn
    }

    // clean btn
    if (con.cleanBtn) {
        document.getElementById(con.elem).innerHTML += con.cleanBtn
    }

    /**
     * Object responsible to replace window.console in this scope,
     * to show runned code results into in-page console
     */
    con._console = {
        /**
         * Responsible to fill the console with log, warning or error messages
         * @param {required} self: the console view itself
         * @param {required} thing: the code response to put into the console
         * @param {required} cls: the css class to apply to console log
         */
        _c: function (self, thing, cls) {
            var resultText =
                thing.toString()
                .replace(/cons\._console/g, 'console')
                .replace(/_console/g, 'console')

            document.getElementById(self.elem).innerHTML +=
                (self.isClean ? '' : '<br>') +
                '<span class="' + cls + '"><b>$:</b></span>   ' +
                resultText

            // set console as dirty
            self.isClean = false
            self.text += resultText + '\n'
        },
        /**
         * Responsible to console log messages
         * @param {required} thing: response to put into the console
         */
        log: function (thing) {
            console.log(thing)
            this._c(con, thing, 'b')
        },
        /**
         * Responsible to console warning messages
         * @param {required} thing: response to put into the console
         */
        warn: function (thing) {
            console.warn(thing)
            this._c(con, thing, 'y')
        },
        /**
         * Responsible to console error messages
         * @param {required} thing: response to put into the console
         */
        error: function (thing) {
            console.error(thing)
            this._c(con, thing, 'r')
        }
    }

    /**
     * Secretness extras (to respond as browser console)
     */
    this._console.toString = function () {
        return '[object Console]'
    }

    this._console.log.toString = function () {
        return 'function log() { [native code] }'
    }

    this._console.warn.toString = function () {
        return 'function warn() { [native code] }'
    }

    this._console.error.toString = function () {
        return 'function error() { [native code] }'
    }
}