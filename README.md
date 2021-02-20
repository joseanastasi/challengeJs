# handit

## architecture
- backend language: PHP
- PHP WebSocket Server 0.2 with WebSocket Protocol 07 using port `9300` as default
- database: mysql
- frontend framework: react.js

## setup development
- terminal `php /server/server.php`
- if you haven't installed it yet run terminal `npm install`
- terminal `npm start` => http://localhost:3000

## setup production
- `npm run build` and move build directory files into root of server together with /server
- server needs to have a port for the socket available
- terminal `php /server/server.php` (todo make sure this runs on production always unless updating code)
- adjust database if necessary

## notes
run this command if you wish to terminate running php scripts:
```
ps aux | grep php
kill -9 [[pid]]
```

`npm test` [running npm tests](https://facebook.github.io/create-react-app/docs/running-tests)
`npm run eject` if build needs to be adjusted e.g. https://web.dev
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size
.env file https://facebook.github.io/create-react-app/docs/advanced-configuration