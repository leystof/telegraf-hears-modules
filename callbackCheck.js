module.exports = function (callback, ctx) {
  try {
    if (callback instanceof RegExp)
      return ctx.update.callback_query.data.match(callback);
    
    return ctx.update.callback_query.data === callback;
  } catch (e) {
    console.log(e)
  }
};