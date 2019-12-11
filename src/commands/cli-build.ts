import fs from "fs";
import shell from 'shelljs';
import chalk from 'chalk';

export interface ICliBuildOptions {
  projectRoot: string;
  prod?: boolean;
}

export function CLIBuild(opts: ICliBuildOptions) {
  console.log(chalk.blueBright('Building...'));

  fs.rmdirSync(`${opts.projectRoot}/dist`, { recursive: true });
  shell.cd(opts.projectRoot).exec('npx tsc');

  if (opts.prod) {
    const environmentDir = `${opts.projectRoot}/dist/environments/`;

    // Delete the existing non-prod, and copy the prod to the base environment
    fs.unlinkSync(`${environmentDir}/environment.js`);
    fs.renameSync(`${environmentDir}/environment.prod.js`, `${environmentDir}/environment.js`);
  }

  console.log(chalk.green('Build complete!'));


  return;
}