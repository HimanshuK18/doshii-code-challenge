"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_2 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./spec/swagger.json"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const logger_1 = require("./src/logger/logger");
const contants_1 = require("./src/constants/contants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use(body_parser_2.default.urlencoded({ extended: false }));
app.use(body_parser_2.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Set up OpenAPI validator middleware
app.use((0, cors_1.default)());
app.use(body_parser_2.default.urlencoded({ extended: false }));
app.use(body_parser_2.default.json());
//set the validator middleware
app.use(OpenApiValidator.middleware({
    apiSpec: './spec/swagger.json',
    validateRequests: true,
    validateResponses: true,
}));
//set the routers
const members_1 = require("./src/members/members");
app.use("/member", members_1.memberRouter);
const rewards_1 = require("./src/rewards/rewards");
app.use("/reward", rewards_1.rewardsRouter);
const rewardMembers_1 = require("./src/rewardmember/rewardMembers");
app.use("/rewardmember", rewardMembers_1.rewardMemberRouter);
//set the error handler middleware for unhandeled expections
app.use((err, req, res, next) => {
    logger_1.log.error(contants_1.ERROR, err);
    let statusCode = 500;
    if (err instanceof Error) {
        const errorMessage = err.message;
        if (/Bad Request/i.test(errorMessage)) {
            statusCode = 400;
        }
        else if (/Not Found/i.test(errorMessage)) {
            statusCode = 404;
        }
        else if (/Unauthorized/i.test(errorMessage)) {
            statusCode = 401;
        }
        else if (/Forbidden/i.test(errorMessage)) {
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
//# sourceMappingURL=server.js.map