export const packageJsonTemplate = `
{
  "name": "{{projectName}}",
  "version": "1.0.0",
  "description": "Express+ REST API",
  "scripts": { 
    "serve": "tsc && PORT=8000 node dist/main.js"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@express-plus/core": "^0.5.22"
  }
}`;