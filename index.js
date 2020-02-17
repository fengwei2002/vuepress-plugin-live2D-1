const { resolve } = require("path");

module.exports = (options, context) => ({
  define() {
    return {
      model: options.model
    };
  },
  enhanceAppFiles: resolve(__dirname, "enhanceAppFile.js"),
  globalUIComponents: "Live2D"
});