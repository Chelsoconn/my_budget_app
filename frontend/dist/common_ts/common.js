export default class Helpers {
    sessionDataMessage(message) {
        fetch('http://localhost:4567/session_data', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => {
            return response.json();
        })
            .then(response => {
            let mess = document.getElementById(message);
            console.log(response.message);
            mess.innerHTML = response.message;
        })
            .catch((err) => {
            return `Error accessing session data: ${err}`;
        });
    }
}
//# sourceMappingURL=common.js.map