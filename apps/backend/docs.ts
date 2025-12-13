import { H3, serveStatic } from 'h3';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const docsPath = new URL(join('node_modules', 'api-contract', 'openapi.json'), import.meta.url);
const indexPath = new URL(join('public', 'index.html'), import.meta.url);

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
