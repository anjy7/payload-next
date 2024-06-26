const payload = require('payload');
const path = require('path');

const home = require('./home.json');
const sample = require('./sample.json');


require('dotenv').config( {path: "C:/Projects/payload-next/.env"});

const { PAYLOAD_SECRET, MONGODB_URI } = process.env;

const createHomePage = async () => {
  await payload.init({
    secret: PAYLOAD_SECRET,
    mongoURL: MONGODB_URI,
    local: true,
  });

  // const createdMedia = await payload.create({
  //   collection: 'media',
  //   data: {
  //     alt: 'Payload',
  //   },
  //   filePath: path.resolve(__dirname, './payload.jpg'),
  // });

  // const createdSamplePage = await payload.create({
  //   collection: 'pages',
  //   data: sample,
  // });

  // const homeString = JSON.stringify(home)
  //   .replace(/{{IMAGE_ID}}/g, createdMedia.id)
  //   .replace(/{{SAMPLE_PAGE_ID}}/g, createdSamplePage.id);

  // await payload.create({
  //   collection: 'pages',
  //   data: JSON.parse(homeString),
  // });

  console.log('Seed completed!');
  process.exit(0);
};

const createProducts = async () => {
  const colors = ['Red', 'Green', 'Blue', 'Black'];
  const sizes = ['XS1', 'S1', 'M1', '1L', 'XL1', 'XXL1'];
  const colorsIds = [];
  const sizesIds = [];

  await payload.init({
    secret: PAYLOAD_SECRET,
    mongoURL: MONGODB_URI,
    local: true,
  });

  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  function getRandomItems(array) {
    const numberOfItems = randomNumber(1, array.length);
    const arrayCopy = [...array];
    const randomItems = [];


    for (let i = 0; i < numberOfItems; i++) {
      const randomIndex = randomNumber(0, arrayCopy.length - 1);
      randomItems.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return randomItems;
  }

  for (let i = 0; i < colors.length; i++) {
    const res = await payload.create({
      collection: 'colors',
      data: { name: colors[i] },
    });

    colorsIds.push(res.id);
  }

  for (let i = 0; i < sizes.length; i++) {
    const res = await payload.create({
      collection: 'sizes',
      data: { name: sizes[i] },
    });

    sizesIds.push(res.id);
  }


  for (let i = 0; i < 30; i++) {
    const res = await payload.create({
      collection: 'products',
      data: {
        name: `Product ${i}`,
        price: randomNumber(19, 399),
        colors: getRandomItems(colorsIds, 4),
        sizes: getRandomItems(sizesIds, 6),
      },
    });
  }

  console.log('22222222!');
console.log('PAYLOAD_CONFIG_PATH', PAYLOAD_CONFIG_PATH);
  console.log('Product seed completed!');
  process.exit(0);
};

createHomePage();
// createProducts();
