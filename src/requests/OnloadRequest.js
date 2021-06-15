export default function onloadRequest(callback){
    let promise = fetch("http://localhost:8082/lab6/getOnload", {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response =>{
            return response.json()
        })
        .then(data =>{
           callback(data.functions)
        });

}
