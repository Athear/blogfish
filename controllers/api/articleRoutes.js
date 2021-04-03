const router = require('express').Router();
const { Article,User } = require('../../models');

router.get('/', async (req, res) => {
    try{
    const articles = await Article.findAll({
      include:[{model:User,attributes:['name']}],
      order:[['created_at','ASC']]
    });
    res.status(200).json(articles);
    }
    catch(err){
      res.status(500).json(err);
    }
  });

router.post('/', async (req,res)=>{
  const { title, content } = req.body;
  try{
    const article = await Article.create({title,content})
    res.status(200).json(article);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
