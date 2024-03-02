const payload = require('payload');
const path = require('path');



require('dotenv').config( {path: "C:/Projects/payload-next/.env"});


const { PAYLOAD_SECRET, MONGODB_URI, PAYLOAD_CONFIG_PATH } = process.env;

const createHomePage = async () => {
  await payload.init({
    secret: PAYLOAD_SECRET,
    mongoURL: MONGODB_URI,
    local: true,
  });


  console.log('Seed completed!');
  process.exit(0);
};

createHomePage();

