import { equals } from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Sticky from 'react-stickynode';
import ContactImg from '../assets/images/contact';
import GalleryImg from '../assets/images/gallery';
import ProgramsImg from '../assets/images/programs';
import StarImg from '../assets/images/star';
import UserImg from '../assets/images/user';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fontSizes,
  gradients,
  navHeight,
  navHeightMobile,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { isDesktop, isMobileOnly } from '../utils/screensize';
import Divider from './Divider';

interface Item {
  Icon?: any;
  isExternal?: boolean;
  name: string;
  path: string;
}

const navItems: Item[] = [
  {
    Icon: StarImg,
    name: 'Mission',
    path: '/mission',
  },
  {
    Icon: ProgramsImg,
    name: 'Programs',
    path: '/programs',
  },
  {
    Icon: GalleryImg,
    name: 'Gallery',
    path: '/gallery',
  },
  {
    Icon: ContactImg,
    name: 'Contact',
    path: '/contact',
  },
  {
    Icon: UserImg,
    name: 'Members',
    path: '/signup',
  },
];

const ActiveIndicator = styled('div')(
  {
    bottom: 3,
    height: 4,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    transition: transitions.default,
    width: spacing.ml,
    zIndex: z.mid,
  },
  ({ active }: { active: boolean }) => ({
    background: active ? colors.red : colors.white,
  }),
);

const NavWrapper = styled(l.Flex)({
  background: gradients.black,
  height: navHeight,
  position: 'relative',
  [breakpoints.mobile]: {
    height: navHeightMobile,
  },
});

const NavItemWrapper = styled(l.Flex)({
  alignSelf: 'flex-start',
  cursor: 'pointer',
  height: `calc(${navHeight} + 18px)`,
  zIndex: z.high,
  [breakpoints.mobile]: {
    height: spacing.xl,
  },
  [breakpoints.small]: {
    height: spacing.xl,
  },
});

const NavTextWrapper = styled(l.FlexCentered)(
  {
    height: `calc(${navHeight} + 18px)`,
    marginTop: `-${spacing.s}`,
    [breakpoints.mobile]: {
      height: spacing.xxl,
      paddingTop: 0,
    },
  },
  ({ isLast }: { isLast: boolean }) => ({
    width: 150,
    [breakpoints.tablet]: {
      width: 100,
    },
    [breakpoints.mobile]: {
      width: isLast ? 'auto' : 90,
    },
    [breakpoints.small]: {
      width: isLast ? 'auto' : 75,
    },
  }),
);

const NavTextBase = styled(t.Text)({
  transition: transitions.default,
  [breakpoints.small]: {
    fontSize: fontSizes.small,
  },
});

const NavText = styled(NavTextBase)({
  '.active-nav &': {
    color: colors.red,
  },
  color: colors.white,
  textAlign: 'center',
});

const NavItem = ({
  active,
  isLast,
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  active: boolean;
  isLast: boolean;
  item: Item;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const absoluteStyles =
    isMobileOnly() && isLast
      ? {
          position: 'absolute',
          right: spacing.s,
          top: spacing.s,
        }
      : {};

  const linkInner = (
    <NavTextWrapper
      className={active ? 'active-nav' : ''}
      isLast={isLast}
      position={isMobileOnly() && isLast ? 'static' : 'relative'}
    >
      {!equals('Members', item.name) && <ActiveIndicator active={active} />}
      {(isDesktop() || isLast) && item.Icon && (
        <l.Space mr={[0, spacing.sm, spacing.sm]} {...absoluteStyles}>
          <item.Icon
            color={active ? colors.red : colors.white}
            side={spacing.ml}
          />
        </l.Space>
      )}
      {(isDesktop() || !isLast) && (
        <NavText mb={spacing.s}>{item.name}</NavText>
      )}
    </NavTextWrapper>
  );
  return (
    <NavItemWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {item.isExternal ? (
        <a className={active ? 'active-nav' : ''} href={item.path}>
          {linkInner}
        </a>
      ) : (
        <NavLink activeClassName="active-nav" exact to={item.path}>
          {linkInner}
        </NavLink>
      )}
    </NavItemWrapper>
  );
};

interface State {
  hoverItem: number;
}

class Nav extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      hoverItem: -1,
    };
  }

  onMouseEnter = (i: number) => {
    this.setState({ hoverItem: i });
  };

  onMouseLeave = () => {
    this.setState({ hoverItem: -1 });
  };

  render() {
    const { location } = this.props;
    const { hoverItem } = this.state;

    return (
      <div id="nav-end">
        <Sticky innerZ={z.max}>
          <NavWrapper columnOnMobile spaceBetween position="relative">
            <NavLink exact to="/">
              <l.Flex height={['auto', navHeight]}>
                <t.Text
                  bold
                  color={colors.white}
                  mb={['4px', 0]}
                  ml={[0, spacing.sm]}
                  mt={['6px', 0]}
                  nowrap
                >
                  REACT FITNESS CLUB
                </t.Text>
              </l.Flex>
            </NavLink>
            <l.Flex height="100%">
              {navItems.map((item: Item, i: number) => {
                const active =
                  i === hoverItem || item.path === location.pathname;
                return (
                  <NavItem
                    active={active}
                    key={item.name}
                    isLast={i === navItems.length - 1}
                    item={item}
                    onMouseEnter={() => this.onMouseEnter(i)}
                    onMouseLeave={this.onMouseLeave}
                  />
                );
              })}
            </l.Flex>
          </NavWrapper>
          <Divider />
        </Sticky>
      </div>
    );
  }
}

export default withRouter(Nav);
