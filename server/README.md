# Simple User REST Service

## Demo
Here https://simple-user-rest-demo.talkan.name


## 0. Environment
For the service to work, you must have an installed Node.js
Choose your platform here: https://nodejs.org/en/download/package-manager/


## 1. Clone the git project locally
```bash
git clone git@github.com:petrovi4/simpleUserREST.git simpleUserREST && cd simpleUserREST/server
```

## 2. Setup dependencies
```bash
npm i
```

## 3. Create JWT keys

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

## 4. Initialize database

The SQLite database is used. However, you can easily switch to PostgreSQL or MySQL. All settings are set in config.js

The *empty.sqlite* file contains a template file with an empty database.

```bash
# development
cp empty.sqlite database.sqlite
# production
cp empty.sqlite prod.sqlite
```


## 5. Specify environment variables
```bash
echo "SALT=\"$(openssl rand -hex 12)\"" > .env
```


## 6. Start project
```bash
npm start
```


## Configuration

Default port - 8080. Can be changed in the config

