import React from 'react';
import {
  TextField,
  FormControl,
  Autocomplete,
} from '@mui/material';
import {CardList} from '../CardList';
// import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import * as Magic from 'mtgsdk-ts';
export default function Deck() {
  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);
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
          <Autocomplete
            options={options}
            getOptionLabel={(option: any)=> option.name}
            onChange={(e, value)=>{
              if (!!value) {
                dispatch({type: 'CARD_ADDED', newCard: value});
              };
              setName('');
            }}
            renderInput={(params)=>(
              <TextField
                {...params}
                label="Card Name"
                fullWidth
                value={name}
                onChange={(event: any)=>{
                  setName(event.target.value);
                  getResults(event.target.value, setOptions);
                }}
              />
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

async function getResults(name: string, setResults: any) {
  let results = await Magic.Cards.where({name});
  const names = new Set();
  results = results.filter((card) => {
    if (names.has(card.name)) return false;
    else {
      names.add(card.name);
      return true;
    }
  });
  setResults(results);
}

export {
  Deck,
};
