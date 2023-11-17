export interface Member {
    memberID: number;
    memberEmailID: string;
    memberFirstName: string;
    memberLastName: string;
  }

  export interface MemberReward {
    memberID: number;
    memberEmailID: string;
    memberFirstName: string;
    memberLastName: string;
    rewardName: string,
    rewardValue: string,
    rewardActive:boolean
  }