addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  //Note - a router (maybe itty router) would be more efficient here

  if (request.url.includes("/api/posts")) {
    if (request.url.includes("/byId")){

      let id = request.url.split("/byId/")[1]

      try{
        let value = await INTERVIEW_KV.get(id)

        console.log(value);

        let jsonvalue = JSON.parse(value)

        return new Response(JSON.stringify(jsonvalue), {
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
          }
        })
      }
      catch (err){
        return new Response("no post found with this id", {status:404})
      }

    }
    else{

      if (request.method === 'POST'){

        let body = await request.json();

        let title = body.title;
        let username = body.username;
        let content = body.content;

        if (title===undefined || username===undefined || content===undefined){
          return new Response("please make sure your post includes username, title, and content",{status:500})
        }

        try {
          let key = username.trim()+Date.now()
          body = {
            title: body.title,
            username: body.username,
            content: body.content,
            url: body.url,
            hasImage: body.hasImage,
            key: key
          }
          let result = await INTERVIEW_KV.put(key,JSON.stringify(body))
          return new Response(JSON.stringify("success"),{
              headers:{
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json'
              }
          });
        }
        catch(err) {
          return new Response("error",{status:400})
        }
      }

      if (request.method === 'GET'){
        
        try {
          let data = await INTERVIEW_KV.list();

          var pairs = [];
          for (let x=0;x<data.keys.length;x++){
            let value = await INTERVIEW_KV.get(data.keys[x].name);
            let jsonvalue = JSON.parse(value);
            pairs.push(jsonvalue);
          }

          return new Response(JSON.stringify(pairs),{
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json'
            }
          });
        }
        catch (err){
          return new Response(err)
        }
        
      }
    }
  }
}
