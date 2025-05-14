// GameRecommendations.jsx
import React, { useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Stack,
} from '@mui/material';
import axios from 'axios'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const GameCard = ({ title, description }) => (
  <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2 }}>
    <Box
      sx={{
        width: 50,
        height: 50,
        bgcolor: '#f0f0f0',
        borderRadius: 1,
        mr: 2,
      }}
    />
    <Box flexGrow={1}>
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
    <Stack direction="row" spacing={1}>
      <IconButton><FavoriteBorderIcon /></IconButton>
      <IconButton><ShareIcon /></IconButton>
      <IconButton><BookmarkBorderIcon /></IconButton>
    </Stack>
  </Card>
);

const GamePage = () => {
  const [gameList, setGameList] = useState([])
  useEffect(()=>{
    const fetchGames = async()=>{

      try{
        const res = await axios.get('http://localhost:5000/api/games')
        setGameList(res.data);
      }catch(err){
        console.error("Failed to fetch games", err)
      }
    }
    fetchGames()
  },[])

  return (
    <Box sx={{ p: 3, bgcolor: '#eee', minHeight: '100vh' }}>
      
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Newest Game
      </Typography>
      <Card
        sx={{
          height: 400,
     
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <PlayArrowIcon sx={{ fontSize: 50, color: 'blue' }} />
      </Card>

      {/* More Games */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        More games for you
      </Typography>

      {gameList.map((game, index) => (
        <GameCard
          key={index}
          title={game.title}
          description={game.description}
        />
      ))}
    </Box>
  );
};

export default GamePage;
