// an array with all betterDiscordPlugins which end up being banned
const betterDiscordPlugins = [

]
const words = [
  'close-me-if-i-have-this-word',
  ...betterDiscordPlugins
]
const ghApiReq = (path, body) => {
  return fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    method: 'PATCH',
    body: JSON.stringify(body)
  })
}
const allContent = process.env.CONTENT

if (words.some(w => allContent.includes(w))) {
  console.log(`A word was found in the issue.`)
  ghApiReq(`issues/${process.env.ISSUE_NUMBER}`, {
    state: 'closed',
    state_reason: 'not_planned',
    labels: ['rejected-automod']
  })
}
