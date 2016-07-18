pages.Login = function(params) {
    // Get all needed scopes (another js objects like controllers, services etc.)
    with (Utils) {
        // hide All elements in screen
        Object.keys(pages).forEach(function(page) {
            document.getElementById(page).classList.add('hidden');
        });

        if (params && params.user) {
            pages.Sandbox({ user: params.user });
        } else {
            document.getElementById('login-btn').onclick = function() {
                pages.Sandbox({
                    user: User.find({
                        username: document.getElementById('login-usr').value
                    }) || new User({ username: document.getElementById('login-usr').value }).save()
                });
            }

            // grant all is visible
            document.getElementById('Login').classList.remove('hidden');
        }
    }
};