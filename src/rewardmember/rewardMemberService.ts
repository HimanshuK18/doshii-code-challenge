import dbConnectionPool from '../dbconnection/database';
import { RewardMember, RewardMemberUpdate } from './rewardMemberModal';
import {
    createRewardMemeberQuery,
    updateRewardMemeberQuery
    
} from './queries';


export async function saveRewardMember(rewardMemberData: RewardMember): Promise<number | void> {
    const result = await dbConnectionPool.request()
        .input('input_member', rewardMemberData.memberID)
        .input('input_reward', rewardMemberData.rewardID)
        .input('input_active', rewardMemberData.active)
        .query(createRewardMemeberQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}

export async function updateRewardMember(rewardMemberData: RewardMemberUpdate): Promise<number | void> {
    const result = await dbConnectionPool.request()
        .input('input_member', rewardMemberData.memberID)
        .input('input_reward', rewardMemberData.rewardID)
        .input('input_active', rewardMemberData.active)
        .input('input_rewardmemeberid', rewardMemberData.rewardMemeberID)
        .query(updateRewardMemeberQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}




