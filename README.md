# HTTP proxy server
A simple HTTP proxy server which lets you modify user responses. A future addition will be support for HTTPS.

- [Getting started](#getting-started)
	- [Setting up development environment](#setting-up-development-environment)
	- [To run the app](#to-run-the-app)
- [Config options](#config-options)

## Getting started
Getting up and running is as simple as installing application dependencies and starting up a local development server.

### Setting up development environment

```sh
$ npm install
$ npm run setup
```

### To run the app
```sh
$ npm start
```

## Config options
The project offers the following default config:

```json
{
  "proxySettings": {
    "port": "7777",
    "headersFolderLocation": "./headers",
    "userResponseHeadersFile": "userResponseHeaders.json",
    "debug": false
  }
}
```

To override these values create a `config.json` in your root folder, similar to [`sample-config.json`](sample-config.json).

The `headersFolderLocation` (mandatory) is relative to the root folder and `userResponseHeadersFile` (mandatory) name of the header file in this folder.
