import { ListItem, ListItemText, Typography } from '@material-ui/core';
import ListStyle from '@material-ui/core/List';

const List = (props) => (
  <div>
    <Typography variant="h6" noWrap>
      Here you can find all the
      {' '}
      {props.type}
      {' '}
      where
      {' '}
      {props.name}
      {' '}
      appears :
    </Typography>
    <ListStyle>
      {props.value.items.map((single, index) => (
        <ListItem key={`${props.type}-${index}`}>
          <ListItemText primary={single.name} />
        </ListItem>
      ))}
    </ListStyle>

  </div>
);

export default List;
