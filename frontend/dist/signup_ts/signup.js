"use strict";
function errorMessage(username, password) {
    return 'wrong username/password';
}
function correctSignin(username, password) {
    return correctFormatUsername(username) && correctFormatPassword(password);
}
function correctFormatUsername(username) {
    var regex = /^(?=.*[A-Z])(?!.*\s)(?!.*[\W])[A-Za-z0-9_]{6,50}$/;
    return regex.test(username);
}
function correctFormatPassword(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s)[A-Za-z\d\W_]{6,50}$/;
    return regex.test(password);
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var username = formData.get('username');
        var password = formData.get('password_digest');
        console.log('Username:', username);
        console.log('Password:', password);
        if (correctSignin(username, password)) {
            var request_1 = new XMLHttpRequest();
            request_1.open('POST', 'http://localhost:4567/signup');
            request_1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request_1.setRequestHeader('Access-Control-Allow-Origin', '*');
            request_1.setRequestHeader('Origin', 'http://localhost:8080');
            request_1.addEventListener('load', function () {
                console.log('success');
            });
            request_1.addEventListener('error', function () {
                console.error("Error during the request: \n        Status: ".concat(request_1.status, ", \n        Status Text: ").concat(request_1.statusText, ", \n        Response: ").concat(request_1.responseText));
            });
            request_1.send(formData);
        }
        else {
            document.getElementById('message').innerHTML = errorMessage(username, password);
        }
    });
});
//# sourceMappingURL=signup.js.map