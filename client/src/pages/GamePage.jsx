import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Stack,
} from "@mui/material";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { API_URL } from "../../constants.ts";
import CircularProgress from "@mui/material/CircularProgress";

const GameCard = ({ title, description }) => (
  <Card sx={{ display: "flex", alignItems: "center", mb: 2, p: 2 }}>
    <Box
      sx={{
        width: 50,
        height: 50,
        bgcolor: "#f0f0f0",
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
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton>
        <ShareIcon />
      </IconButton>
      <IconButton>
        <BookmarkBorderIcon />
      </IconButton>
    </Stack>
  </Card>
);

const GamePage = () => {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_URL}/games`);
        setLoading(false)
        setGameList(res.data);
      } catch (err) {
        console.error("Failed to fetch games", err);
        setLoading(false)
      }
    };
    fetchGames();
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: "#eee", minHeight: "100vh", mt: -6 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Newest Game
  
      </Typography>
      <Card
        sx={{
          height: 400,

          borderRadius: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <PlayArrowIcon sx={{ fontSize: 50, color: "blue" }} />
      </Card>

      {/* More Games */}
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        More games for you
      </Typography>
      <div>
        {loading?
        (
        <div className="flex justify-center">
              <CircularProgress size={100}/>
        </div>
    
      ):
      (<ul>
        {gameList.map((game, index) => (
          <li>
            <a href={game.url} style={{ textDecoration: 'none' }}>
              <GameCard
                key={index}
                title={game.title}
                description={game.description}
              />
            </a>
          </li>
        ))}
      </ul>)}
      
      </div>
      
    </Box>
  );
};

export default GamePage;
