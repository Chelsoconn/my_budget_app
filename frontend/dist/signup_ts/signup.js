"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function checkUserIsUnique() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resp = yield fetch('http://localhost:4567/users', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            if (!resp.ok) {
                throw new Error(`Error: ${resp.status} ${resp.statusText}`);
            }
            const data = yield resp.json();
            return data;
        }
        catch (error) {
            return 'Error fetching users';
        }
        ;
    });
}
function postNewUser(formData) {
    document.getElementById('password_message').innerHTML = '';
    document.getElementById('user_message').innerHTML = '';
    fetch('http://localhost:4567/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    })
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    })
        .then(response => {
        console.log(response.message);
        window.location.href = "/index.html";
        // method
        // waits for the new content to lead
        // grabs the message div node
        // adds the message to the node text content
    })
        .catch(error => {
        console.error(`Error during the request: ${error.message}`);
    });
}
function usernameIsUnique(user, username) {
    return !user.includes(username);
}
function correctSignin(username, password) {
    return correctFormatUsername(username) && correctFormatPassword(password);
}
function correctFormatUsername(username) {
    const regex = /^(?=.*[A-Z])(?!.*\s)(?!.*[\W])[A-Za-z0-9_]{6,50}$/;
    return regex.test(username);
}
function correctFormatPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s)[A-Za-z\d\W_]{6,50}$/;
    return regex.test(password);
}
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password_digest');
        console.log('Username:', username); //delete this when done with this page
        console.log('Password:', password); //delete this when done with this page
        let user = yield checkUserIsUnique();
        usernameIsUnique(user, username);
        if (correctSignin(username, password) && usernameIsUnique(user, username)) {
            postNewUser(formData);
        }
        else {
            let user_message = '';
            let password_message = '';
            if (!correctFormatUsername(username)) {
                document.getElementById('username').value = '';
                user_message += 'The username must between 6-50 characters and include at least one uppercase letter and can only consist of letters, numbers, and underscores (_).  ';
            }
            if (!correctFormatPassword(password)) {
                document.getElementById('password_digest').value = '';
                password_message += 'The password must between 6-50 characters and include at least one uppercase letter, one number, and one special character.  ';
            }
            if (!usernameIsUnique(user, username)) {
                document.getElementById('username').value = '';
                user_message += 'This username is already in use';
            }
            document.getElementById('password_message').innerHTML = password_message;
            document.getElementById('user_message').innerHTML = user_message;
        }
    }));
});
//# sourceMappingURL=signup.js.map