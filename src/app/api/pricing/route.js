import { promises as fs } from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src/data/pricing.json');

export async function GET() {
  try {
    const file = await fs.readFile(configPath, 'utf8');
    const data = JSON.parse(file);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to read pricing data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await fs.writeFile(configPath, JSON.stringify(data, null, 2));
    return Response.json({ message: 'Pricing updated successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to update pricing data' }, { status: 500 });
  }
}
