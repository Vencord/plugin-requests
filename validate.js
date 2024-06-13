
// an array with all betterDiscordPlugins which end up being banned
const betterDiscordPlugins = [
"https://betterdiscord.app/plugin/FavoriteMedia", // https://github.com/Vencord/plugin-requests/issues/716
"https://github.com/Eidenz/XSOverlay-BetterDiscord",
"https://betterdiscord.app/plugin/ServerCounter",
"https://betterdiscord.app/plugin/RemoveBlockedUsers"
]
const words = [
// test param
    'close-me-if-i-have-this-word',
// extracted from issue template
"Stereo Mic",
"FxTwitter",
"FakeDeafen",
  ...betterDiscordPlugins
].map(e => e.toLowerCase().trim())
const ghApiReq = (path, body) => {
  return fetch(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github+json'
    },
    method: 'PATCH',
    body: JSON.stringify(body)
  })
}
const allContent = process.env.CONTENT

if (words.some(w => allContent.toLowerCase().includes(w))) {
  console.log(`A word was found in the issue.`)
  ghApiReq(`issues/${process.env.ISSUE_NUMBER}`, {
    state: 'closed',
    state_reason: 'not_planned',
    labels: ['rejected-automod']
  }).then((r) => {
    console.log(`Closed maybe?`)
    r.text().then(console.log)
  })
}
