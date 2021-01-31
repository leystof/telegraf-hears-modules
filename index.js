const fs = require("fs");
const callbackCheck = require("./callbackCheck");

function load(bot, path, data = {}) {
  if ( path === undefined || path === "" ) {
    throw new Error("Enter directory name")
  }
  data.jss  = ( data.jss === undefined ) ? [] : data.jss;
  const files  = fs.readdirSync(path);

  files.forEach(file => {
    if (  fs.lstatSync(`${path}/${file}`).isDirectory() ) {
      load(bot, `${path}/${file}`, data);
    } else if ( file.endsWith(".js") ) {

      try {
        const { Module } = require(`${path}/${file}`);
        const hearModule = new Module(bot, data);
        const match = /.+\/(.+)*$/gm.exec(path);
        let dir;

        if (match !== null){
          dir = "/" + match[1];

          if ( data.jss.find(f => f.dir === dir) === undefined ) {
            data.jss.push({dir: `${dir}/${file}`});
          }
        }

        if ( hearModule.disable ) 
          return console.log(`\x1b[93m\x1b[0m Import dir: \x1b[2m ${path}/${file} \x1b[0m`);

        if ( hearModule.triggers )
          bot.hears(hearModule.triggers, hearModule.func);

        if ( hearModule.callback ) 
          bot.action((value,ctx) => { return callbackCheck(hearModule.callback, ctx); }, hearModule.func);

        console.log(`\x1b[32m\x1b[0m Import dir: \x1b[34m ${dir}/${file} \x1b[0m`);
      } catch (err) {
        console.log(`\x1b[31m\x1b[0m Import dir: \x1b[2m ${path}/${file} \x1b[0m`);
        throw new Error(err);
      }
    }
  });
};

function test(bot) {

  load(bot, __dirname + "/example/modules", data = {
    // Your variables that will be available in the module \ optional
    testField: "Leystof"
  }); // Loading modules

  bot.launch().then(() => {
    console.log(`
      cmd:
      Field -> variables testing in DATA 
      Test -> callback testing
    `)
  })
}

module.exports = {
  modulesLoad: load,
  testLoad: test
}