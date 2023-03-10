import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import categoriesRouter from './routes/categoriesRoutes.js';
import productRouter from './routes/productRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
config();

app.use(categoriesRouter);
app.use(productRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
);
app.use((err, req, res, next) => {
  return res.send({
    message: err.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
