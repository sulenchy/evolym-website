import { NextResponse } from 'next/server';
import { loadJsonContent } from '../../../lib/loadJsonContent';

export async function GET() {
  try {
    debugger;
    const items = loadJsonContent('_contents/blogs');
    console.log({items})
    return NextResponse.json(items);
  } catch (err) {
    console.error('Failed to load news:', err);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}