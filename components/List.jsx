import PropTypes from 'prop-types';

import { ListItem, ListItemText, Typography } from '@material-ui/core';
import ListStyle from '@material-ui/core/List';

const List = (props) => {
  const { name, value, type } = props;
  const { items } = value;
  return (
    <div>
      <Typography variant="h6" noWrap>
        Here you can find all the
        {' '}
        {type}
        {' '}
        where
        {' '}
        {name}
        {' '}
        appears :
      </Typography>
      <ListStyle>
        {items.map((single, index) => (
          <ListItem key={`${type}-${index}`}>
            <ListItemText primary={single.name} />
          </ListItem>
        ))}
      </ListStyle>

    </div>
  );
};

List.defaultProps = {
  value: { items: [] },
};

List.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.string.isRequired,
};
export default List;
