addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

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
      let result = await INTERVIEW_KV.put(key,JSON.stringify(body))
      return new Response("success");
    }
    catch(err) {
      return new Response("error",{status:400})
    }
  }

  if (request.method === 'GET'){
    
    try {
      let data = await INTERVIEW_KV.list();

      console.log(data.keys);

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
