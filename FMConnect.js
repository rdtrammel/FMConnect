// FMConnect.js
// Version 0.0.1
// Author: Robert D Trammel
// 10/18/2018

const FMConnect = function (obj){

    options = {
        token : "", //To be set when openConnection runs
        host : obj.host,
        file : obj.file,
        auth : btoa(`${obj.user}:${obj.pass}`)
    },

    function open(){
        let url = `https://${options.host}/fmi/data/vLatest/databases/${options.file}/sessions`;
        let headers = {
            method : 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Authorization':`Basic ${options.auth}`
            },
            body:{}
        };
        fetch(url, headers).then( result =>{ 
            options.token = result.json().response.token;
            console.log(options.token);
            console.log(result.json());
        });
    }

    function close(){
        if (!options.token) {console.log('Err - No token found.' ); return;}
        let url = `https://${options.host}/fmi/data/vLatest/databases/${options.file}/sessions/${options.token}`;
        let headers = {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        fetch(url, headers).then(result=>console.log(result));
    }

    function findRecord(){
        for (var i = 0 ; !options.token && i < 3 ; i++){ open();}
        if (!options.token) return;
    }

};