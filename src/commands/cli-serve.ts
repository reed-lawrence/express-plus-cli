import shell from 'shelljs';
import chalk from 'chalk';
import { CLIBuild } from './cli-build';
export interface ICLIServeOptions {
  projectRoot: string;
  prod?: boolean;
  port?: string;
}

export function CLIServe(opts: ICLIServeOptions) {
  CLIBuild(opts);
  console.log(chalk.greenBright('Serving...'));
  const port = opts.port ? opts.port : '8000';
  shell.cd(opts.projectRoot).exec(`PORT=${port} node ./dist/main.js`);
}