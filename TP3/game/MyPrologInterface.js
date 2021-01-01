/**
 * Class that provides a conection between web scene and prolog logic
 */
class MyPrologInterface {
    constructor(port) {
        this.port = port || 8081;
    }

    getRequest(requestString, onError) {
        let request = new XMLHttpRequest();

        request.open('GET', 'http://localhost:' + this.port + '/' + requestString, true);

        /*request.onload = () => {
                //this.response = JSON.parse(request.responseText);
                this.responseReady = true;
                console.log(this.response);
                console.log("hello");

            }*/
        request.onload = function(data) { console.log("The request was successful. Reply: " + data.target.response); };

        request.onerror = onError || function() { console.log("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    /*parseStartPrologReply() {
        if (this.status === 400) {
            console.log("ERROR");
            return;
        }

        let responseArray = textStringToArray(data.target.response, true);

        console.log(responseArray);
    }

    startPrologGameError() {
        console.log("There was an error while passing the request");
    }*/

    hellofunc() {
        let fname = 'fabio';
        /*let lname = 'huang';
        let request = `hello_world(${fname},${lname})`;*/
        let request = 'a';
        this.getRequest(request);
    }
}