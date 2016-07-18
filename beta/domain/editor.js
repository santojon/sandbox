// Create new class from Bwf definition
classLoader.create('Editor: {\
            name: string,\
            user: object,\
		    elem: string,\
		    flask: object,\
		    isFull: boolean,\
		    isClean: boolean,\
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

    if (ed.isClean) {
        document.getElementById(ed.elem.substr(1)).innerHTML = '';
    } else {
        document.getElementById(ed.elem.substr(1)).innerHTML = ed.text;
    }

    if (lang) {
        ed.flask.run(ed.elem, { language: lang });
    }

    if (onUpdate) {
        ed.flask.onUpdate(function(code) {
            onUpdate(code, params.user);
        });
    }
};