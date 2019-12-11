export const packageJsonTemplate = `
{
  "name": "{{projectName}}",
  "version": "1.0.0",
  "description": "Express+ REST API",
  "scripts": { 
    "build": "exp build",
    "debug": "exp serve"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
  }
}`;