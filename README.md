https-proxy-server
==================

A simple https proxy server
  * Let's you modify http user response

To Do
  * Modify https user response

## Getting started
The project is a Node.js project, so getting up and running is as simple as installing the apps dependencies and starting up a local dev server.

In your `projects` directory (or equivalent), use [git](https://git-scm.com/) to clone the project:

```sh
$ git clone git@github.com:SEEK-Jobs/https-proxy-server.git
```

If you're not a fan of the terminal, check out [GitHub Desktop](https://desktop.github.com/).

### Setting up the development environment

```sh
$ npm install
$ npm run setup
```

### To run the app
```sh
$ npm start
```

### Config Options
The project offers the following default config. To override these values create a config.json in your root folder, similar to sample-config.json from this project. The headersFolderLocation(mandatory) is relative to the root folder and the userResponseHeadersFile(mandatory) name of the headerfile in this folder. Sample file is in the headers folder of this project. Current defaults :
  * port: 7777
  * headersFolderLocation: ./headers
  * userResponseHeadersFile: userResponseHeaders.json
  * debug: false
