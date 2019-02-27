import * as bodyParser from "body-parser";
import config from "./config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from 'mongoose';

export default function (db) {
    var app: express.Express = express();

    for (let model of config.globFiles(config.models)) {
        require(path.resolve(model));
    }

    if (config.useMongo) {
        mongoose.connect(config.mongodb, {
            promiseLibrary: global.Promise
        }).catch(() => { console.log("Error connecting to mongos"); });
    }

    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    for (let route of config.globFiles(config.routes)) {
        require(path.resolve(route)).default(app);
    }

    app.use((req: express.Request, res: express.Response, next: Function): void => {
        let err: Error = new Error("Not Found");
        next(err);
    });

    return app;
};