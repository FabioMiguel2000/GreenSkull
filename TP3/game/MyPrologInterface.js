/**
 * Class that provides a conection between web scene and prolog logic
 */
class MyPrologInterface {
    constructor(port){
        this.port = port || 8081;
    }

    getRequest(){
        let requestString = 'playFieldsOfAction('+list+')';
        let request = new MyXMLHttpRequest(this);

        request.addEventListener("load", this.parseStartPrologReply);
        request.addEventListener("error", this.startPrologGameError);

        request.open('GET', 'http://localhost:'+this.port+'/'+requestString, true);

        request.setRequestHeader("Content-type", "application/x-www-formurlencoded; charset=UTF-8");
        request.send();
    }

    parseStartPrologReply(){
        if (this.status === 400) {
            console.log("ERROR");
            return;
        }
            
        // the answer here is: [Board,CurrentPlayer,WhiteScore,BlackScore]
            
        let responseArray = textStringToArray(this.responseText,true);
            // do something with responseArray[0];
            // do something with responseArray[1];
            // do something with responseArray[2];
            // do something with responseArray[3];
    }

    startPrologGameError(){
        console.log("There was an error while passing the request");
    }
}
