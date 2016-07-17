var SandboxService = {
    /**
     * Function responsible to update resources on the update of editor
     */
    doOnUpdate: function(code, fst) {
        // button
        var b = '\
            <button id="clr-cons" class="btn btn-sm btn-default pull-right" title="Clear console">\
					<span class="glyphicon glyphicon-erase"></span>\
				</button>\
        ';

        // clear in the first run
        if (fst) {
            fst = false;
            document.getElementById('console').innerHTML = b;
        }

        // add code to download
        document.getElementById('btn-my').href =
            'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(code);

        var realCode = code.replace(/[^_]console/g, 'SandboxController._console');
        realCode = 'try { ' + realCode + ' } catch (err) { SandboxController._console.error(err); }';

        // process for console.log (if exists)
        var res = eval(realCode);

        // console data
        var cData = document.getElementById('console').innerHTML;

        // update console
        document.getElementById('console').innerHTML =
            document.getElementById('console').innerHTML +
                ((res !== undefined) ?
                    (((cData !== b) ? '<br>' : '') + '<span class="g"><b>$:</b></span>   ' + eval(realCode)) :
                    ''
                );

        SandboxService.setConsoleClearing();
        return SandboxService.fst;
    },
    /**
     * Set funcion of 'clear console' button
     */
    setConsoleClearing: function() {
        document.getElementById('clr-cons').onclick = function() {
            document.getElementById('console').innerHTML = '\
                <button id="clr-cons" class="btn btn-sm btn-default pull-right" title="Clear console">\
						<span class="glyphicon glyphicon-erase"></span>\
					</button>\
            ';
            SandboxService.fst = true;
        };
        return true;
    },
    fst: true
};