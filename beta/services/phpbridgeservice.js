var PhpbridgeService = {
    /**
     * Saves text to file in server
     */
    saveText: function(text, bt) {
        // create form to do post
        var data = new FormData();

        // append text
        data.append('text' , text);

        // create, build and send request
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                bt.title = 'Saved!';
                bt.disabled = true;
            }
        }

        xhr.open(
            'post',
            Php_bridge.bridgeTo('save'),
            true
        );

        xhr.send(data);
     }
};