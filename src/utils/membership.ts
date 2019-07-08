import * as R from 'ramda';
import { multipass } from '../content/memberships';
import { Member } from '../types/member';
import {
  InactivePeriod,
  Membership,
  MembershipType,
} from '../types/membership';
import { Program } from '../types/program';
import { getMemberRef } from './member';
import { getDivisionCost } from './program';

export const deactivateMembership = (member: Member) => {
  getMemberRef(member.uid).update({
    membership: {
      ...member.membership,
      inactivePeriods: JSON.stringify(
        member.membership.inactivePeriods.concat([
          { start: new Date(), end: '' },
        ]),
      ),
    },
  });
};

export const getGenericMembership: (
  type: MembershipType,
) => Membership = type => ({
  inactivePeriods: [],
  signupDate: '',
  type,
});

export const getMemberCost = (
  member: Member,
  program?: Program,
  divisionId?: string,
) => {
  switch (member.membership.type) {
    case 'multipass':
      return multipass.monthlyCost;
    case 'coach':
    case 'student':
    case 'sponsored':
    case '':
      return 0;
    default:
      if (program) {
        return getDivisionCost(program, divisionId);
      }
      return 0;
  }
};

export const isInactiveMembership = (membership: Membership) =>
  R.find(
    (inactivePeriod: InactivePeriod) => R.isEmpty(inactivePeriod.end),
    membership.inactivePeriods,
  );
