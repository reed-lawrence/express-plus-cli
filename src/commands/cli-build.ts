import fs from "fs";
import shell from 'shelljs';
import chalk from 'chalk';

export interface ICliBuildOptions {
  projectRoot: string;
  prod?: boolean;
}

export function CliBuild(opts: ICliBuildOptions) {
  console.log(chalk.blueBright('Building...'));

  const result = shell.exec('npm list depth -g typescript', { silent: true });
  if (result.stdout.indexOf('(empty)') !== -1) {
    console.log(chalk.red('ERROR: @express-plus/cli requires typescript to be installed globally.'));
    console.log(chalk.red('   run `npm install -g typescript` to fix this error'));
    return;
  }

  fs.rmdirSync(`${opts.projectRoot}/dist`, { recursive: true });
  shell.cd(opts.projectRoot).exec('tsc');

  if (opts.prod) {
    const environmentDir = `${opts.projectRoot}/dist/environments/`;

    // Delete the existing non-prod, and copy the prod to the base environment
    fs.unlinkSync(`${environmentDir}/environment.js`);
    fs.renameSync(`${environmentDir}/environment.prod.js`, `${environmentDir}/environment.js`);
  }

  console.log(chalk.green('Build complete!'));


  return;
}