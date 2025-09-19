import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const envFilePattern = /^\.env(?:\..+)?$/;
const envKeyPattern = /^\s*(?:export\s+)?([A-Za-z_]\w*)\s*=\s*(?:\S.*)?$/;

async function findEnvFiles(rootDir: string): Promise<string[]> {
  const dirEntries = await fs.readdir(rootDir, { withFileTypes: true });
  return dirEntries
    .filter((entry) => entry.isFile() && envFilePattern.test(entry.name))
    .map((entry) => path.join(rootDir, entry.name));
}

function extractKeysFromEnv(content: string): string[] {
  const keys: string[] = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#'))
      continue;

    const match = line.match(envKeyPattern);
    if (!match)
      continue;

    const key = match[1];
    if (!key.startsWith('VITE_'))
      continue;

    keys.push(key);
  }

  return keys;
}

function createDeclaration(keys: Iterable<string>): string {
  const sortedKeys = [...new Set(keys)].toSorted((a: string, b: string) => a.localeCompare(b));
  const fields = sortedKeys.map((key: string) => `  readonly ${key}: string;`);

  return [
    '/// <reference types="vite/client" />',
    '',
    'interface ImportMetaEnv {',
    ...fields,
    // eslint-disable-next-line no-template-curly-in-string
    '  readonly [key: `VITE_${string}`]: string | undefined;',
    '}',
    '',
    'interface ImportMeta {',
    '  readonly env: ImportMetaEnv;',
    '}',
    '',
  ].join('\n');
}

async function main(): Promise<void> {
  const envFiles = await findEnvFiles(projectRoot);
  if (envFiles.length === 0) {
    console.warn('No .env* files found. vite-env.d.ts left unchanged.');
    return;
  }

  const allKeys: string[] = [];
  for (const filePath of envFiles) {
    const content = await fs.readFile(filePath, 'utf8');
    allKeys.push(...extractKeysFromEnv(content));
  }

  const declaration = createDeclaration(allKeys);
  const targetPath = path.join(projectRoot, 'vite-env.d.ts');
  await fs.writeFile(targetPath, `${declaration}\n`);

  console.log(
    `Generated vite-env.d.ts with ${new Set(
      allKeys,
    ).size} VITE_ variables from ${envFiles.length} file(s).`,
  );
}

try {
  await main();
} catch (error: unknown) {
  console.error(error);
  process.exitCode = 1;
}
