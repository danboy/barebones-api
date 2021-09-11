const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);

const capitalize = ([first,...rest]) => `${first.toUpperCase()}${rest.join('')}`

const toFileName = (name) => {
  return name.replace('.js','').split("_").map(capitalize).join('')
}

const controllers = {};
const functions = {};

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file !== "base.js" && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const controller = require(path.join(__dirname, file))
    controllers[toFileName(file)] = new controller();
    functions[`${toFileName(file)}Controller`] = controller;
  });

const init = () => {
  return controllers
}

module.exports = {
  init,
  ...functions
}
