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
exports.updateRewardMember = exports.saveRewardMember = void 0;
const database_1 = __importDefault(require("../dbconnection/database"));
const queries_1 = require("./queries");
function saveRewardMember(rewardMemberData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_member', rewardMemberData.memberID)
            .input('input_reward', rewardMemberData.rewardID)
            .input('input_active', rewardMemberData.active)
            .query(queries_1.createRewardMemeberQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.saveRewardMember = saveRewardMember;
function updateRewardMember(rewardMemberData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_member', rewardMemberData.memberID)
            .input('input_reward', rewardMemberData.rewardID)
            .input('input_active', rewardMemberData.active)
            .input('input_rewardmemeberid', rewardMemberData.rewardMemeberID)
            .query(queries_1.updateRewardMemeberQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.updateRewardMember = updateRewardMember;
//# sourceMappingURL=rewardMemberService.js.map