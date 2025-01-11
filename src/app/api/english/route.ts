import { resolve } from 'path';
import { readFileSync } from 'fs';
import { SaveWordData } from '../_lib/apitypes';

let cache: SaveWordData;
let lastFetchTime = 0;

export function GET() {
  const now = Date.now();

  if ((now - lastFetchTime) < 600_000) {
    return Response.json(cache);
  }

  const path = resolve(process.cwd(), 'src', 'data', 'english', 'word.json');
  console.log(path);
  const data = JSON.parse(readFileSync(path, 'utf-8')) as SaveWordData;

  cache = data;
  lastFetchTime = now;
  return Response.json(data);
}
