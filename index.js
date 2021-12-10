const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  if (request.method === 'POST'){

    let body = await request.json();

    let title = body.title;
    let username = body.username;
    let content = body.content;

    if (title===undefined || username===undefined || content===undefined){
      return new Response("please make sure your post includes username, title, and content as JSON")
    }

    try {
      let key = username.trim()+Date.now()
      let result = await INTERVIEW_KV.put(key,JSON.stringify(body))
      return new Response("success");
    }
    catch(err) {
      return new Response(err)
    }

    
  }

 
}
