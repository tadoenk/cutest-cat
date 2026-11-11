// Cutest Cat entry for make.fun (cutest-cat-01).
// The program writes one picture of a cat to /output/entry.png.
// The cat is the entry.png beside this file: a ginger kitten with big
// eyes, a head tilt and a yarn ball. The program copies it, byte for
// byte, so both runs write the same bytes.
//
// Run locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');

copyFileSync(source, target);

// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024x1024.
// Confirm the copy landed intact and inside the limit before the run ends.
const bytes = statSync(target).size;
if (bytes === 0 || bytes > 1048576) {
  throw new Error(`entry.png is ${bytes} bytes, outside the 1 MiB gate`);
}
