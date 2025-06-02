import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack,
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

const stats = [
  { value: 17, label: 'Games Played' },
  { value: 31, label: 'Insights Provided' },
  { value: '20%', label: 'Among Players' },
];

const badges = [
  {
    title: 'Game Thrasher',
    icon: <DiamondIcon sx={{ color: 'red' }} />,
    unlocked: true,
    content: <Box sx={{ height: 100, bgcolor: '#fff' }} />,
  },
  {
    title: 'Level Destroyer',
    icon: <CircleIcon sx={{ color: '#444' }} />,
    unlocked: false,
    hint: 'Play more games and reach top 50% among players to unlock.',
  },
  {
    title: 'Level Destroyer',
    icon: <SquareIcon sx={{ color: '#444' }} />,
    unlocked: false,
    hint: 'Play more games and reach top 10% among players to unlock.',
  },
  {
    title: 'Grand Master',
    icon: <ChangeHistoryIcon sx={{ color: '#444' }} />,
    unlocked: false,
    hint: 'Play more games and reach top 1% among players to unlock.',
  },
];

const GiftsPage = () => {
  return (
    <div style={styles.body}>
       <div style={styles.container}>
 <Box sx={{ bgcolor: '#eee', minHeight: '100vh', p: 2 }}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold">
        You are Killing, Jane Doe
      </Typography>
      <Grid container spacing={2} my={2}>
        {stats.map((stat, index) => (
          <Grid item xs={4} key={index} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
            <Card sx={{ mt: 2, height: 35, width:50, bgcolor: '#fff' }}>
                  {stat.value}
              </Card>
            
            </Typography>
            <Typography variant="body2">{stat.label}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* Gifts Section */}
      <Typography variant="h6" fontWeight="bold" mt={3} mb={2}>
        My Gifts
      </Typography>

      <Stack spacing={2}>
        {badges.map((badge, index) => (
          <Box key={index}>
            <Card sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'transparent', mr: 2 }}>{badge.icon}</Avatar>
              <Typography fontWeight="bold">{badge.title}</Typography>
            </Card>

            {badge.unlocked ? (
              <Card sx={{ mt: 1, height: 300, bgcolor: '#fff' }}>
                {badge.content}
              </Card>
            ) : (
              <Card sx={{ mt: 1, height: 300, bgcolor: '#444', color: '#ccc', p: 2 }}>
                <Typography variant="body2">{badge.hint}</Typography>
              </Card>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
    </div>
   
    </div>
   
  );
};

export default GiftsPage;

const styles ={
  container: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
  },
  body:{
    margin: 0,
    padding: 0,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '250px'
  }
}




