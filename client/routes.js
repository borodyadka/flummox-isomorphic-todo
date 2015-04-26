import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import AppHandler from '../shared/handlers/AppHandler';
import TodoHandler from '../shared/handlers/TodoHandler';

export default (
    <Route handler={AppHandler}>
        <DefaultRoute handler={TodoHandler} />
        <Route name="all" path="/" handler={TodoHandler} action="all" />
        <Route name="active" path="/active" handler={TodoHandler} action="active" />
        <Route name="completed" path="/completed" handler={TodoHandler} action="completed" />
    </Route>
);
