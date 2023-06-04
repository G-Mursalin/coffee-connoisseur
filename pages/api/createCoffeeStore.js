import { airTable, getRecordsById } from "@/lib/airTable";

export default async function createCoffeeStore(req, res) {
  if (req.method === "POST") {
    // Take data from request body
    const { id, name, location, region, voting, imgUrl } = req.body;

    // If there is no id then response "id is missing"
    if (!id) return res.status(400).json({ message: "id is missing" });

    // Find if this id is already exists in Database
    const records = await getRecordsById(id);

    // If id exists the response it to user "already exits this ID"
    if (records.length !== 0) {
      return res
        .status(200)
        .json({ message: "Already exits this ID", data: records[1] });
    }
    // If not then create new field with that id to database

    try {
      if (!name) return res.status(400).json({ message: "name is missing" });

      const newData = await airTable.create([
        {
          fields: {
            id,
            name,
            location,
            region,
            voting,
            imgUrl,
          },
        },
      ]);

      const data = newData.map((val) => val.fields);

      res.status(200).json({ message: "success to create", data });
    } catch (err) {
      res
        .status(200)
        .json({ message: "success to create", error: err.message });
    }
  }
}
