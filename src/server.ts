import { app } from "./app";

app
  .listen({
    host: "0.0.0.0", // na utilização do Fastify é preciso usar essa numeração de host
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
