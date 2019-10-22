import React from 'react';
import '../card/card.style.css';

export const Card = ({ card, colInd, cardInd, moveRight, moveLeft }) => (
  <div className="card">
    {colInd > 0 ? <button className="left-arrow" onClick={() => moveLeft(colInd, cardInd)}/> : null}
    <span>{card}</span>
    {colInd < 3 ? <button className="right-arrow" onClick={() => moveRight(colInd, cardInd)}/> : null}
  </div>
)