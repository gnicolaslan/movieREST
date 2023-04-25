const router = require('express').Router();
const { list, detail, update, store, destroy } = require('../../controllers/genresController');

router.get('/', list);
router.get('/:id', detail);
router.post('/', store)
router.put('/:id', update)
router.delete('/:id', destroy)


module.exports = router;