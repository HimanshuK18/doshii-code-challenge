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
exports.rewardMemberRouter = void 0;
const express_1 = __importDefault(require("express"));
const rewardMemberService_1 = require("./rewardMemberService");
const logger_1 = require("../logger/logger");
const exceptionHandeler_1 = require("../error/exceptionHandeler");
exports.rewardMemberRouter = express_1.default.Router();
exports.rewardMemberRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Member Reward post request", req.body);
    try {
        const result = yield (0, rewardMemberService_1.saveRewardMember)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'New Member Reward created' });
        }
    }
    catch (err) {
        logger_1.log.error("Member Reward create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.rewardMemberRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Member Reward put request", req.body);
    try {
        const result = yield (0, rewardMemberService_1.updateRewardMember)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'Member Reward updated' });
        }
        else {
            res.status(404).json({ error: 'Member Reward not found' });
        }
    }
    catch (err) {
        logger_1.log.error("Member Reward create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
//# sourceMappingURL=rewardMembers.js.map