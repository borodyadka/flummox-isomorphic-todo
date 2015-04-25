/**
 * Accepts an array of matched routes as returned from react-router's
 * `Router.run()` and calls the given static method on each. The methods may
 * return a promise.
 *
 * Returns a promise that resolves after any promises returned by the routes
 * resolve. The practical uptake is that you can wait for your data to be
 * fetched before continuing. Based off react-router's async-data example
 * https://github.com/rackt/react-router/blob/f48a6aa05d258dd2e46552cb46506284a15ee7f0/examples/async-data/app.js#L121
 * @param {Array} routes - Matched routes
 * @param {String} methodName - Name of static method to call
 * @param {...*} args - Arguments to pass to the static method
 */
export default async function performRouteHandlerStaticMethod(routes, methodName, ...args) {
  return Promise.all(routes
    .map(route => route.handler[methodName])
    .filter(method => typeof method === 'function')
    .map(method => method(...args))
  );
}
