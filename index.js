#!/usr/bin/env node
// API Token from https://api.slack.com/web
function slackClient (apiToken) {
  var Slack, autoMark, autoReconnect, slack, slackToken

  Slack = require('slack-client')
  slackToken = apiToken; autoReconnect = true
  autoMark = true

  slack = new Slack(slackToken, autoReconnect, autoMark)

  slack.on('open', function () {
    return console.log('Connected to ' + slack.team.name + ' as @' + slack.self.name)
  })

  slack.on('message', function (message) {
    var channel = slack.getChannelGroupOrDMByID(message.channel)
    var u = slack.getUserByID(message.user)
    if (!u) {
      u = {}
    }
    if (!u.profile) {
      u.profile = {}
    }
    return console.log(
      JSON.stringify({
        userName: u.name,
        userImage: u.profile.image_48,
        userFirstName: u.profile.first_name,
        userLastName: u.profile.last_name,
        channel: channel.name,
        message: message.text,
        '@timestamp': new Date()}))
  })

  slack.on('error', function (err) {
    return console.error('Error', err)
  })

  slack.login()

}
if(!process.argv[2]) {
  console.error('Missing Slack Web API token')
  process.exit(1)
}

slackClient(process.argv[2])
