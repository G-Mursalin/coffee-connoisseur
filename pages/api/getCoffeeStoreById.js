import { airTable, getRecordsById } from "@/lib/airTable";

export default async function getCoffeeStoreById(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id) return res.status(400).json({ message: "id is missing" });

      // Find if this id is already exists in Database
      const records = await getRecordsById(id);

      // If id exists the response it to user "already exits this ID"
      if (records.length !== 0) {
        return res.status(200).json({ message: "success", data: records[0] });
      }
      // If not then create new field with that id to database
      else {
        return res.status(200).json({ message: "This ID not exists" });
      }
    } catch (err) {
      res.status(500).json({ message: "error" });
    }
  }
}
