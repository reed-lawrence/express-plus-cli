export const environmentTemplate = `import { IServerEnvironment } from "@express-plus/core/server-environment";
import { LoggingLevel } from "@express-plus/core/api-server";

export const environment: IServerEnvironment = {
  debug: true,
  logging: LoggingLevel.verbose
}`;