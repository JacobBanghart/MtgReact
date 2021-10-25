import React from 'react';
import {
  CardBin,
} from '../../models';
import {
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {useForceUpdate} from '../../modules';
import {useDrop} from 'react-dnd';
export default function BinList() {
  const forceUpdate = useForceUpdate();
  const binStore = useSelector((state: any)=>state.BinStore);
  const dispatch = useDispatch();

  return (
    <List dense>
      <TransitionGroup
        className="card-list"
      >
        {binStore.map((cardBin: CardBin) =>
          <CSSTransition
            key={cardBin.id}
            timeout={500}
            classNames="fade"
          >
            <CardBinListItem
              cardBin={cardBin}
              dispatch={dispatch}
              forceUpdate={forceUpdate}
            />
          </CSSTransition>,
        )}
      </TransitionGroup>
    </List>
  );
}

function CardBinListItem(
    {cardBin, dispatch, forceUpdate}:
    {cardBin: CardBin, dispatch: any, forceUpdate: any},
) {
  const [, drop] = useDrop(
      ()=> ({
        accept: 'card',
        drop: () => {
          console.log('dropped');
        },
      }),
  );
  return (
    <ListItem
      ref={drop}
      className="card-listItem"
      disablePadding
    >
      <div className="cardBin-ListItem">
        <div className="cardBin-Header">
          { cardBin.name !== 'Land' && cardBin.id !== '0' &&
            <RenderAddSub
              cardBin={cardBin}
              dispatch={dispatch}
              forceUpdate={forceUpdate}
            />
          }
          <h3 className="mx-3 my-2">
            {cardBin.name}
          </h3>
          {
            cardBin.name !== 'Land' && cardBin.id !== '0' &&
            <IconButton
              className="ml-auto"
              aria-label="delete"
              onClick={()=>{
                dispatch({type: 'CARDBIN_REMOVED', id: cardBin.id});
              }}>
              <DeleteIcon/>
            </IconButton>
          }
        </div>
        <div className="p-2">
          <div className="dropArea p-2">
                    Drop Area
          </div>
        </div>
      </div>
    </ListItem>
  );
}

function RenderAddSub(
    {cardBin, dispatch, forceUpdate}:
    {cardBin: CardBin, dispatch: any, forceUpdate: any}) {
  return (
    <div className="d-flex align-items-center flex-column mt-1">
      <div>
        <span>Weight:</span>
      </div>
      <div>
        <IconButton
          onClick={()=>{
            dispatch({type: 'CARD_WEIGHT_DECREMENT', id: cardBin.id});
            forceUpdate();
          }}
        >
          <RemoveIcon />
        </IconButton>
        {cardBin.weight}
        <IconButton
          onClick={()=>{
            dispatch({type: 'CARD_WEIGHT_INCREMENT', id: cardBin.id});
            forceUpdate();
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}

export {
  BinList,
};
