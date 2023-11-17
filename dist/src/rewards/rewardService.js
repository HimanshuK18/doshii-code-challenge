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
exports.searchRewards = exports.updateReward = exports.saveReward = exports.getRewardByID = exports.getAllRewards = void 0;
const database_1 = __importDefault(require("../dbconnection/database"));
const queries_1 = require("./queries");
function getAllRewards() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.query(queries_1.getAllRewardsQuery);
        const rewards = result.recordset;
        return rewards;
    });
}
exports.getAllRewards = getAllRewards;
function getRewardByID(rewardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_rewardID', rewardId)
            .query(queries_1.getRewardQuery);
        const reward = result.recordset;
        return reward;
    });
}
exports.getRewardByID = getRewardByID;
function saveReward(rewardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_name', rewardData.rewardName)
            .input('input_value', rewardData.rewardValue)
            .query(queries_1.createRewardQuery);
        const reward = result.rowsAffected;
        return reward[0];
    });
}
exports.saveReward = saveReward;
function updateReward(rewardData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_id', rewardData.rewardId)
            .input('input_name', rewardData.rewardName)
            .input('input_value', rewardData.rewardValue)
            .query(queries_1.updateRewardQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.updateReward = updateReward;
function searchRewards(searchPhrase) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_search', searchPhrase)
            .query(queries_1.querySearchByName);
        const members = result.recordset;
        return members;
    });
}
exports.searchRewards = searchRewards;
//# sourceMappingURL=rewardService.js.map