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
exports.memberRouter = void 0;
const express_1 = __importDefault(require("express"));
const memberService_1 = require("./memberService");
const logger_1 = require("../logger/logger");
const errorCustom_1 = require("../error/errorCustom");
const exceptionHandeler_1 = require("../error/exceptionHandeler");
exports.memberRouter = express_1.default.Router();
exports.memberRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMembers = yield (0, memberService_1.getAllMembers)();
        res.json(allMembers);
    }
    catch (err) {
        logger_1.log.error("Member create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.memberRouter.get('/:emailID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberEmailId = req.params.emailID;
        const includeRewards = req.query.includeRewards === 'true';
        const propertiesToReturn = req.query.includeProperties;
        const member = yield (0, memberService_1.getMembersByEmailID)(memberEmailId, includeRewards, propertiesToReturn);
        if (member) {
            res.json(member);
        }
        else {
            res.status(404).json({ error: 'Member not found' });
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
exports.memberRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Member post request", req.body);
    try {
        const result = yield (0, memberService_1.saveMember)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'New Member created' });
        }
    }
    catch (err) {
        logger_1.log.error("Member create", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.memberRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Member put request", req.body);
    try {
        const result = yield (0, memberService_1.updateMember)(req.body);
        if (result === 1) {
            res.status(200).json({ sucess: 'Member updated' });
        }
        else {
            res.status(200).json({ sucess: 'Member not found.' });
        }
    }
    catch (err) {
        logger_1.log.error("Member update", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
exports.memberRouter.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.log.info("Member delete request", req.body);
    try {
        const result = yield (0, memberService_1.deleteMember)(req.body.memberID);
        if (result === 1) {
            res.status(200).json({ sucess: 'Member and corresponding rewards deleted.' });
        }
        else {
            res.status(200).json({ sucess: 'Member not found.' });
        }
    }
    catch (err) {
        logger_1.log.error("Member delete", err);
        const exceptionMessage = (0, exceptionHandeler_1.HandelException)(err);
        res.status(exceptionMessage.code).json({ errormessage: exceptionMessage.message, errorCode: exceptionMessage.code });
    }
}));
//# sourceMappingURL=members.js.map