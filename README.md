# Scrappie

Scrape content from popular entertainment, media and news sources in Suriname with Node.js.

## Built with

- JavaScript

### Dependencies

- [axios](https://github.com/axios/axios) `0.17.1`
- [chalk](https://github.com/chalk/chalk) `2.3.2`
- [cheerio](https://github.com/cheeriojs/cheerio) `1.0.0`

## Requirements

- [Node.js](https://nodejs.org) `8.x`
- [npm](https://www.npmjs.com)

## Installation

- Clone the repository `git clone https://<repo-url>.git`.
- Run `npm install` to install Node.js dependencies.

## Usage

### Commands

Run the commands below to scrape content from the selected source.

```bash
# De Ware Tijd Online (dwtonline.com) - today
$ npm run dwt

# Starnieuws (starnieuws.com) - today
$ npm run star

# All sources
$ npm run all
```

### Output

The scraped content is saved to a JSON file located in `~\data\<sourceName>.json`.

```json
[
  {
    "id": 1520381533344,
    "title": "Headline title",
    "url": "http://<source-url>/item/1",
    "date": "06 Mar, 12:00",
    "author": "John Doe",
    "image": {
      "url": "http://<source-url>/item/image.jpg",
      "alt": "Alternate title"
    },
    "content": "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
  }
]
```

## License

This software is licensed under the terms of the [MIT](LICENSE.md) license.