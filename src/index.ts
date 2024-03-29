#!/usr/bin/env node

import program from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { ArgGenerate } from './commands/arg-generate';
import { ArgCreate } from './commands/arg-create';
import { CLIBuild } from './commands/cli-build';
import { CLIServe } from './commands/cli-serve';
const packageJson = require('../package.json');




program
  .version(packageJson.version)
  .description('Descriptive and simplified typescript REST framework built on Express')
  .option('-i, --info', 'Get version info and more about Express+', () => {
    console.log(
      chalk.red(
        figlet.textSync('Express+', { horizontalLayout: 'full' })
      )
    );
    console.log(packageJson.version);
    program.outputHelp();
  })

program.command('create <ProjectType>')
  .description('Create a new Express+ project')
  .option('-p, --path <Path>', 'Specify a path to create project at')
  .action((projectName, args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Project Name', projectName);
      console.log('Path', args.path);
    }

    console.log(chalk.red(
      figlet.textSync('Express+', { horizontalLayout: 'full' })
    ));

    ArgCreate.generate({ projectName: projectName, path: args.path });
  });

program.command('generate [Type] [Name]')
  .alias('g')
  .description('Generate new components')
  .option('-i, --info', 'Get detailed information about the `generate` command')
  .action((type, name, args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Component Type', type);
      console.log('Component Name', name);
    }

    if (args.info) {
      console.log('generate | g <Type> <Name>')
      console.log('  <Type>: c | controller     Generates a controller');
      // console.log('  <Type>: e | endpoint       Generates an endpoint method');
      // console.log('  <Type>: s | server         Generates a new server instance')
      return;
    }
    if (!type) {
      console.log(chalk.red('Expected <Type> in `generate` command'));
      return;
    }
    if (!name) {
      console.log(chalk.red('Expected <Name> in `generate` command'));
      return;
    }
    if (type !== 'controller' && type !== 'c') {
      console.log(chalk.red('Invalid <Type> in `generate` command. Run `generate --info` for additional information'));
      return;
    }

    return ArgGenerate.generate({ controllerName: name });

  });

program.command('build')
  .description('Build and compile a project to native javascript to run on a node instance')
  .option('--prod', 'Target build files for production')
  .action(args => {
    return CLIBuild({ prod: args.prod, projectRoot: process.cwd() })
  });

program.command('serve')
  .description('Build, compile, and serve a project')
  .option('--port <port>', 'Port to host on, 8000 by default')
  .action(args => {
    return CLIServe({ prod: false, projectRoot: process.cwd(), port: args.port });
  });

program.parse(process.argv);

