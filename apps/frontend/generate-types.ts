import openapiTS, { astToString } from 'openapi-typescript';
import contract from 'api-contract/openapi.json';

const ast = await openapiTS(JSON.stringify(contract));
const contents = astToString(ast);

await Bun.write('./src/lib/api/types.d.ts', contents);
