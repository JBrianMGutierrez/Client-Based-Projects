var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product_controller');

/* Should be seen only by suppliers or Website Manager */
router.get('/add_item', product_controller.addItem);

router.post('/add_item', product_controller.product_create);

router.get('/:id', product_controller.product_read);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;