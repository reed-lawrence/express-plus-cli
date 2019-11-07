export const mainTemplate = `import { environment } from './environments/environment';
import { Server } from '@express-plus/core/server';
import { {{controller}}Controller } from './controllers/{{fileName}}.controller';

const server = new Server(environment, {
  controllers: [
    {{controller}}Controller
  ]
});

server.start();`