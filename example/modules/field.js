module.exports.Module = function (bot, data) {
  // this.disable = true // if true === module not loading \ Optional field

  this.triggers = [
    /^Field/i,
  ]; // text or regexp

  this.func = async (ctx) => {
    // Here the execution of the command
    return ctx.reply(data.testField)
  };
};