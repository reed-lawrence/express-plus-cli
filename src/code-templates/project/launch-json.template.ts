export const launchJson = `{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "{{workspaceFolder}}/dist/main.js",
      "env": {
        "PORT": "8000"
      },
      "outFiles": [
        "{{workspaceFolder}}/dist/*.js"
      ],
      "preLaunchTask": "build"
    }
  ]
}`;