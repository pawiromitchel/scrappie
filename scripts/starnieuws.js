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
    this.axios.get(this.sourceUrl).then((response) => {

      // Load HTML
      if (response.status === 200) {
        const html = response.data,
          $ = this.cheerio.load(html);
        let items = [];
        let counter = 0;

        // Search HTML and collect values
        $('.headlines_content ul').first().find('li').each((i, element) => {

          // Create item object
          items[i] = {
            id: '',
            title: $(element).children('a').text().trim(),
            url: $(element).children('a').attr('href').trim(),
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
    return new Promise((resolve, reject) => {
      this.axios.get(itemUrl).then((response) => {

        // Load HTML
        if (response.status === 200) {
          const html = response.data,
            $ = this.cheerio.load(html);
          let data = {};

          // Search HTML and collect values
          data.date = $('#content_text').find('i').first().text().trim();
          data.image = {
            url: $('#content_text').find('#image_foto').attr('src').trim(),
            alt: $('#content_text').find('#i_bijschrift').text().trim()
          }
          data.content = $('#content_text').find('div').first().clone().children().remove().end().text().trim();

          // Return data
          resolve(data);
        }

      }, (error) => this.errorHandler(error));
    });
  }

}

// Create new instance
let starNieuws = new Source('starnieuws', 'http://www.starnieuws.com');
starNieuws.getItems();