/**
 * Class that provides a conection between web scene and prolog logic
 */
class MyPrologInterface {
    constructor(port){
        this.port = port || 8081;
    }

    getRequest(requestString, onSuccess, onError){
        var request = new XMLHttpRequest();

        request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

        request.onload = onSuccess || this.parseStartPrologReply();
		request.onerror = onError || this.startPrologGameError();

        request.setRequestHeader("Content-type", "application/x-www-formurlencoded; charset=UTF-8");
        request.send();
    }

    parseStartPrologReply(){
        if (this.status === 400) {
            console.log("ERROR");
            return;
        }
            
        let responseArray = textStringToArray(data.target.response, true);

        console.log(responseArray);
    }

    startPrologGameError(){
        console.log("There was an error while executing the request");
    }
}
