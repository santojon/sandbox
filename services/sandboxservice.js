with (PhpbridgeService) {
    var SandboxService = {
        /**
         * Save actual status of editor and embedded console
         */
        saveStatus: function(usr) {
            var editors = Editor.findBy({ user: User.find({ username: usr }) });
            var last = editors[editors.count() - 1];

            editors.forEach(function(ed) {
                ed.delete();
            });

            last.save();
            dump(dataPool.exportAs('json'));
        }
    };
}