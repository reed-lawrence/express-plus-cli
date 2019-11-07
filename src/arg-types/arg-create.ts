import { ICliCommand } from "./icli-command";
import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';
import { Utils } from "../utils";
import { packageJsonTemplate } from "../code-templates/project/package.json";
import { gitIgnoreTemplate } from "../code-templates/project/gitignore";
import { mainTemplate } from '../code-templates/project/main.template';
import { tsconfigTemplate } from "../code-templates/project/tsconfig.template";
import { ArgGenerate } from "./arg-generate";
import { environmentTemplate } from "../code-templates/project/environment.template";

export interface ICreateOptions {
  path?: string;
  projectName: string;
}

export class ArgCreate {
  public static generate(opts: ICreateOptions) {
    console.log(chalk.blueBright(`Scaffolding Express+ project structure`));
    let targetPath = './';
    if (opts && opts.path) {
      targetPath = opts.path;
    }

    const projectRoot = targetPath + '/' + opts.projectName;
    if (!fs.existsSync(projectRoot)) {
      // console.log(chalk.green(`Creating directory ${projectRoot}`));
      fs.mkdirSync(projectRoot, { recursive: true });
      console.log(chalk.green(`Created project directory: ${projectRoot}`));
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('Target path to execute', targetPath);
    }

    const packageJsonPath = `${projectRoot}/package.json`;
    fs.writeFileSync(packageJsonPath, packageJsonTemplate.replace('{{projectName}}', opts.projectName));
    console.log(chalk.green(`Created: package.json`));

    fs.writeFileSync(`${projectRoot}/.gitignore`, gitIgnoreTemplate);
    console.log(chalk.green(`Created: .gitignore`));

    const controllersDir = `${projectRoot}/src/controllers`;
    fs.mkdirSync(controllersDir, { recursive: true });
    console.log(chalk.green(`Created directory: src/controllers`));

    const environmentsDir = `${projectRoot}/src/environments`;
    fs.mkdirSync(environmentsDir, { recursive: true });
    console.log(chalk.green(`Created directory: src/environments`));

    fs.writeFileSync(`${environmentsDir}/environment.ts`, environmentTemplate.split('{{debug}}').join('true'));
    fs.writeFileSync(`${environmentsDir}/environment.prod.ts`, environmentTemplate.split('{{debug}}').join('false'));
    console.log(chalk.green(`Created: environment.ts && environment.prod.ts`));


    const defaultControllerName = 'Values';
    fs.writeFileSync(`${projectRoot}/src/main.ts`, mainTemplate
      .split('{{controller}}').join(defaultControllerName)
      .split('{{fileName}}').join(defaultControllerName.toLowerCase()));
    console.log(chalk.green(`Created: main.ts`));
    fs.writeFileSync(`${projectRoot}/tsconfig.json`, tsconfigTemplate);
    console.log(chalk.green(`Created: tsconfig.json`));

    ArgGenerate.generate({ controllerName: `${controllersDir}/${defaultControllerName}` });

    console.log(chalk.magenta(`Installing NPM Packages (this may take a bit)`));
    shell.cd(projectRoot).exec('npm install');
    console.log(chalk.magenta(`NPM packages installed`))

    shell.cd(projectRoot).exec('git init -q').exec('git add .').exec('git commit --message="Created Express+ repo from CLI" --quiet');
    console.log(chalk.green(`Git: local repo initialized`));

    console.log(chalk.blueBright(`Express+ project scaffolding successful!`));
    return;
  }
}