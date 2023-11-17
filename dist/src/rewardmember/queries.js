"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRewardMemeberQuery = exports.createRewardMemeberQuery = exports.getAllRewardMembersQuery = void 0;
exports.getAllRewardMembersQuery = `SELECT
R.reward_name as rewardName,
R.reward_value as rewardValue,
CASE MR.reward_active WHEN 1 THEN 'true' ELSE 'false' END AS rewardActive,
M.member_id as memberId
FROM
members M
JOIN
member_rewards MR ON M.member_id = MR.member_id
JOIN
rewards R ON MR.reward_id = R.reward_id
WHERE
M.email = @input_email`;
exports.createRewardMemeberQuery = `INSERT INTO dbo.member_rewards
(member_id,
reward_id,
reward_active)
VALUES
(@input_member,@input_reward,@input_active)`;
exports.updateRewardMemeberQuery = `update  member_rewards 
set 
member_id = @input_member,
reward_id = @input_reward,
reward_active = @input_active
where member_rewards_id = @input_rewardmemeberid`;
//# sourceMappingURL=queries.js.map