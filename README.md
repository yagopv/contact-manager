## Build Contact Manager

###Install npm dependencies

npm install
###Install bower dependencies
bower install

###Install gulp if not available
npm install -g gulp

###Start MongoDB server
mongod

###Build app
gulp concat (for debug)
gulp min (for production)

###Start app
npm start