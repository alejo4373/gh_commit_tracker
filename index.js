const axios = require('axios');
const API_URL = 'https://api.github.com';

const usersCommitsMap = {
  //username: [] Commits array
}

const getUserEvents = async (username) => {
  try {
    let { data } = await axios.get(`${API_URL}/users/${username}/events`)
    return data;
  } catch (err) {
    console.log('ERROR =>', err)
  }
}

const extractCommits = (username, events) => {
  const pushEvents = events = events.filter(e => e.type === "PushEvent")
  const savedCommits = [];

  for (let event of pushEvents) {
    let { commits } = event.payload

    for (let commit of commits) {
      const commitObj = {
        repo: event.repo.name,
        username: event.actor.display_login,
        pushed_at: new Date(event["created_at"]),
        message: commit.message,
        sha: commit.sha
      }
      savedCommits.push(commitObj);
    }
  }
  return savedCommits;
}

const main = async () => {
  try {
    const username = 'AminesCodes'
    let events = await getUserEvents(username)
    let commits = await extractCommits(username, events)
    console.log(commits[0])
  } catch (err) {
    throw err;
  }
}

main();

