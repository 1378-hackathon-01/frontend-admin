import { Link } from 'react-router';
import * as bi from 'react-bootstrap-icons';
import { Flex, Logo } from 'components';
import { RoutingUrls } from 'common/const';
import './style.scss';
import { createClassName } from 'common/helpers';

function Navbar() {
  return (
    <div>
      <NavbarBody />
      <NavbarBody hidden />
    </div>
  );
}

function NavbarBody(props: { hidden?: boolean }) {
  const className = createClassName('navbar-22ln', props.hidden ? 'hidden-iigm' : 'fixed-67af');

  return (
    <Flex
      className={className}
      justifyContent='space-between'
      alignItems='center'
    >
      <Link to={RoutingUrls.Main}>
        <Logo
          size={{ width: 5 }}
          color='custom'
        />
      </Link>

      <Flex gap={10}>
        <NavbarLink
          icon={<bi.Buildings />}
          label='Заведения'
          href={RoutingUrls.Institutions}
        />
        <NavbarLink
          icon={<bi.Key />}
          label='API-Токены'
          href={RoutingUrls.Tokens}
        />
        <NavbarLink
          icon={<bi.Person />}
          label='Профиль'
          href={RoutingUrls.Profile}
        />
      </Flex>
    </Flex>
  );
}

function NavbarLink(props: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link
      to={props.href}
      className='navbar-link-1u7k'
    >
      <Flex
        direction='column'
        alignItems='center'
      >
        <div className='icon-qvre'>{props.icon}</div>
        <div className='desc-jcxp'>{props.label}</div>
      </Flex>
    </Link>
  );
}

export default Navbar;
