export const mainTemplate = `import { ApiServer } from '@express-plus/core/api-server';

import { ValuesController } from './controllers/values.controller';
import { environment } from './environments/environment';

const server = new ApiServer(environment, {
  controllers: [
    ValuesController
  ]
});

server.start();`