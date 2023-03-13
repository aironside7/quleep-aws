const express = require('express');
const cors = require('cors');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();

app.use(express.json());
app.use(cors());

// Set up AWS S3 configuration
const s3 = new aws.S3({
  accessKeyId: "AKIASNN52P2M5RJHT3FJ",
  secretAccessKey: "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",
  region: "ap-northeast-1",
});

// Set up multer configuration for file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "qulee",
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
  limits: { fileSize: 10000000 },
});

// Set up MongoDB connection
mongoose.connect("mongodb+srv://ani:ani@cluster0.0shejil.mongodb.net/quleep?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected'));

// Set up product upload endpoint
app.post('/products', upload.array('images', 6), async (req, res) => {
  try {
    const { name, description, price, currency } = req.body;
    const images = req.files.map((file) => file.location);
    const product = new Product({ name, description, price, currency, images });
    await product.save();
    res.status(201).json({ message: 'Product uploaded successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set up product retrieval endpoint
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().select('name description price currency images');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
