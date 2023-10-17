const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.json(dbCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get specific category
router.get('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    
    res.json(dbCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.json(dbCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json(dbCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.json(dbCategoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;