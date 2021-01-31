const { Markup } = require("telegraf");

module.exports.Module = function (bot) {

  this.triggers = [
    /^Test/i,
  ];

  this.callback = "test"

  this.func = async (ctx) => {
    if (ctx.callbackQuery) {
      return ctx.editMessageText("Callback work ✨")
    }

    return ctx.reply(`Test callback`, Markup.inlineKeyboard([
      Markup.button.callback("Click", "test"),
    ]))
  };
};