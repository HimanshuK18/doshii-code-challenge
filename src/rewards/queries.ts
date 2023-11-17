export const getAllRewardsQuery = `SELECT 
reward_id as rewardID, 
reward_name as rewardName, 
reward_value as rewardValue
from rewards`;

export const getRewardQuery = `SELECT 
reward_id as rewardID, 
reward_name as rewardName, 
reward_value as rewardValue
from rewards where reward_id = @input_rewardID`;

export const getMemeberByEmailWithRewards = `SELECT
m.reward_id as rewardID,
m.email as rewardEmailID,
m.first_name as rewardFirstName,
m.last_name as rewardLastName,
r.reward_name as rewardName,
r.reward_value as rewardValue,
CASE m.reward_active WHEN 1 THEN 'true' ELSE 'false' END AS rewardActive,
FROM
rewards m
JOIN
reward_rewards mr ON m.reward_id = mr.reward_id
JOIN
rewards r ON mr.reward_id = r.reward_id
where m.email = @input_email;`

export const createRewardQuery = `INSERT INTO dbo.rewards
(reward_name
,reward_value)
VALUES
(@input_name,@input_value)`; 

export const updateRewardQuery = `UPDATE 
dbo.rewards set 
reward_name=@input_name, 
reward_value=@input_value 
where reward_id= @input_id`;


export const querySearchByName =  `	select reward_id as rewardID, 
reward_name as rewardName, 
reward_value as rewardValue
from rewards where reward_name LIKE '%' + @input_search + '%'`