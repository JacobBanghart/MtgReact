import React from 'react';
import {
  IconButton,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
} from '@mui/material';
import {BinList} from '../BinList';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
export default function CardBins() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="p-3">
      <h3 className="m-0">Bins</h3>
      <div className="card-listContainer">
        <BinList />
      </div>
      <div className="card-bottom">
        <FormControl sx={{m: 1, width: '100%'}} variant="standard">
          <InputLabel className="card-textInput">Bin</InputLabel>
          <Input
            value={name}
            onChange={(event)=>{
              setName(event.target.value);
            }}
            onKeyDownCapture={(event)=>{
              if (event.key === 'Enter') {
                dispatch({type: 'CARDBIN_ADDED', name});
                setName('');
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={()=>{
                    dispatch({type: 'CARDBIN_ADDED', name});
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
  CardBins,
};
