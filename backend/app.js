const app = require('./server.js');
const routes = require('./rotas/index.js');

app.use('/', routes);