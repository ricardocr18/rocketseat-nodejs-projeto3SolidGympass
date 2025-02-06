import { app } from "./app";
import { env } from "./env"

app
  .listen({
    host: "0.0.0.0", // na utilização do Fastify é preciso usar essa numeração de host
    port: env.PORT
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
