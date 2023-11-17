import dbConnectionPool from '../dbconnection/database';
import { Reward } from './rewardModal';
import {
    getAllRewardsQuery,
    getRewardQuery,
    createRewardQuery,
    updateRewardQuery,
    querySearchByName
} from './queries';

export async function getAllRewards(): Promise<Reward[]> {
    const result = await dbConnectionPool.query(getAllRewardsQuery);
    const rewards: Reward[] = result.recordset;
    return rewards;
}

export async function getRewardByID(rewardId: string): Promise<Reward[]> {
    const result = await dbConnectionPool.request()
        .input('input_rewardID', rewardId)
        .query(getRewardQuery);
    const reward: Reward[] = result.recordset;
    return reward;
}

export async function saveReward(rewardData: Reward): Promise<number> {
    const result = await dbConnectionPool.request()
        .input('input_name', rewardData.rewardName)
        .input('input_value', rewardData.rewardValue)
        .query(createRewardQuery);
    const reward: number[] = result.rowsAffected;
    return reward[0];
}

export async function updateReward(rewardData: Reward): Promise<number> {
    const result = await dbConnectionPool.request()
        .input('input_id', rewardData.rewardId)
        .input('input_name', rewardData.rewardName)
        .input('input_value', rewardData.rewardValue)
        .query(updateRewardQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}

export async function searchRewards(searchPhrase: string): Promise<Reward[]> {
    const result = await dbConnectionPool.request()
        .input('input_search', searchPhrase)
        .query(querySearchByName);
    const members: Reward[] = result.recordset;
    return members;
}