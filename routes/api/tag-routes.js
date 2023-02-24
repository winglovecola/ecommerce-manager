const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }


});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data



  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with given ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if (!req.body.tag_name)
  {
    res.status(400).json("Please specify a tag name in the body");
  }

  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  if (!req.body.tag_name)
  {
    res.status(400).json("Please specify a tag name in the body");
  }

  try {
    const tagData = await Tag.update(
      {tag_name: req.body.tag_name}, 
      {where: {id: req.params.id}}
    );

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with given ID!' });
      return;
    }

    if (tagData)
      res.status(200).json(`Tag ${req.params.id} has been updated.`);
    else
      res.status(200).json(`Failed to update Tag ${req.params.id}.`);

      
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value


  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with given ID!' });
      return;
    }
    if (tagData)
      res.status(200).json(`Tag ${req.params.id} has been removed.`);
    else
      res.status(200).json(`Failed to remove Tag ${req.params.id}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
