import Link from 'next/link';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkStyle from '@material-ui/core/Link';

const Header = (props) => {
  const { name } = props;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/">
        <LinkStyle color="inherit">Characters</LinkStyle>
      </Link>
      <Typography color="textPrimary">{name}</Typography>
    </Breadcrumbs>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Header;
