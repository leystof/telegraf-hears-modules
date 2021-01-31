###### Shitcode be like:
# Telegraf hearModules
`npm install telegraf-hears-modules`

## Example
### index.js
```javascript
const { Telegraf } = require("telegraf"); // import telegraf
const { modulesLoad } = require("telegraf-hears-modules"); // import telegraf-hears-modules

const bot = new Telegraf("Your bot token");
modulesLoad(bot, "Folder with modules", data = {
  // Your variables that will be available in the module \ optional
  testField: "Leystof"
}); // Loading modules

bot.launch()
```
### Module file
```javascript
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
```

## Callback example
```javascript
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
```
## Tests
```javascript
const { Telegraf } = require("telegraf");
const { testLoad } = require("telegraf-hears-modules");

const bot = new Telegraf("Your token");

testLoad(bot);
```