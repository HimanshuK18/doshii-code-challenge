import dbConnectionPool from '../dbconnection/database';
import { Member, MemberReward } from './memberModal';
import {
    getAllMembersQuery,
    getMemberByEmailIDQuery,
    getMemeberByEmailWithRewards,
    getPropertiesQuery,
    createMemeberQuery,
    updateMemeberQuery,
    deleteMemeberQuery,
    querySearchByName
} from './queries';

export async function getAllMembers(): Promise<Member[]> {
    const result = await dbConnectionPool.query(getAllMembersQuery);
    const members: Member[] = result.recordset;
    return members;
}

export async function searchMembers(searchPhrase: string): Promise<Member[]> {
    const result = await dbConnectionPool.request()
        .input('input_search', searchPhrase)
        .query(querySearchByName);
    const members: Member[] = result.recordset;
    return members;
}

export async function getMembersByEmailID(emailID: string, includeRewards: boolean, includeProperties: string): Promise<Member[] | MemberReward[]> {
    let selectQuery = includeRewards ? getMemeberByEmailWithRewards : getMemberByEmailIDQuery;
    if (includeProperties !== undefined) {
        selectQuery = getPropertiesQuery(includeProperties);
    }
    const result = await dbConnectionPool.request()
        .input('input_email', emailID)
        .query(selectQuery);

    const member: Member[] | MemberReward[] = result.recordset;
    return member;
}

export async function saveMember(memberData: Member): Promise<number | void> {
    const result = await dbConnectionPool.request()
        .input('input_email', memberData.memberEmailID)
        .input('input_firstname', memberData.memberFirstName)
        .input('input_lastname', memberData.memberLastName)
        .query(createMemeberQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}

export async function updateMember(memberData: Member): Promise<number> {
    const result = await dbConnectionPool.request()
        .input('input_email', memberData.memberEmailID)
        .input('input_firstname', memberData.memberFirstName)
        .input('input_lastname', memberData.memberLastName)
        .input('input_id', memberData.memberID)
        .query(updateMemeberQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}

export async function deleteMember(memberId: number): Promise<number> {
    const result = await dbConnectionPool.request()
        .input('input_id', memberId)
        .query(deleteMemeberQuery);
    const members: number[] = result.rowsAffected;
    return members[0];
}