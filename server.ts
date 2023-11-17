import express, {Request, Response, NextFunction} from "express";
import { json } from 'body-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './spec/swagger.json';
import * as OpenApiValidator from 'express-openapi-validator';
import { log } from './src/logger/logger';
import { ERROR } from './src/constants/contants';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Set up OpenAPI validator middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set the validator middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: './spec/swagger.json',
    validateRequests: true, 
    validateResponses: true,
  }),
);
//set the routers
import { memberRouter } from "./src/members/members";
app.use("/member", memberRouter);

import { rewardsRouter } from "./src/rewards/rewards";
app.use("/reward", rewardsRouter);

import { rewardMemberRouter } from "./src/rewardmember/rewardMembers";
app.use("/rewardmember", rewardMemberRouter);

//set the error handler middleware for unhandeled expections
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  log.error(ERROR, err);
  let statusCode = 500;

  if (err instanceof Error) {
    const errorMessage = err.message;
    if (/Bad Request/i.test(errorMessage)) {
      statusCode = 400;
    } else if (/Not Found/i.test(errorMessage)) {
      statusCode = 404;
    } else if (/Unauthorized/i.test(errorMessage)) {
      statusCode = 401;
    } else if (/Forbidden/i.test(errorMessage)) {
      statusCode = 403;
    }
  }
  if (!res.headersSent) {
    res.status(statusCode).send(err || 'An unexpected error occurred.');
  }
  next();
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});