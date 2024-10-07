"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:4567/');
    request.addEventListener('load', function (event) {
        console.log(request.response);
    });
    request.addEventListener('error', function () { return [
        console.log('error')
    ]; });
    request.send();
});
//# sourceMappingURL=login.js.map