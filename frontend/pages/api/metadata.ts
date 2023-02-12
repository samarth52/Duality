const ogs = require('open-graph-scraper');

export default async function handler(req : any, res : any) {
  const body = JSON.parse(req.body)
  const options = { url: body.url};
  const data = await ogs(options)
  res.status(200).json(data.result)
}