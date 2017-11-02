"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
function outputLog(data, thrownError) {
    if (config_1.config.prettyLog) {
        console.log(`${data.statusCode} ${data.method} ${data.url} - ${data.responseTime}ms`);
        if (thrownError) {
            console.error(thrownError);
        }
    }
    else if (data.statusCode < 400) {
        process.stdout.write(JSON.stringify(data) + '\n');
    }
    else {
        process.stderr.write(JSON.stringify(data) + '\n');
    }
}
async function logger(ctx, next) {
    const start = new Date().getMilliseconds();
    const logData = {
        method: ctx.method,
        url: ctx.url,
        query: ctx.query,
        remoteAdres: ctx.request.ip,
        host: ctx.header['host'],
        userAgent: ctx.header['user-agent']
    };
    let errorThrow = null;
    try {
        await next();
        logData.statusCode = ctx.status;
    }
    catch (e) {
        errorThrow = e;
        logData.errorMessage = e.message;
        logData.errorStack = e.stack;
        logData.statusCode = e.status || 500;
        if (e.data) {
            logData.data = e.data;
        }
    }
    logData.responseTime = new Date().getMilliseconds() - start;
    outputLog(logData, errorThrow);
    if (errorThrow) {
        throw errorThrow;
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map