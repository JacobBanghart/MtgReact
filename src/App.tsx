import React from 'react';
import './App.css';
import {
  Card,
} from '@mui/material';
import {CardBins, Deck} from './components';
export default function App() {
  return (
    <div className="app-grid px-2">
      <div className="mid-left">
        <Card
          className="card"
          style={{height: '100%'}}
        >
          <Deck/>
        </Card>
      </div>
      <div className="mid-mid">
        <Card
          style={{height: '100%'}}
          className="card"
        >
          <CardBins />
        </Card>
      </div>
      <div className="mid-right">
        <div className="rightSubGrid">
          <Card className="right-top">Stat Block 1</Card>
          <Card className="right-middle">Stat Block 2</Card>
          <Card className="right-bottom">Stat Block 3</Card>
        </div>
      </div>
    </div>
  );
}
