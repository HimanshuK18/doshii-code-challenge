"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewardsRouter = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = require("../logger/logger");
const errorCustom_1 = require("../error/errorCustom");
const exceptionHandeler_1 = require("../error/exceptionHandeler");
const rewardService_1 = require("../rewards/rewardService");
exports.rewardsRouter = express_1.default.Router();
exports.rewardsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRewards = yield (0, rewardService_1.getAllRewards)();
        res.json(allRewards);
    }
    catch (err) {
        logger_1.log.error("Reward create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.rewardsRouter.get('/:rewardID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rewardId = req.params.rewardID;
        const reward = yield (0, rewardService_1.getRewardByID)(rewardId);
        if (reward) {
            res.json(reward);
        }
        else {
            res.status(404).json({ error: 'Reward not found' });
        }
    }
    catch (error) {
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(error);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.rewardsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Reward post request", req.body);
    try {
        const result = yield (0, rewardService_1.saveReward)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'New Reward created' });
        }
    }
    catch (err) {
        logger_1.log.error("Reward create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.rewardsRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Reward put request", req.body);
    try {
        const result = yield (0, rewardService_1.updateReward)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'Reward updated' });
        }
    }
    catch (err) {
        logger_1.log.error("Reward update", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.rewardsRouter.get('/searchreward/:seachPhrase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rewardSearchPhrase = req.params.seachPhrase;
        const member = yield (0, rewardService_1.searchRewards)(rewardSearchPhrase);
        if (member) {
            res.json(member);
        }
        else {
            res.status(200).json({ sucess: 'No member found' });
        }
    }
    catch (error) {
        if (error instanceof errorCustom_1.ErrorCustom) {
            if (error.code === 404) {
                res.status(404).json(error);
            }
        }
        else {
            const exceptionMessage = (0, exceptionHandeler_1.HandelException)(error);
            res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
        }
    }
}));
//# sourceMappingURL=rewards.js.map