pages.Sandbox = function(params) {
    // Get all needed scopes (another js objects like controllers, services etc.)
    with (
        /**
         * The merge function in Base compiles all functions and attributes
         * in objects into a single one, used to 'import' into this file,
         * to use its functions and attribues as local ones
         */
        Base.merge(
            SandboxController,
            Utils
        )
    ) {
        // grant all is visible
        unhideAll();

        // but hide main lib code
        document.getElementById('bhdr-container').hidden = true;

        // initialize editor and things
        var editor = init();

        // set funcion of 'show code' button
        document.getElementById('btn-bhdr-doc').onclick = function() {
            var bhdrDiv = document.getElementById('bhdr-container');
            var me = document.getElementById('btn-bhdr-doc');

            if (bhdrDiv.hidden) {
                bhdrDiv.hidden = false;
                me.innerHTML = 'Hide Bhdr code';
            } else {
                bhdrDiv.hidden = true;
                me.innerHTML = 'Show Bhdr code';
            }
        };
    }
};