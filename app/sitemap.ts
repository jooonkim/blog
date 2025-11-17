import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = 'www.joon.kim';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'n');
  let slugs: string[] = [];

  try {
    const stats = await fs.stat(notesDirectory);
    if (stats.isDirectory()) {
      slugs = await getNoteSlugs(notesDirectory);
    }
  } catch (error) {
    slugs = [];
  }

  const notes = slugs.map((slug) => ({
    url: `${SITE_URL}/n/${slug}`,
    lastModified: new Date().toISOString()
  }));

  const routes = ['', '/work'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...routes, ...notes];
}
