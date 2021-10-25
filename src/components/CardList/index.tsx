import * as React from 'react';
import {
  Card,
} from '../../models';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import {useDispatch, useSelector} from 'react-redux';
import {useForceUpdate} from '../../modules';
import {useDrag} from 'react-dnd';
const deckSelector = (state: any) => state.DeckStore;

export default function CardList() {
  const forceUpdate = useForceUpdate();
  const deckStore = useSelector(deckSelector);
  const dispatch = useDispatch();
  return (
    <List dense>
      <TransitionGroup
        className="card-list"
      >
        {deckStore.map((card: Card) =>
          <CSSTransition
            key={card.id}
            timeout={500}
            classNames="fade"
          >
            <CardListItem
              isDragging={false}
              card={card}
              dispatch={dispatch}
              forceUpdate={forceUpdate}
            />
          </CSSTransition>,
        )}
      </TransitionGroup>
    </List>
  );
}

function CardListItem(
    {isDragging, card, dispatch, forceUpdate}:
    {isDragging: boolean, card: Card, dispatch: any, forceUpdate: any},
) {
  const [, dragRef] = useDrag(
      ()=> ({
        type: 'card',
        item: card,
        collect: (monitor: any) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
        }),
      }),
  );
  return (
    <ListItem
      ref={dragRef}
      className="card-listItem"
      key={card.count}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={()=>{
          dispatch({type: 'CARD_REMOVED', id: card.id});
        }}>
          <DeleteIcon/>
        </IconButton>
      }
      disablePadding
    >
      <IconButton
        onClick={()=>{
          dispatch({type: 'CARD_COUNT_DECREMNT', id: card.id});
          forceUpdate();
        }}
      >
        <RemoveIcon />
      </IconButton>
      <div
        key={card.count}
      >
        {card.count}
      </div>
      <IconButton
        onClick={()=>{
          dispatch({type: 'CARD_COUNT_INCREMENT', id: card.id});
          forceUpdate();
        }}
      >
        <AddIcon />
      </IconButton>
      <ListItemText
        primary={card.name}
      />
    </ListItem>
  );
}

export {
  CardList,
};
