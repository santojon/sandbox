/**
 * The application container (default is 'this', or 'window')
 */
var appConfig = {
    front: {
        styles: ['measures', 'main', 'style', 'console'],
        externalStyles: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
            'https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css',
            'lib/dist/prism/themes/prism.css',
            'lib/dist/prism/plugins/line-numbers/prism-line-numbers.css',
            'lib/dist/codeflask/codeflask.css'
        ],
        externalScripts: [
            'https://code.jquery.com/jquery-2.2.3.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            'https://use.fontawesome.com/670555b458.js'
        ]
    },
    back: {
        bwfDomains: ['sandconsole', 'editor'],
        domainClasses: ['sandconsole', 'editor'],
        controllers: ['sandbox'],
        services: ['sandconsole', 'editor'],
        views: ['sandbox']
    },
    conf: {
        appName: 'Libs Sandbox',
        language: navigator.language || 'en-US',
        dependencies: [
            'lib/dist/norse/bwf.full.js',
            'lib/dist/norse/bhdr.js',
            'lib/dist/norse/frgg.js',
            'lib/dist/prism/prism.js',
            'lib/dist/prism/plugins/line-numbers/prism-line-numbers.min.js',
            'lib/dist/prism/components/prism-javascript.min.js',
            'lib/dist/codeflask/codeflask.js',
            'data/code.js'
        ],
        dataPool: 'Bhdr',
        classLoader: 'Bwf',
        pageLoader: 'Frgg',
        templates: true,
        session: true,
        bwfDomain: true,
        bootstrap: false,
        debug: {
            controllers: true,
            services: true,
            bridges: true
        },
        production: true
    }
}