const { Telegraf } = require("telegraf"); // import telegraf
const { modulesLoad } = require("../index.js"); // import telegraf-hears-modules

const bot = new Telegraf("Your Token");

modulesLoad(bot, __dirname + "/modules", data = {
  // Your variables that will be available in the module \ optional
  testField: "Leystof"
}); // Loading modules

bot.launch()
