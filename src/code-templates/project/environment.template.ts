export const environmentTemplate = `import { IServerEnvironment } from "@express-plus/core/server-environment";

export const environment: IServerEnvironment = {
  debug: {{debug}}
}`;