# Simple Twitter
A simple twitter project built with Node.js, Express, and MySQL


## Quick Look
![Simple Twitter Project Look1](https://raw.githubusercontent.com/newman0934/simple-twitter-express-starter/master/public/twitter-admin.png)
![Simple Twitter Project Look2](https://raw.githubusercontent.com/newman0934/simple-twitter-express-starter/master/public/twitter-profile.png)
![Simple Twitter Project Look3](https://raw.githubusercontent.com/newman0934/simple-twitter-express-starter/master/public/twitter.png)



## Demo
Try out our simple twitter on [Demo URL](https://ac-simple-twitter-express-vce.herokuapp.com/)

```
User
  account：user1@example.com
  password：12345678
Admin
  account：root@example.com
  password：12345678
```


## Project setup
### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/newman0934/simple-twitter-express-starter
```

### Setup Datebase

**Create database via MySQL Workbench**

> Run the following code
```
drop database if exists ac_twitter_workspace;
drop database if exists ac_twitter_workspace_test;
create database ac_twitter_workspace;
create database ac_twitter_workspace_test;
```


### Setup App

**1. Enter the project folder**

```
$ cd simple-twitter-express-starter
```

**2. Install packages via npm**

```
$ npm install
```

**3. Create .env file**

```
$ touch .env
```

**4. Store API Key in .env file and save**

```
IMGUR_CLIENT_ID=<YOUR_imgur_ID>
```

**5. Edit password in config.json file**

> /config/config.json
```
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "ac_twitter_workspace",
  "host": "127.0.0.1",
  "dialect": "mysql"
},
"test": {
    "username": "root",
    "password": "<YOUR_WORKBENCH_PASSWORD>",
    "database": "ac_twitter_workspace_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  },

```

**6. Run migration**

> run the following code in the console
```
$ npx sequelize db:migrate
$ NODE_ENV=test npx sequelize db:migrate
```

**7. Activate the server**

```
$ npm run dev
```

**8. Find the message for successful activation**

```
> Example app listening on port 3000!
```
You may visit the application on browser with the URL: http://localhost:3000

```
User
  account：user1@example.com
  password：12345678
Admin
  account：root@example.com
  password：12345678
```

### Run Test

**1. Modify scripts (Only for Widows users using console emulators like Cmder or bash)**

> /package.json
```
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "set \"NODE_ENV=test\" && mocha test/*/*.js --exit --recursive --timeout 5000"
},
```

**2. Run test for the project**

```
$ npm run test
```


## Authors

 - [Caesar Wang](https://github.com/newman0934)

 - [YunYuLo](https://github.com/YunYuLo)

 - [Eason Lin](https://github.com/EasonLin0716)