import React from 'react';
import {
  Card,
  CardBin,
} from '../../models';
import {
  Card as CardComp,
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
        drop: (card: Card) => {
          dispatch({type: 'CARDBIN_ADD_CARD', id: cardBin.id, cardId: card.id});
          forceUpdate();
        },
      }),
  );
  return (
    <ListItem
      ref={drop}
      className="card-listItem"
      disablePadding
      key={cardBin.cards.length}
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
        <CardBinCardList
          cardBinId={cardBin.id}
          cardLength={cardBin.cards.length}
          cards={cardBin.cards}
          forceUpdate={forceUpdate}
        />
      </div>
    </ListItem>
  );
}

function CardBinCardList(
    {cardBinId, cardLength, cards, forceUpdate}:
  {cardBinId: string, cardLength: number, cards: string[], forceUpdate: any
}) {
  return (
    <div>
      {cardLength > 0 ?
        <CardList
          cardBinId={cardBinId}
          cards={cards}
          forceUpdate={forceUpdate}
        /> :
        <EmptyDropArea />
      }
    </div>
  );
}

function CardList(
    {cardBinId, cards, forceUpdate}:
  {cardBinId: string, cards:string[], forceUpdate: any}) {
  const deckStore = useSelector((state: any)=>state.DeckStore);
  return (
    <TransitionGroup
      className="card-list"
    >
      {cards.map((card) =>
        <CSSTransition
          key={card}
          timeout={500}
          classNames="fade"
        >
          <CardListDisplayItem
            cardBinId={cardBinId}
            card={deckStore.find((item: Card) => item.id == card) as Card}
            forceUpdate={forceUpdate}
          />
        </CSSTransition>,
      )}
    </TransitionGroup>
  );
}

function CardListDisplayItem(
    {cardBinId, card, forceUpdate}:
  {cardBinId: string, card: Card, forceUpdate: any
}) {
  if (!card?.name) {
    forceUpdate();
  }
  const dispatch = useDispatch();
  return (
    <CardComp className="mx-3 mb-1">
      <div className="d-flex flex-row ml-1 align-items-center">
        <div>
          {card?.count}:
        </div>
        <div className="ml-1">
          {card?.name}
        </div>
        <div className="ml-auto mr-1">
          <IconButton
            onClick={
              ()=>{
                dispatch({
                  type: 'CARDBIN_REMOVE_CARD',
                  id: cardBinId,
                  cardId: card?.id,
                });
                forceUpdate();
              }
            }
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </CardComp>
  );
}

function EmptyDropArea() {
  return (
    <div className="p-2">
      <div className="dropArea p-2">
        Drop Area
      </div>
    </div>
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
            dispatch({type: 'CARDBIN_WEIGHT_DECREMENT', id: cardBin.id});
            forceUpdate();
          }}
        >
          <RemoveIcon />
        </IconButton>
        {cardBin.weight}
        <IconButton
          onClick={()=>{
            dispatch({type: 'CARDBIN_WEIGHT_INCREMENT', id: cardBin.id});
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
