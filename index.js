#!/usr/bin/env node
// API Token from https://api.slack.com/web
function slackClient (apiToken, logseneToken) {
  var Slack, autoMark, autoReconnect, slack, slackToken

  Slack = require('@slack/client').RtmClient
  slackToken = apiToken; autoReconnect = true
  autoMark = true
  slack = new Slack(slackToken, {logLevel: 'error'})
  var Logsene = require('logsene-js') 
  var logger =  new Logsene (logseneToken)
  //new Slack(slackToken, autoReconnect, autoMark)

  slack.on('authenticated', function (slack) {
    return console.log('Connected to ' + slack.team.name + ' as @' + slack.self.name)
  })

  slack.on('message' , function (message) {
    var channel = slack.dataStore.getChannelGroupOrDMById(message.channel);

    //var channel = slack.getChannelGroupOrDMByID(message.channel)
    var u = slack.dataStore.getUserById(message.user)
    if (!u) {
      u = {}
    }
    if (!u.profile) {
      u.profile = {}
    }
    var msg = {
      userName: u.name,
      userImage: u.profile.image_48,
      userFirstName: u.profile.first_name,
      userLastName: u.profile.last_name,
      channel: channel.name,
      message: message.text,
      '@timestamp': new Date()
    }
    logger.log ('info', msg.message, msg)
    console.log(msg)
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

if(!process.argv[3]) {
  console.error('Missing Logsene APP token')
  process.exit(1)
}

slackClient(process.argv[2], process.argv[3])
