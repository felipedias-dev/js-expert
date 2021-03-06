const http = require('http');

const DEFAULT_USER = { userName: 'FelipeDias', password: '123' };

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page');

    return response.end();
  },
  
  '/login:post': async (request, response) => {
    // response is an iterator
    for await (const data of request) {
      const user = JSON.parse(data);
      
      if (
        user.userName !== DEFAULT_USER.userName ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write('Login has failed!');
        
        return response.end();
      }
      
      response.write('Login has succeeded!');
      return response.end();
    }

  },

  default: (request, response) => {
    response.write('Hello World!');

    return response.end();
  }
}

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method}`.toLowerCase();
  const chosen = routes[routeKey] || routes.default;

  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  return chosen(request, response);
};

const app = http.createServer(handler).listen(3000, () => console.log('app running at port', 3000));

module.exports = app;