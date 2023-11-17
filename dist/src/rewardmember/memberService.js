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
exports.deleteMember = exports.updateMember = exports.saveMember = exports.getMembersByEmailID = exports.getAllMembers = void 0;
const database_1 = __importDefault(require("../dbconnection/database"));
const queries_1 = require("./queries");
function getAllMembers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.query(queries_1.getAllMembersQuery);
        const members = result.recordset;
        return members;
    });
}
exports.getAllMembers = getAllMembers;
function getMembersByEmailID(emailID, includeRewards, includeProperties) {
    return __awaiter(this, void 0, void 0, function* () {
        let selectQuery = includeRewards ? queries_1.getMemeberByEmailWithRewards : queries_1.getMemberByEmailIDQuery;
        if (includeProperties !== undefined) {
            selectQuery = (0, queries_1.getPropertiesQuery)(includeProperties);
        }
        const result = yield database_1.default.request()
            .input('input_email', emailID)
            .query(selectQuery);
        const member = result.recordset;
        return member;
    });
}
exports.getMembersByEmailID = getMembersByEmailID;
function saveMember(memberData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_email', memberData.memberEmailID)
            .input('input_firstname', memberData.memberFirstName)
            .input('input_lastname', memberData.memberLastName)
            .query(queries_1.createMemeberQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.saveMember = saveMember;
function updateMember(memberData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_email', memberData.memberEmailID)
            .input('input_firstname', memberData.memberFirstName)
            .input('input_lastname', memberData.memberLastName)
            .input('input_id', memberData.memberID)
            .query(queries_1.updateMemeberQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.updateMember = updateMember;
function deleteMember(memberId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.default.request()
            .input('input_id', memberId)
            .query(queries_1.deleteMemeberQuery);
        const members = result.rowsAffected;
        return members[0];
    });
}
exports.deleteMember = deleteMember;
//# sourceMappingURL=memberService.js.map