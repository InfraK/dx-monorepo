import { H3, serveStatic } from 'h3';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const docsPath = join(process.cwd(), 'node_modules', 'api-contract', 'dist', 'openapi.json');
const indexPath = join(process.cwd(), 'public', 'index.html');

const docs = new H3()
  .get('/openapi.json', (event) =>
    serveStatic(event, {
      getContents: () => readFile(docsPath),
      getMeta: async () => {
        const stats = await stat(docsPath);
        if (stats?.isFile()) {
          return {
            mtime: stats.mtimeMs,
            size: stats.size,
          };
        }
      },
    }),
  )
  .get('/index.html', (event) =>
    serveStatic(event, {
      getContents: () => readFile(indexPath),
      getMeta: async () => {
        const stats = await stat(indexPath);
        if (stats?.isFile()) {
          return {
            mtime: stats.mtimeMs,
            size: stats.size,
          };
        }
      },
      indexNames: ['./index.html'],
    }),
  );

export { docs };
