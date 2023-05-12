const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */

// !!! IF COPYING TEXT FROM ELSEWHERE, MAKE SURE TO RE-WRITE IT. IT COULD GIVE YOU AN ERROR BECAUSE OF FONT !!!
router.post('/', (req, res) => {
  // endpoint functionality
  console.log(`In POST request`, req.body);
  let queryText = `Insert Into "item" ("description", "image_url", "user_id")
  Values ($1, $2, $3);`;
  pool.query(queryText,
    [req.body.description, req.body.image_url, req.user.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  console.log('In DELETE request', req.params);
  let queryText = `DELETE FROM "item" WHERE "id" = $1`
  pool.query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});
module.exports = router;
