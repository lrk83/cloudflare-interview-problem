# Cloudflare Interview Backend

This provides the backend form my Cloudflare General Assigment. It creates an API for a simple social media cite that can be demoed [here](https://13354f5e.cloudflare-interview-frontend.pages.dev/). 

This API provides routes for getting all blog posts, getting a signle blog post by its ID, creating a blog post, or adding either a comment or upvote to an existing post. It stores this information in Cloudflare Workers KV.

This project is written using Cloudflare Workers and Wrangler. Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler). Futher documentation for KV can be found [here](https://developers.cloudflare.com/workers/learning/how-kv-works)
