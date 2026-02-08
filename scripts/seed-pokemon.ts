import "dotenv/config";
import { db } from "../db/db";
import { pokemonTable } from "../db/schema";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=2000";
const TOTAL_POKEMON = 1025;

type PokeApiResult = {
  name: string;
  url: string;
};

async function seedPokemon() {
  console.log("🌱 Fetching Pokémon from PokéAPI...");
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = await res.json();
  const pokemon: PokeApiResult[] = data.results;

  const rows = pokemon
    .map((p) => {
      const match = p.url.match(/\/pokemon\/(\d+)\//);
      if (!match) return null;

      return {
        id: Number(match[1]),
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      };
    })
    .filter(({ id }) => id <= TOTAL_POKEMON) as { id: number; name: string }[];

  console.log(`📦 Inserting ${rows.length} Pokémon...`);
  await db.insert(pokemonTable).values(rows).onConflictDoNothing();
  console.log("✅ Pokémon seeded successfully");
  process.exit(0);
}

seedPokemon().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
