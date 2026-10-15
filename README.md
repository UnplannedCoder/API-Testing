# Three API App

A small Node.js and Express app with three JSON endpoints.

## Run

```sh
npm install
npm start
```

The server listens on port `3000` by default. Set the `PORT` environment variable to use another port.

## Endpoints

- `GET /api/health` returns the service status.
- `GET /api/users` returns example users.
- `GET /api/products` returns example products.