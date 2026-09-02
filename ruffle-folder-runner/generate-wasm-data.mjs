import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "ruffle");

const files = fs.readdirSync(dir).filter(f => f.endsWith(".wasm"));

const data = {};

for (const f of files) {
  const b64 = fs.readFileSync(path.join(dir, f)).toString("base64");
  data[`ruffle/${f}`] = `data:application/wasm;base64,${b64}`;
}

fs.writeFileSync(
  path.join(dir, "wasm-data.js"),
  `window.RUFFLE_WASM_EMBEDDED = ${JSON.stringify(data)};`
);

console.log("Generated ruffle/wasm-data.js successfully!");
