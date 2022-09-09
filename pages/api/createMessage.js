// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { postMessage } from "../../data/RestApi";

export default function handler(req, res) {
  console.log(req.query);
  let newMessage = postMessage(req.query.id,req.query.text, req.query.fromMe);
  res.status(200).json(newMessage);
}
