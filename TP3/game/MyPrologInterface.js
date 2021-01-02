/**
 * Class that provides a conection between web scene and prolog logic
 */
class MyPrologInterface {
    constructor(port) {
        this.port = port || 8081;

    }

    getRequest(requestString, onError) {
        let request = new XMLHttpRequest();
        this.response = "";

        request.open('GET', 'http://localhost:' + this.port + '/' + requestString, false);

        request.onload = () => {
            this.response = request.responseText;
        }
        request.onerror = onError || function() { console.log("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    loadState(request) {
        this.getRequest(request);
        return this.response;

    }
}