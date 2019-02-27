import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import ChainLinkImg from '../assets/images/chain-link-bg.png';
import EventsImg from '../assets/images/events.svg';
import LogoImg from '../assets/images/logo.png';
import NewsletterImg from '../assets/images/newsletter.svg';
import ScheduleImg from '../assets/images/schedule.svg';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Alert } from '../types/alert';
import { Member } from '../types/member';
import { SpecialEvent } from '../types/special-event';
import {
  isMobile,
  isMobileOnly,
  isSmall,
  isTabletUp,
} from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import { getUpcomingSpecialEvents } from '../utils/special-event';
import Alerts from './Alerts';
import SocialIcons from './SocialIcons';

const HeroWrapper = styled('div')({
  backgroundImage: `url(${ChainLinkImg})`,
  backgroundRepeat: 'repeat',
  position: 'relative',
});

const Logo = styled('img')(({ secondary }: { secondary?: boolean }) => ({
  height: isMobile() ? (!isMobileOnly() ? 150 : secondary ? 100 : 150) : 200,
}));

const LogoWrapper = styled(l.Flex)(
  ({ secondary }: { secondary?: boolean }) => ({
    justifyContent: secondary
      ? isMobileOnly()
        ? 'center'
        : 'flex-start'
      : 'center',
    marginLeft: secondary
      ? isMobile()
        ? isMobileOnly()
          ? 0
          : spacing.xl
        : spacing.xxxl
      : 0,
  }),
);

const PosterLink = styled(l.FlexCentered)({
  position: 'absolute',
  right: 150,
  top: spacing.xl,
  [breakpoints.mobile]: {
    right: spacing.sm,
    top: spacing.xxxxl,
  },
});

const QuickLinks = styled(l.Flex)({
  color: colors.red,
  flexDirection: isTabletUp() ? 'column' : 'row',
  position: 'absolute',
  right: spacing.ml,
  top: spacing.xl,
  [breakpoints.mobile]: {
    justifyContent: 'space-between',
    padding: `${spacing.ml}`,
    position: 'static',
  },
});

const quickItemStyles = {
  ':last-child': {
    marginBottom: 0,
  },
  colors: colors.red,
  marginBottom: spacing.t,
  verticalAlign: 'middle',
  [breakpoints.mobile]: {
    marginBottom: 0,
  },
};

// const QuickAnchor = styled(t.Anchor)({ ...quickItemStyles });
const QuickLink = styled(t.Link)({ ...quickItemStyles });

const SocialIconsWrapper = styled('div')({
  marginTop: spacing.s,
  [breakpoints.mobile]: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});

const Hero = ({
  alerts,
  location,
  specialEvents,
}: {
  alerts: Alert[];
  loadingAlerts: boolean;
  member?: Member;
  specialEvents: SpecialEvent[];
} & RouteComponentProps) => {
  const secondary = !R.equals(location.pathname, '/');
  const upcomingEvents = getUpcomingSpecialEvents(specialEvents);
  const nextUpcomingEvent = !R.isEmpty(upcomingEvents) && upcomingEvents[0];
  return (
    <HeroWrapper>
      {/* <HeroBG src={ChainLinkImg} /> */}
      <LogoWrapper
        pb={secondary ? [spacing.s, 0, 0] : [spacing.s, spacing.m]}
        pt={[spacing.s, spacing.m]}
        secondary={secondary}>
        <Link to="/">
          <Logo secondary={secondary} src={LogoImg} />
        </Link>
      </LogoWrapper>
      <Alerts alerts={alerts} secondary={secondary} />
      {!secondary && (
        <l.FlexCentered
          pb={
            secondary ? [spacing.ml, spacing.xl] : [0, spacing.xl, spacing.xl]
          }
          pt={secondary ? [spacing.s, 0, 0] : [spacing.s, spacing.m]}>
          <t.Subtitle center>
            Multi-Style Martial Arts Training & Fitness Club
          </t.Subtitle>
        </l.FlexCentered>
      )}
      <QuickLinks alignBottom>
        <QuickLink border={borders.red} color={colors.red} to="/schedule">
          <l.Flex columnRevOnMobile>
            Schedule
            <l.Img
              height={spacing.ml}
              ml={[0, spacing.s, spacing.s]}
              src={ScheduleImg}
            />
          </l.Flex>
        </QuickLink>
        <QuickLink
          bold={!!nextUpcomingEvent}
          border={borders.red}
          color={colors.red}
          to="/events">
          <l.Flex columnRevOnMobile>
            <span>
              {isTabletUp() && 'Upcoming '}Events
              {nextUpcomingEvent ? ` (${upcomingEvents.length})` : ''}
            </span>
            <l.Img
              height={spacing.ml}
              ml={[0, spacing.s, spacing.s]}
              src={EventsImg}
            />
          </l.Flex>
        </QuickLink>
        <QuickLink border={borders.red} color={colors.red} to="/?id=newsletter">
          <div onClick={() => scrollToId('newsletter')}>
            <l.Flex columnRevOnMobile>
              Newsletter
              <l.Img
                height={spacing.ml}
                ml={[0, spacing.s, spacing.s]}
                src={NewsletterImg}
              />
            </l.Flex>
          </div>
        </QuickLink>
        {/* <QuickAnchor
          border={borders.red}
          color={colors.red}
          href="https://www.gofundme.com/react-fitness-club-alumni-floor"
          target="_blank">
          Donate
        </QuickAnchor> */}
        <SocialIconsWrapper>
          <SocialIcons small />
        </SocialIconsWrapper>
      </QuickLinks>
      {!R.isEmpty(upcomingEvents) && (
        <PosterLink mb={[spacing.ml, 0]}>
          <t.Link to="/events">
            <l.Img
              height={[secondary ? 75 : isSmall() ? 65 : 75, 100, 150]}
              src={upcomingEvents[0].posterSrc}
            />
          </t.Link>
        </PosterLink>
      )}
    </HeroWrapper>
  );
};

export default withRouter(Hero);
