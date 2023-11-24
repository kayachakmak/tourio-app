import dbConnect from "../../../db/connect";
import Place from "../../../db/models/place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  } else if (request.method === "POST") {
    try {
      const placeData = request.body;
      console.log("api data: ", placeData);
      await Place.create(placeData);
      return response.status(201).json({ status: "Place created" });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  }
}
