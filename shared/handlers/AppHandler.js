import React from 'react';
import {RouteHandler} from 'react-router';

class AppHandler extends React.Component {
    render() {
        return (
            <div>
                <section className="todoapp">
                    <RouteHandler {...this.props} key={this.props.pathname} />
                </section>
                <footer className="info">
                    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                    <p>Created by <a href="http://todomvc.com">you</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
}

export default AppHandler;
