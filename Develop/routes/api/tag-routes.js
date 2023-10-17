const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });
    res.json(dbTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one tag by its ID
router.get('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.json(dbTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a tag
router.put('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;