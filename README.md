## Packing JSON object in environment file


### Why?
How said in https://12factor.net/config - "The twelve-factor app stores config in environment variables"
If you need set complex configuration for your application then need look for workarounds. <br>

This simple tools `packenv.js` solves this problem.

You may run app with params how it is;
``` 
#!/bin/bash
set -e

set -a;
source ./.env_files/.env_cfg;
npm start
```

If u use docker and docker-compose:
``` 
services:
  your-nodejs-app:
    build:
      context: ./
    env_file:
      - .env_files/.env_cfg
```
Where ./.env_files/.env_cfg - path to u file with PACKENV=...

### Install
```
    npm install [-g] node-packenv
```

### Simple use
pack json
```
// if u instal how global pack.
$ packenv path_to_ur.json -o .env_file

// or from node_modules
$ ./node_modules/.bind/packenv path_to_ur.json -o .env_file

```

unpack in your application
```
const packenv = require('packenv');

const ... =  packenv.parseObjectFromENV();
```