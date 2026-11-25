import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of earned pride: a small person doing something hard, finally landing.
const LINE =
  "The boy who had fallen off his bike forty times rode past his house without wobbling once, and his father, watering the roses, forgot the hose was running.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check: entry.txt must be UTF-8 text of 1 to 240 characters, not only whitespace.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 240) {
  throw new Error(
    `entry line must be 1-240 characters, got ${chars.length}`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (Buffer.byteLength(LINE, "utf8") !== Buffer.from(LINE, "utf8").length) {
  throw new Error("entry line is not valid UTF-8");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
