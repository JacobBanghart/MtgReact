import React from 'react';
import {
  IconButton,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
} from '@mui/material';
import {CardList} from '../CardList';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
export default function Deck() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  return (
    <div
      className="p-3"
    >
      <h3 className="m-0">Deck</h3>
      <div className="card-listContainer">
        <CardList/>
      </div>
      <div className="card-bottom">
        <FormControl sx={{m: 1, width: '100%'}} variant="standard">
          <InputLabel className="card-textInput">Card</InputLabel>
          <Input
            value={name}
            onChange={(event)=>{
              setName(event.target.value);
            }}
            onKeyDownCapture={(event)=>{
              if (event.key === 'Enter') {
                dispatch({type: 'CARD_ADDED', name});
                setName('');
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={()=>{
                    if (!!name) {
                      dispatch({type: 'CARD_ADDED', name});
                    };
                    setName('');
                  }}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </div>
  );
}
export {
  Deck,
};
