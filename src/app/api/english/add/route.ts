import { NextRequest } from 'next/server';
import { resolve } from 'path';
import { SaveWordData, SignalWord } from '../../_lib/apitypes';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request: NextRequest) {
  const path = resolve(process.cwd(), 'src', 'data', 'english', 'word.json');
  const body = await request.json() as SignalWord;
  console.log('get one request');
  if (!body.word || !body.translate) {
    return new Response('Invalid data', { status: 400 });
  }

  const data = JSON.parse(readFileSync(path, 'utf-8')) as SaveWordData;

  data.public_word.push(body);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
  return new Response('Word added successfully', { status: 200 });
}
