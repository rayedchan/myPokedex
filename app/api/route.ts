import { db } from "../../db/db";
import { pokemonTable } from "../../db/schema";

export async function GET(request: Request) {
  const results = await db.select().from(pokemonTable);
  return Response.json({ results });
}
