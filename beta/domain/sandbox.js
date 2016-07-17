// Create new class from Bwf definition
classLoader.create('Sandbox: {\
		    string: string,\
		    object: object,\
		    list: list,\
		    number: number,\
		    boolean: boolean,\
		    function: function\
        }');



// -----------------------------------------------
// Appends things into class
// -----------------------------------------------

/**
 * Function responsible to create HTML text for a Sandbox
 */
Sandbox.prototype.getProps = function() {
	var db = this;
	var htmlStr = '<ul>';

	Object.keys(db).forEach(
		function(key) {
			htmlStr = htmlStr + '<li><code>' + key + '</code></li>';
		}
	);

	return htmlStr + '</ul>';
};