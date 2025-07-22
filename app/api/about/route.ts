import { NextResponse } from 'next/server';
import { loadJsonContent } from '../../../lib/loadJsonContent';

export async function GET() {
  try {
    const items = loadJsonContent('_contents/about');
    return NextResponse.json(items);
  } catch (err) {
    console.error('Failed to load news:', err);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}