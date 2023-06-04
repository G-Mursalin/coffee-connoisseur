const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_TABLE_KEY
);

export const getRecordsById = async (id) => {
  const findCoffeeStoreRecords = await base("coffee-stores")
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  if (findCoffeeStoreRecords.length === 0) {
    return [];
  }
  const recordId = findCoffeeStoreRecords[0].id;

  const minifiedData = findCoffeeStoreRecords.map((val) => val.fields);

  minifiedData.map((val) => (val["recordId"] = recordId));

  return minifiedData;
};

export const airTable = base("coffee-stores");
