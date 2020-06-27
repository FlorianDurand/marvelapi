import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinkStyle from '@material-ui/core/Link';

const Header = (props) => (
  <Breadcrumbs aria-label="breadcrumb">
    <Link href="/">
      <LinkStyle color="inherit">Characters</LinkStyle>
    </Link>
    <Typography color="textPrimary">{props.name}</Typography>
  </Breadcrumbs>
);

export default Header;
