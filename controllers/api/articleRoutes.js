const router = require('express').Router();
const { Article,User,Comment } = require('../../models');

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

  router.get('/:id/comments', async (req, res) => {
    try{
    const articleComments = await Article.findByPk(req.params.id,{
      include:[{model:Comment,
         include:{model:User}, 
         order:[['created_at','ASC']]}]
    });
    res.status(200).json(articleComments);
    }
    catch(err){
      console.log(err)
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

router.put('/:id', async (req,res)=>{
  const { title, content } = req.body;
  try{
    const article = await Article.update({title,content},{where:{Id:req.params.id}})
    res.status(200).json(article);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});


router.post('/:id/comments', async (req, res) => {
  const content = req.body.content
  const user_id = req.session.logged_in
  const article_id = req.params.id
  console.log('here we are')
  try{

  const newComment = await Comment.create({ content,article_id,user_id})

  res.status(200).json(newComment);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req,res)=>{
  try{
    const article = await Article.destroy({where:{Id:req.params.id}})
    res.status(200).json(article);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})

module.exports = router;
