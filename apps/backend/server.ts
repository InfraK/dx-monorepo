import { H3, serve } from 'h3';
import { docs } from './docs.ts';
import { projects } from './projects/routes.ts';

const app = new H3().mount('/docs', docs).mount('/api/projects', projects);

serve(app, { port: 3000 });
