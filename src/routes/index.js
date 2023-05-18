const express = require('express');
const db = require("../db/firebase")
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});
router.get('/site-information', async (req, res) => {

  const query = await db.collection("site").orderBy("write", "desc").limit(1).get()
  const doc = query.docs[0]
  if (!doc) {
    res.send({ error: "no data site" })
  }
  const information = doc.data()
  res.send(information)
})
router.put('/site-information', async (req, res) => {
  const payload = req.body
  await db.collection("site").add({ payload, write: new Date() })
  res.send({ message: "succesfully updated" })
})
module.exports = router;
