const ogs = require('open-graph-scraper');

export default async function handler(req : any, res : any) {
  const body = JSON.parse(req.body)
  const options = { url: body.url};
  try {
    const data = await ogs(options)
    res.status(200).json({success: true, payload: data.result})
  } catch (error) {
    res.status(200).json({success: false, message: error})
  }
}