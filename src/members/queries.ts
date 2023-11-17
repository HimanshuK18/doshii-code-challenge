import { ErrorCustom } from "../error/errorCustom";

export const getAllMembersQuery = `SELECT 
member_id as memberID, 
email as memberEmailID, 
first_name as memberFirstName, 
last_name as memberLastName 
from members`;

export const getMemberByEmailIDQuery = `SELECT 
member_id as memberID, 
email as memberEmailID, 
first_name as memberFirstName, 
last_name as memberLastName 
from members 
where email= @input_email`;

export const getMemeberByEmailWithRewards = `SELECT
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
where m.email = @input_email;`

export function getPropertiesQuery(properties: string) {
    const propertiesToReturn = properties.split(",").map(property => property.trim());
    let selectQuery = 'select ';
    propertiesToReturn.map(clientColumn => {
        const mappedColumn: string = columnMap[clientColumn] || "";
        if (mappedColumn === '') {
            throw new ErrorCustom("Property " + clientColumn + " is not accepted", 404);
        }
        const tableAlias = clientColumn.includes('member') ? 'm' : 'r';
        selectQuery = selectQuery + tableAlias + '.' + mappedColumn + ', '
    });
    selectQuery = selectQuery.slice(0, -2);
    selectQuery = selectQuery + ` FROM members m
    JOIN member_rewards mr ON m.member_id = mr.member_id 
    JOIN rewards r ON mr.reward_id = r.reward_id
    where m.email = @input_email`
    return selectQuery;

}

const columnMap: { [key: string]: string } = {
    "memberID": "member_id",
    "memberEmailID": "email",
    "memberFirstName": "first_name",
    "memberLastName": "last_name",
    "rewardName": "reward_name",
    "rewardValue": "reward_value"
}

export const createMemeberQuery = `INSERT INTO dbo.members
(email
,first_name
,last_name)
VALUES
(@input_email,@input_firstname,@input_lastname)`; 

export const updateMemeberQuery = `UPDATE 
members set 
email=@input_email, 
first_name=@input_firstname, 
last_name= @input_lastname
where member_id= @input_id`;

export const deleteMemeberQuery = `delete 
from members, member_rewards
join  member_rewards ON members.member_id = member_rewards.member_id
where member_id = @input_id`;

export const querySearchByName =  `SELECT
member_id,
email,
first_name,
last_name
FROM
members
WHERE
first_name LIKE '%' + @input_search + '%' OR
last_name LIKE '%' + @input_search + '%';`