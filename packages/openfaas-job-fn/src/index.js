import express from 'express';
import bodyParser from 'body-parser';
import sendError from './error';

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set({
    'Content-Type': 'application/json',
    'X-Worker-Id': req.get('X-Worker-Id'),
    'X-Job-Id': req.get('X-Job-Id')
  });
  next();
});
// eslint-disable-next-line no-unused-vars
app.use(async (error, req, res, _next) => {
  await sendError({ url: req.get('X-Error-Url'), message: error });
  return res.status(500).send({ error });
});

export default app;
