import fs from 'fs';
import path from 'path';

export function loadJsonContent(subPath: string) {
  const dir = path.join(process.cwd(), subPath);

  const files = fs.readdirSync(dir);

  const items = files
    .filter((file) => file.endsWith('.json'))
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      return {
        ...data,
        slug: filename.replace(/\.json$/, ''),
      };
    });

  return items;
}

export function loadJsonContentBySlug(folder: string, slug: string) {
    console.log({folder, slug})
    const filePath = path.join(process.cwd(), folder, `${slug}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }