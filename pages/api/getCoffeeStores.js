import { fetchData } from "@/lib/fetchData";

export default async function getCoffeeStores(req, res) {
  if (req.method === "GET") {
    try {
      const { limit } = req.query;
      const data = await fetchData(limit);
      res.status(200).json({ message: "success", data });
    } catch (err) {
      res.status(500).json({ message: "error", data });
    }
  }
}
