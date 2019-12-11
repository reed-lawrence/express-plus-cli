export const environmentTemplateProd = `import { IServerEnvironment } from "@express-plus/core/server-environment";
import { LoggingLevel } from "@express-plus/core/api-server";

export const environment: IServerEnvironment = {
  debug: false,
  port: process.env.NODE_ENV,
  logging: LoggingLevel.limited
}`;