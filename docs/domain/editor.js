// -----------------------------------------------
// Appends things into class
// -----------------------------------------------

/**
 * Initialyze the editor in view
 * @param {required} lang: the language of the editor
 * @param {optional} onUpdate: the update editor function (to run every time editor updates)
 * @param {optional} params: user-given editor options
 */
Editor.prototype.init = function (lang, onUpdate, params) {
    // editor options
    var ed = this

    // put params into options
    if (params) {
        Object.keys(params).forEach((key) => {
            ed[key] = params[key]
        })
    }

    // verify editor params to setup the views
    if (ed.isClean) {
        document.getElementById(ed.elem.substr(1)).innerHTML = ''
    } else {
        document.getElementById(ed.elem.substr(1)).innerHTML = ed.text
    }

    // setup editor programming language
    ed.flask.run(ed.elem, {
        language: lang
    })

    // setup event of updating editor content to trigger actions
    if (onUpdate) {
        ed.flask.onUpdate((code) => {
            onUpdate(code)
        })
    }
}