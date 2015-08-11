# Appreciation Application for HR Devision

### Technologies
- [Angularjs] - All front end develoment.
- [Nodejs] - All backend servisers
- [Mysql] - Database 


### Installation
Install the database using phpmyadmin in mysql, Then configure the database credintials in app.js
``` js
var connection = mysql.createConnection({
    host: "password",
    user: "username",
    password: "password",
    database: "db_name",
    port : 3306, //port mysql defualt 3306
});
```


You need to install nodejs
then install nodemon for easyly restart the server when every file modification
```sh
sudo npm install nodemon
```
Install application dependencies 
```sh
$ npm install
```
run the application

  ### Features
  - Authenticate with exising system (Tpro system)
  - Every thing can manage by admin dashboard
 
