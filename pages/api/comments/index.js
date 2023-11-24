import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/comment";

export default async function handler(request, response) {
  await dbConnect();
  console.log("id ", request.body);

  if (request.method === "POST") {
    const comment = await Comment.create(request.body);
    console.log("reqyest", request.body);

    response.status(200).json(comment);
  }
}
