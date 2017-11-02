"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const config_1 = require("./src/config/config");
const routes_1 = require("./src/middleware/routes");
const logger_1 = require("./src/middleware/logger");
const app = new Koa();
app.use(logger_1.logger);
app.use(routes_1.routes);
app.listen(config_1.config.port);
console.log(`server running on port ${config_1.config.port}`);
//# sourceMappingURL=server.js.map