// src/RepoList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CircularProgress,
  Box,
  Avatar,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/orgs/godaddy/repos')
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        📁 GoDaddy Repositories
      </Typography>
      <Grid container spacing={3}>
        {repos.map(repo => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <Card
              sx={{
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                },
              }}
            >
              <CardActionArea
                component={Link}
                to={`/repo/${repo.name}`}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                      <FolderIcon />
                    </Avatar>
                    <Typography variant="h6" noWrap>
                      {repo.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {repo.description || 'No description available.'}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RepoList;
