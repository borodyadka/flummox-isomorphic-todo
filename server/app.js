import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import api from './routes';
import routes from '../client/routes';
import performRouteHandlerStaticMethod from '../utils/performRouteHandlerStaticMethod';

let app = express();

function log(err) {
    process.stdout.write(err.stack);
    process.stdout.write('\n\n');
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/css', express.static(path.join(__dirname, '../node_modules/todomvc-app-css')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);
app.get('/favicon.ico', (req, res) => res.status(404).end());

app.use(async function (req, res, next) {
    let flux = new Flux();

    try {
        var router = Router.create({
            routes: routes,
            location: req.url
        });
    } catch(e) {
        log(e);
    }

    try {
        var {Handler, state} = await new Promise((resolve, reject) => {
            router.run((Handler, state) =>
                resolve({Handler, state})
            );
        });
    } catch(e) {
        log(e);
    }

    try {
        await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', {state, flux});
    } catch (e) {
        log(e);
    }

    try {
        var html = React.renderToString(
            <FluxComponent flux={flux}>
                <Handler {...state} />
            </FluxComponent>
        );
    } catch(e) {
        log(e);
    }

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>HabraIsoTODO</title>
                <link rel="stylesheet" href="/css/index.css">
            </head>
            <body>
                <div id="app">${html}</div>
                <script type="text/javascript" src="/js/bundle.js"></script>
            </body>
        </html>`
    );
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    log(err);
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

export default app;
