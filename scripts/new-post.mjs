// scripts/new-post.mjs
import fs from "node:fs/promises";
import path from "node:path";

const [, , slugArg, ...titleParts] = process.argv;

if (!slugArg) {
  console.error("Usage: node scripts/new-post.mjs <slug> [Title of Post]");
  process.exit(1);
}

const slug = slugArg.toLowerCase();
const title = titleParts.length
  ? titleParts.join(" ")
  : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const dir = path.join("app", slug);
const file = path.join(dir, "page.mdx");

const template = `export const metadata = {
  title: '${title}',
  alternates: {
    canonical: '/${slug}',
  },
};

# ${title}

<br />

Write your intro paragraph here.

## Section 1

Content goes here.

## Section 2

More content here.

`;

async function main() {
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(file);
    console.error(`File already exists: ${file}`);
    process.exit(1);
  } catch {
    // file does not exist, we're good
  }

  await fs.writeFile(file, template, "utf8");
  console.log(`✅ Created new post at ${file}`);
  console.log(`URL will be: /${slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});