// FMConnect.js
// Version 0.0.2
// Author: Robert D Trammel
// 10/18/2018

class FMConnect(obj){

    settings = {
        host : obj.host,
        file : obj.file,
        auth : btoa(`${obj.user}:${obj.pass}`)
    }

    open(){
        let url = `https://${settings.host}/fmi/data/vLatest/databases/${settings.file}/sessions`;
        let headers = {
            method : 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':`Basic ${settings.auth}`
            },
            body:{}
        };
        fetch(url, headers).then( result =>{ 
            if ( !result.OK ) return;
            settings.token = result.json().response.token;
        }); //Fetch not working yet
    }

    close(){
        if (!settings.token) {console.log('Err - No token found.' ); return;}
        let url = `https://${settings.host}/fmi/data/vLatest/databases/${settings.file}/sessions/${settings.token}`;
        let headers = {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        fetch(url, headers).then(result=>console.log(result)); //Not working
    }

    find(layout,criteria){
        for (var i = 0 ; !settings.token && i < 3 ; i++){ open();} //Try 3 times - Obviously this is not the way to do it
        if (!options.token) return;
    }
    
    runScript(scriptName){
        //This will require a generic "Globals" layout exists somewhere with no real data on it.
    }
    
    setField(layout, field, data){
        
    }

};
