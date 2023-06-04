import { airTable, getRecordsById } from "@/lib/airTable";

export default async function updateCoffeeStoreById(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ message: "id is missing" });
      // Find if this id is already exists in Database
      const records = await getRecordsById(id);

      // If id exists the response it to user "already exits this ID"
      if (records.length !== 0) {
        const data = records[0];

        const updateVoteValue = parseInt(data.voting) + parseInt(1);

        //  update it
        const updateRecord = await airTable.update([
          {
            id: data.recordId,
            fields: {
              voting: updateVoteValue,
            },
          },
        ]);

        const minifiedData = updateRecord.map((val) => val.fields);

        res
          .status(200)
          .json({ message: "update successfully", data: minifiedData[0] });
      }
      // If not then create new field with that id to database
      else {
        return res.status(200).json({ message: "This ID not exists" });
      }
    } catch (err) {
      res.status(500).json({ message: "fail", error: err.message });
    }
  }
}
