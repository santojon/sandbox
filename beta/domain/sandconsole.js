// Create new class from Bwf definition
classLoader.create('SandConsole: {\
            name: string,\
		    elem: object,\
		    isPinned: boolean,\
		    isClean: boolean,\
		    text: string,\
		    cleanBtn: string,\
		    pinBtn: string\
        }');



/**
 * Responsible to preset the console
 */
SandConsole.prototype.init = function() {
    var con = this;

    // default text
    if (con.text) {
        con.elem.innerHTML += con.text;
        con.isClean = false;
    }

    // pin btn
    if (con.pinBtn) {
        con.elem.innerHTML += con.pinBtn;
    }

    // clean btn
    if (con.cleanBtn) {
        con.elem.innerHTML += con.cleanBtn;
    }

    /**
     * Object responsible to replace window.console in this scope
     */
    con._console = {
        /**
         * Responsible to fill the console with log, warning or error messages
         */
        _c: function(self, thing, cls) {
            self.elem.innerHTML +=
                (self.isClean ? '' : '<br>') +
                    '<span class="' + cls + '"><b>$:</b></span>   ' +
                        thing.toString()
                            .replace(/cons\._console/g, 'console')
                                .replace(/_console/g, 'console');

            // set console as dirty
            self.isClean = false;
        },
        log: function(thing) {
            console.log(thing);
            this._c(con, thing, 'b');
        },
        warn: function(thing) {
            console.warn(thing);
            this._c(con, thing, 'y');
        },
        error: function(thing) {
            console.error(thing);
            this._c(con, thing, 'r');
        }
    };

    /**
     * Extras (for secretness etc.)
     */
     this._console.toString = function() {
         return '[object Console]';
     };

     this._console.log.toString = function() {
         return 'function log() { [native code] }';
     };

     this._console.warn.toString = function() {
         return 'function warn() { [native code] }';
     };

     this._console.error.toString = function() {
         return 'function error() { [native code] }';
     };
};