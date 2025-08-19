// src/RepoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Link as MuiLink,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  ForkRight,
  BugReport,
  Visibility,
  Code,
} from '@mui/icons-material';

function RepoDetails() {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/godaddy/${repoName}`)
      .then(res => res.json())
      .then(data => setRepo(data));
  }, [repoName]);

  if (!repo) return <CircularProgress />;

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>{repo.name}</Typography>
      <Typography variant="body1" gutterBottom>{repo.description}</Typography>

      <MuiLink href={repo.html_url} target="_blank" rel="noopener">
        Visit GitHub Repo
      </MuiLink>

      <Stack direction="row" spacing={2} mt={2}>
        <Chip icon={<Code />} label={`Language: ${repo.language || 'N/A'}`} />
        <Chip icon={<ForkRight />} label={`Forks: ${repo.forks_count}`} />
        <Chip icon={<BugReport />} label={`Open Issues: ${repo.open_issues_count}`} />
        <Chip icon={<Visibility />} label={`Watchers: ${repo.watchers_count}`} />
      </Stack>
    </Box>
  );
}

export default RepoDetails;
