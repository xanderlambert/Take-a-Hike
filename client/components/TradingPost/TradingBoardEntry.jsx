import React, { useState, useEffect } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';


const TradingBoardEntry = ({ post }) => {

  const[thisPost, setThisPost] = useState(post);

  const link = `/tradingpost/trade/${thisPost._id}`;


  return (
    <div className='list-item-card'>
      <Link to={link} state={{ thisPost: thisPost }} className="link">{post.title}</Link>
      <h2>{ thisPost.price }</h2>
      <Outlet />
    </div>
  );
}

export default TradingBoardEntry;