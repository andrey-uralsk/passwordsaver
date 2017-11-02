import * as Koa from 'koa';
import {config} from "../config/config";

interface ILogData {
    method: string;
    url: string;
    query: string;
    remoteAdres: string;
    host: string;
    userAgent: string;
    statusCode: number;
    errorMessage: string;
    errorStack: string;
    data: any;
    responseTime: number;
}

function outputLog(data: Partial<ILogData>, thrownError: any) {
    if(config.prettyLog) {
        console.log(`${data.statusCode} ${data.method} ${data.url} - ${data.responseTime}ms`);
        if (thrownError) {
            console.error(thrownError);
        }
    }
    else if(data.statusCode < 400) {
        process.stdout.write(JSON.stringify(data) + '\n');
    }
    else {
        process.stderr.write(JSON.stringify(data) + '\n');
    }
}

export async function logger(ctx: Koa.Context, next: () => Promise<any>) {
    const start = new Date().getMilliseconds();

    const logData: Partial<ILogData> = {
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
    } catch(e) {
        errorThrow = e;
        logData.errorMessage = e.message;
        logData.errorStack = e.stack;
        logData.statusCode = e.status || 500;
        if(e.data) {
            logData.data = e.data;
        }
    }

    logData.responseTime = new Date().getMilliseconds() - start;
    outputLog(logData, errorThrow);

    if (errorThrow) {
        throw errorThrow;
    }
}