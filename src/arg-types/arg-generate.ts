import chalk from 'chalk';
import { ICliCommand } from './icli-command';
import { controllerTemplate } from '../code-templates/controller.template';
import fs, { PathLike } from 'fs';
import { Utils } from '../utils';

export interface IGenerateOptions {
  controllerName: string;
}

export class ArgGenerate {

  public static generate(opts: IGenerateOptions) {
    let targetPath: PathLike = './src/controllers';
    let controllerName = opts.controllerName;
    if (opts.controllerName.indexOf('/') !== -1) {
      const arr = opts.controllerName.split('/');
      const pathArr = new Array<string>();
      for (let i = 0; i < arr.length; i++) {
        if (i !== arr.length - 1) {
          pathArr.push(arr[i]);
        } else {
          controllerName = arr[i];
        }
      }
      targetPath = pathArr.join('/');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Controller Target Path', targetPath);
      console.log('Controller Name', controllerName);
    }

    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    const fileName = `${controllerName.toLowerCase()}.controller.ts`;

    // Capitalize the first letter of the controller name to comply with Class case formatting
    const capitalizedName = Utils.CapitalizeFirst(controllerName);
    fs.writeFileSync(`${targetPath}/${fileName}`, controllerTemplate.split('{{name}}').join(capitalizedName));

    console.log(chalk.green(`Created: [controller] ${capitalizedName}Controller at ${targetPath}`));
    console.log(chalk.blueBright(`  To register this controller, add ${capitalizedName}Controller in conroller[] array for the server instance`));

    return;
  }
}