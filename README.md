# Slack Elasticsearch Indexer

## Installation 

```
npm i slack-elasticsearch-indexer 
# Optional set URL for Elasticsearch bulk indexing
# Default is:
# export LOGSENE_URL=https://logsene-receiver.sematext.com/_bulk
# Use a local Elasticsearch Server: 
# export LOGSENE_URL=http://localhost:9200/_bulk
export INDEX=YOUR_LOGSENE_TOKEN
npm start YOUR_SLACK_TOKEN $INDEX
```

Blog Post: [Slack Analytics & Search with Elasticsearch, Node.js and React] (http://blog.sematext.com/2016/02/11/slack-analytics-search-with-elasticsearch-node-js-and-react/)
