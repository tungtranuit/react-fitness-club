import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { coaches } from 'src/content/coaches';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Coach, Division, Program as ProgramType } from '../types/program';
import ProfilePhoto from './ProfilePhoto';

const ProgramWrapper = styled(l.Flex)({
  border: borders.black,
  borderRadius: borders.borderRadius,
  margin: '0 2px',
  padding: spacing.xl,
  [breakpoints.small]: {
    padding: spacing.ml,
  },
});

interface Props {
  events: CalendarEvent[];
  member?: Member;
  members?: Member[];
  program: ProgramType;
}

interface State {
  showMembers: boolean;
}

class Program extends React.Component<Props & RouteComponentProps, State> {
  state = {
    showMembers: false,
  };

  toggleShowMembers = () => {
    this.setState({ showMembers: !this.state.showMembers });
  };

  render() {
    const { program } = this.props;

    const content = programContent[program.id];
    const programCoaches = R.values(
      R.filter(
        (coach: Coach) =>
          R.contains(
            coach.id,
            [program.coachId].concat(program.assistantCoachIds),
          ),
        coaches,
      ),
    );

    return (
      <ProgramWrapper alignTop columnOnMobile id={program.id}>
        <l.FlexColumn width={['100%', '50%', '50%']}>
          <l.Flex alignTop mb={spacing.ml} width="100%">
            <l.Img src={program.logoSrc} width={spacing.huge} />
            <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
            <div>
              <t.H2 bold mb={spacing.sm}>
                {content.name}
              </t.H2>
              <l.Flex>
                {programCoaches.map((coach: Coach, index: number) => (
                  <React.Fragment key={coach.id}>
                    <l.FlexColumn width={spacing.xxxl}>
                      <ProfilePhoto
                        imageSrc={coach.profilePhotoUrl}
                        sideLength={spacing.xxxl}
                      />
                      <l.Space height={spacing.s} />
                      <t.HelpText>{coach.name}</t.HelpText>
                    </l.FlexColumn>
                    {index < programCoaches.length - 1 && (
                      <l.Space width={spacing.ml} />
                    )}
                  </React.Fragment>
                ))}
              </l.Flex>
            </div>
          </l.Flex>
          <l.FlexColumn alignTop width="100%">
            <t.Text large mb={spacing.ml}>
              Divisions:
            </t.Text>
            {program.divisions.map((division: Division) => (
              <l.Flex key={division.id} spaceBetween width="100%">
                <t.Text mb={spacing.s}>{division.name}</t.Text>
                <t.Link
                  border={borders.red}
                  color={colors.red}
                  to={`/schedule?programId=${program.id}&divisionId=${
                    division.id
                  }`}
                  nowrap="true">
                  View Schedule
                </t.Link>
              </l.Flex>
            ))}
          </l.FlexColumn>
        </l.FlexColumn>
        <l.Space
          height={[spacing.ml, spacing.xxxxxl, spacing.xxxxxl]}
          width={spacing.xxxxxl}
        />
        <l.FlexColumn width={['100%', '50%', '50%']}>
          <t.Text mb={spacing.ml}>{content.description}</t.Text>
          <t.Anchor
            border={borders.red}
            href={program.aboutUrl}
            mb={spacing.ml}
            target="_blank">
            <t.Text center color={colors.red} large>
              Learn more about {program.name}
            </t.Text>
          </t.Anchor>
          <t.Text center large>
            {`$${program.monthlyCost} / month`}
            <l.Break />
            (single program cost)
          </t.Text>
        </l.FlexColumn>
      </ProgramWrapper>
    );
  }
}

export default withRouter(Program);