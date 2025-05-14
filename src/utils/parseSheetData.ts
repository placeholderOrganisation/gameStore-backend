export interface RawGameEntry {
  name: string;
  platform: string;
  quantity: number;
  price: number;
  featured: boolean;
}

export function parseSheetData(rows: (string | number)[][]): RawGameEntry[] {
  if (!rows || rows.length < 2) return [];

  const [header, ...dataRows] = rows;
  const nameIdx = header.indexOf("name");
  const platformIdx = header.indexOf("platform");
  const quantityIdx = header.indexOf("quantity");
  const priceIdx = header.indexOf("price");
  const featuredIdx = header.indexOf("featured");
  return dataRows.map((row) => ({
    name: String(row[nameIdx] || "")
      .trim()
      .toLowerCase(),
    platform: String(row[platformIdx] || "")
      .trim()
      .toLowerCase(),
    quantity: Number(row[quantityIdx] || 0),
    price: Number(row[priceIdx] || 0),
    featured: row[featuredIdx].toString().toLowerCase() === "true",
  }));
}
