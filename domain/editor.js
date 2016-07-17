// Create new class from Bwf definition
classLoader.create('Editor: {\
            name: string,\
		    elem: string,\
		    flask: object,\
		    isFull: boolean,\
		    isClean: boolean,\
		    show: boolean,\
		    text: string,\
		    console: object\
        }');



Editor.prototype.init = function(lang, onUpdate, params) {
    var ed = this;

    if (params) {
        Object.keys(params).forEach(function(key) {
            ed[key] = params[key];
        });
    }

    if (ed.text && ed.text !== '') {
        document.getElementById(ed.elem.substr(1)).innerHTML = ed.text;
    }

    if (lang) {
        ed.flask.run(ed.elem, { language: lang });
    }

    if (onUpdate) {
        ed.flask.onUpdate(function(code) {
            onUpdate(code);
        });
    }
};