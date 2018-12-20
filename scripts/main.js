/**
 * 
 * Main class
 * 
 */
class Main {
  /**
   * Constructor
   * @param {string} sourceName Name of the source
   * @param {string} sourceUrl Url of the source
   * @param {string} viewType View type of the list (optional)
   */
  constructor(sourceName, sourceUrl, viewType) {
    this.sourceName = sourceName;
    this.sourceUrl = sourceUrl;
    this.viewType = viewType;

    // Require modules
    this.axios = require('axios'); // HTTP client
    this.cheerio = require('cheerio'); // HTML parsing package
    this.fs = require('fs'); // This is already included in Node.js
    this.chalk = require('chalk');
  }

  /**
   * Save items to JSON file
   * @param {*} data Items
   */
  saveJson(data) {
    // Create data folder
    const dir = './data';
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir);
    }

    // Write to JSON file
    this.fs.writeFile(`${dir}/${this.sourceName}.json`, JSON.stringify(data, null, 2), (error) => {
      console.log(this.chalk.green(`File (${dir}/${this.sourceName}.json) successfully written! 👍\n`));
    });
  }

  /**
   * Error handler
   * @param {*} data Error
   */
  errorHandler(data) {
    // Write to file
    this.fs.writeFile(`errors.log`, data, (error) => {
      console.log(this.chalk.red(`Something went wrong! 😱\nCheck errors.log file.\n`));

      // Exit process
      process.exit(0);
    });
  }

}

// Export module
module.exports = Main;
