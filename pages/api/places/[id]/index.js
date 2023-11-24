import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/place";
import Comment from "../../../../db/models/comment";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    const comments = await Comment.find({ placeID: id });
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json({ place, comments });
  } else if (request.method === "PATCH") {
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ status: `Place ${id} updated!` });
  } else if (request.method === "DELETE") {
    console.log("id: ", id);
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }

  //   const place = db_places.find((place) => place._id.$oid === id);
  //   const comment = place?.comments;
  //   const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  //   const comments = db_comments.filter((comment) =>
  //     allCommentIds.includes(comment._id.$oid)
  //   );

  //   if (!place) {
  //     return response.status(404).json({ status: "Not found" });
  //   }

  //   response.status(200).json({ place: place, comments: comments });
}
