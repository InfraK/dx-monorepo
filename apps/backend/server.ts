import { H3, serve } from 'h3';

const app = new H3().get('/', (_) => '⚡️ Tadaa!');

serve(app, { port: 3000 });
