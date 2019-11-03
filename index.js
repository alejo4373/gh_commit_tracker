const express = require('express');
const morgan = require('morgan');
const { getClassCommits, sortCommitsByPushedDate } = require('./commits')

const PORT = process.env.PORT || 3100;
const app = express();

app.use(morgan('common'));

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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: `${err.message}. See the server logs for more details`,
    payload: null
  })
})

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`)
})
