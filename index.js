const express = require('express');
const { getClassCommits, sortCommitsByPushedDate } = require('./commits')

const PORT = 3000;
const app = express();

app.get('/commits', async (req, res) => {
  const lastPushedCommits = await getClassCommits();

  const commitsSorted = sortCommitsByPushedDate(lastPushedCommits)
  const mostRecentFive = commitsSorted.slice(0, 5)
  res.json({
    message: "Retrieved last 5 pushed commits",
    payload: mostRecentFive
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    message: "Not Found",
    payload: null
  })
})

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`)
})
