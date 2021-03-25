const router = require('express').Router();
const { Article,User } = require('../../models');

router.get('/', async (req, res) => {
    try{
    const articles = await Article.findAll({
      include:[{model:User}]
    });
    res.status(200).json(articles);
    }
    catch(err){
      res.status(500).json(err);
    }
  });

module.exports = router;
