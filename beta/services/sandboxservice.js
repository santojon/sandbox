var SandboxService = {
    /**
     * Save actual status of editor and embedded console
     */
    saveStatus: function() {
        Editor.find({ name: 'defaultEditor' }).save();
    }
};