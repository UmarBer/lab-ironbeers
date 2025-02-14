const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const beers = beersFromApi;
      res.render('beers', { beers });
    })
    .catch(error => console.log(error));
});

/* app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      const beer = beersFromApi;
      res.render('random-beer', {
        randombeer: true,
        title: 'Beer',
        data: beer
      });
    })
    .catch(error => console.log(error));
});
*/

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      const data = beersFromApi;
      res.render('random-beer', {
        randombeer: true,
        title: 'Beers at Random',
        data: data
      });
    })
    .catch(error => console.error());
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
