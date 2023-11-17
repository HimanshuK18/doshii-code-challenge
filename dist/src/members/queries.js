"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querySearchByName = exports.deleteMemeberQuery = exports.updateMemeberQuery = exports.createMemeberQuery = exports.getPropertiesQuery = exports.getMemeberByEmailWithRewards = exports.getMemberByEmailIDQuery = exports.getAllMembersQuery = void 0;
const errorCustom_1 = require("../error/errorCustom");
exports.getAllMembersQuery = `SELECT 
member_id as memberID, 
email as memberEmailID, 
first_name as memberFirstName, 
last_name as memberLastName 
from members`;
exports.getMemberByEmailIDQuery = `SELECT 
member_id as memberID, 
email as memberEmailID, 
first_name as memberFirstName, 
last_name as memberLastName 
from members 
where email= @input_email`;
exports.getMemeberByEmailWithRewards = `SELECT
m.member_id as memberID,
m.email as memberEmailID,
m.first_name as memberFirstName,
m.last_name as memberLastName,
r.reward_name as rewardName,
r.reward_value as rewardValue,
CASE mr.reward_active WHEN 1 THEN 'true' ELSE 'false' END AS rewardActive
FROM
members m
JOIN
member_rewards mr ON m.member_id = mr.member_id
JOIN
rewards r ON mr.reward_id = r.reward_id
where m.email = @input_email;`;
function getPropertiesQuery(properties) {
    const propertiesToReturn = properties.split(",").map(property => property.trim());
    let selectQuery = 'select ';
    propertiesToReturn.map(clientColumn => {
        const mappedColumn = columnMap[clientColumn] || "";
        if (mappedColumn === '') {
            throw new errorCustom_1.ErrorCustom("Property " + clientColumn + " is not accepted", 404);
        }
        const tableAlias = clientColumn.includes('member') ? 'm' : 'r';
        selectQuery = selectQuery + tableAlias + '.' + mappedColumn + ', ';
    });
    selectQuery = selectQuery.slice(0, -2);
    selectQuery = selectQuery + ` FROM members m
    JOIN member_rewards mr ON m.member_id = mr.member_id 
    JOIN rewards r ON mr.reward_id = r.reward_id
    where m.email = @input_email`;
    return selectQuery;
}
exports.getPropertiesQuery = getPropertiesQuery;
const columnMap = {
    "memberID": "member_id",
    "memberEmailID": "email",
    "memberFirstName": "first_name",
    "memberLastName": "last_name",
    "rewardName": "reward_name",
    "rewardValue": "reward_value"
};
exports.createMemeberQuery = `INSERT INTO dbo.members
(email
,first_name
,last_name)
VALUES
(@input_email,@input_firstname,@input_lastname)`;
exports.updateMemeberQuery = `UPDATE 
members set 
email=@input_email, 
first_name=@input_firstname, 
last_name= @input_lastname
where member_id= @input_id`;
exports.deleteMemeberQuery = `delete 
from members, member_rewards
join  member_rewards ON members.member_id = member_rewards.member_id
where member_id = @input_id`;
exports.querySearchByName = `SELECT
member_id,
email,
first_name,
last_name
FROM
members
WHERE
first_name LIKE '%' + @input_search + '%' OR
last_name LIKE '%' + @input_search + '%';`;
//# sourceMappingURL=queries.js.map