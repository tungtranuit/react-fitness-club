import * as firebase from 'firebase';
import * as R from 'ramda';
import { Member } from '../types/member';
import { Membership } from '../types/membership';

export const getMemberRef = (memberId: string) =>
  firebase.database().ref(`members/${memberId}`);

export const getMemberName = (member: Member) =>
  member.nickname || `${member.firstName} ${member.lastName}`;

export const getMemberFullName = (member: Member) =>
  `${member.firstName} ${member.lastName}${
    R.isEmpty(member.nickname) ? '' : ' (' + member.nickname + ')'
  }`;

export const parseMemberData = (member: Member) => {
  const membership: Membership = {
    ...member.membership,
    inactivePeriods: JSON.parse(`${member.membership.inactivePeriods}`),
  };
  return {
    ...member,
    membership,
    pastMemberships: JSON.parse(`${member.pastMemberships}`),
  };
};

export const getMemberById = (memberId: string, members: Member[]) =>
  R.find((mem: Member) => memberId === mem.uid, members);

export const isCoach = (member: Member) =>
  R.equals(member.membership.type, 'coach');

// MANUAL UPDATE MEMBERS

const ENABLE_UPDATE_MEMBERS = false;

const getMemberUpdates = (member: Member) => ({});

export const updateMembers = (members: Member[]) => {
  if (ENABLE_UPDATE_MEMBERS) {
    members.map((member: Member) => {
      getMemberRef(member.uid).update(
        getMemberUpdates(member),
        (error: Error) => console.log(error),
      );
    });
  }
};
