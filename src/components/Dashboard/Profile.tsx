import * as React from 'react';
import styled from 'react-emotion';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { isMobile, isTabletUp } from '../../utils/screensize';
import { ButtonPrimary } from '../Form/Button';
import withScroll from '../hoc/withScroll';
import ProfilePhoto from '../ProfilePhoto';

const LABEL_WIDTH = 200;

const ProfileInfo = styled('div')({
  flex: 1,
});

interface Props {
  setView: () => void;
  member: Member;
}

class Profile extends React.Component<Props> {
  render() {
    const { setView, member } = this.props;
    return (
      <div>
        <l.Flex
          alignTop={!isMobile()}
          flexDirection={isMobile() ? 'column' : 'row'}
          alignItems={isMobile() ? 'center' : 'flex-start'}
        >
          <ProfilePhoto
            sideLength={[150, 175, 200]}
            imageSrc={member.profilePhotoUrl}
          />
          <l.Space height={spacing.xxxl} width={spacing.xxxxxl} />
          <ProfileInfo>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Name:
              </t.Text>
              <t.Text large overflowX>{`${member.firstName} ${member.lastName}${
                member.nickname ? ' (' + member.nickname + ')' : ''
              }`}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Email:
              </t.Text>
              <t.Text large overflowX>
                {member.email}
              </t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Phone:
              </t.Text>
              <t.Text large>{member.phone}</t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.xl]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                DOB:
              </t.Text>
              <t.Text large overflowX>
                {member.dateOfBirth.month}/{member.dateOfBirth.day}/
                {member.dateOfBirth.year}
              </t.Text>
            </l.Flex>
            <t.Text bold large mb={[spacing.s, spacing.sm]}>
              Medical Info:
            </t.Text>
            <t.Text
              large
              maxWidth={isTabletUp() ? 550 : undefined}
              mb={spacing.xl}
              overflowX
            >
              {member.medicalConditions}
            </t.Text>
            <t.Text bold large mb={[spacing.ml, spacing.sm]}>
              Emergency Contact Info:
            </t.Text>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Name:
              </t.Text>
              <t.Text large overflowX>
                {member.emergencyContact.firstName}{' '}
                {member.emergencyContact.lastName}
              </t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Email:
              </t.Text>
              <t.Text large overflowX>
                {member.emergencyContact.email}
              </t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Phone:
              </t.Text>
              <t.Text large overflowX>
                {member.emergencyContact.phone}
              </t.Text>
            </l.Flex>
            <l.Flex
              alignTop={isMobile()}
              columnOnMobile
              mb={[spacing.ml, spacing.sm]}
            >
              <t.Text
                bold
                large
                mb={[spacing.s, 0]}
                width={['100%', LABEL_WIDTH]}
              >
                Relationship:
              </t.Text>
              <t.Text large overflowX>
                {member.emergencyContact.relationship}
              </t.Text>
            </l.Flex>
          </ProfileInfo>
          <l.Flex mt={[spacing.xl, spacing.xxxl, 0]}>
            <ButtonPrimary onClick={setView}>Edit</ButtonPrimary>
          </l.Flex>
        </l.Flex>
      </div>
    );
  }
}

export default withScroll(Profile);
