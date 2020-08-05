import * as functions from "firebase-functions";
import { connect } from "./config";
import { Ong } from "./entities/Ong";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const createOng = functions.https.onRequest(
  async (request, response) => {
    const { name, description } = request.body;

    try {
      const connection = await connect();

      const repo = connection.getRepository(Ong);

      const saveOng = await repo.save({
        name,
        description,
      });

      response.send(saveOng);
    } catch (error) {
      response.send(error);
    }
  }
);

export const getOngs = functions.https.onRequest(async (request, response) => {
  const connection = await connect();
  const repo = connection.getRepository(Ong);

  const allOngs = await repo.find();

  response.send(allOngs);
});
