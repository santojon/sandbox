with (PhpbridgeService) {
    var SandboxService = {
        /**
         * Save actual status of editor and embedded console
         */
        saveStatus: function(usr) {
            Editor.find({ user: User.find({ username: usr }) }).delete().save();
            dump(dataPool.exportAs('json'));
        }
    };
}