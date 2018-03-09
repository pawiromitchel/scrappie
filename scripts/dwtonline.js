/**
 * Require modules
 */
const Main = require('./main');

/**
 * 
 * Source class
 * 
 */
class Source extends Main {
  /**
   * Get items from source
   */
  getItems() {
    // Prevent issues to access the global scope within nested functions
    const self = this;

    this.axios.get(this.sourceUrl + this.viewType).then((response) => {

      // Load HTML
      if (response.status === 200) {
        const html = response.data,
          $ = this.cheerio.load(html);
        let items = [];
        let counter = 0;

        // Search HTML and collect values
        $('ul.homelist li').first().find('li:not(.first)').each((i, element) => {

          // Create item object
          items[i] = {
            id: '',
            title: $(element).children('a').text().split('-')[1].trim(),
            url: self.sourceUrl + $(element).children('a').attr('href').trim(),
            date: '',
            author: '',
            image: {
              url: '',
              alt: ''
            },
            content: ''
          }

          // Get single item content
          this.getItemContent(items[i].url).then((response) => {
            items[i].id = Date.now();
            items[i].date = response.date;
            items[i].author = response.author;
            items[i].image = {
              url: response.image.url,
              alt: response.image.alt
            };
            items[i].content = response.content;

            // Increment counter
            counter++;
            console.log(this.chalk.yellow(`Scraping item ${counter}`));

            // Save to JSON file when counter is equal to items array
            if (counter == items.length) {
              console.log('\n');
              // Save items to JSON file
              this.saveJson(items);
            }

          });

        });

      }

    }, (error) => this.errorHandler(error));
  }

  /**
   * Get single item content
   * @param {string} itemUrl Single item url
   */
  getItemContent(itemUrl) {
    // Prevent issues to access the global scope within nested functions
    const self = this;

    return new Promise((resolve, reject) => {
      this.axios.get(itemUrl).then((response) => {

        // Load HTML
        if (response.status === 200) {
          const html = response.data,
            $ = this.cheerio.load(html);
          let data = {};

          // Search HTML and collect values
          data.date = $('#artikel').find('#datumauteur').text().split('-')[0].trim();
          try {
            data.author = $('#artikel').find('#datumauteur').text().split('-')[1].trim();
          } catch (error) {
            data.author = '';
          }
          data.image = {
            url: self.sourceUrl + $('#artikel').find('#detailfoto').attr('src').trim(),
            alt: $('#artikel').find('#detailfoto').attr('alt').trim()
          }
          data.content = $('#artikel').children().not(':nth-child(-n+5), :nth-last-child(-n+2)').text().trim();

          // Return data
          resolve(data);
        }

      }, (error) => this.errorHandler(error));
    });
  }

}

// Create new instance
let dwtOnline = new Source('dwtonline', 'http://dwtonline.com', '/?view=list');
dwtOnline.getItems();