const pubsub = (() => {
  const subscribers = {};

  const subscribe = (event, callback) => {
    subscribers[event] = subscribers[event] || [];
    subscribers[event].push(callback);
  };

  const unsubscribe = (event, callback) => {
    if (subscribers[event]) {
      subscribers[event].filter((subscriber) => subscriber !== callback);
    }
  };

  const publish = (event, data) => {
    if (subscribers[event]) {
      subscribers[event].forEach((callback) => {
        callback(data);
      });
    }
  };

  return {
    subscribe,
    unsubscribe,
    publish,
  };
})();

export default pubsub;
