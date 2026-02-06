import fs from "fs";
import path from "path";

async function downloadImage(url, filename) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(filename, buffer);
  console.log(`✅ Saved to ${filename}`);
}

const OUTPUT_DIRECTORY = "/Users/raychan/Desktop/Pokemon/";
const TOTAL_POKEMON = 1025;

for (let i = 1; i <= TOTAL_POKEMON; i++) {
  const fileName = String(i).padStart(3, "0").concat(".png");
  const sourceBaseUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${fileName}`;
  downloadImage(sourceBaseUrl, path.join(OUTPUT_DIRECTORY, fileName));
}
