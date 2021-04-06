const router = require('express').Router();
const { User,Article,Comment } = require('../models');
const withAuth = require('../utils/auth');
const mainTitle = 'Blogfish'


router.get('/', withAuth, async (req, res) => {
  try {
    const articles = await Article.findAll({
      include:[{model:User,attributes:['name']}],
      order:[['created_at','ASC']]
    });

    const articleArray= articles.map((article) => article.get({ plain: true }));

    res.render('homepage', {
      articleArray,
      logged_in: req.session.logged_in,
      title:mainTitle
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const articles = await Article.findAll({
      include:[{model:User,attributes:['name']}],
      order:[['created_at','ASC']],
      where:{user_id:req.session.user_id}
    });

    const articleArray= articles.map((article) => article.get({ plain: true }));

    res.render('dashboard', {
      articleArray,
      logged_in: req.session.logged_in,
      title:'Dashboard'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', withAuth, async (req, res) => {
  try {
    res.render('post', {
      logged_in: req.session.logged_in,
      title: mainTitle
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login',{title:'Blogfish'});
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const articleComments = await Article.findByPk(req.params.id);

    const article = articleComments.get({ plain: true });

    res.render('new-comment', {
      article,
      logged_in: req.session.logged_in,
      title:mainTitle
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/:id/comments', withAuth, async (req, res) => {
  try {
    const articleComments = await Article.findByPk(req.params.id,{
      include:[{model:Comment,
         include:{model:User}, 
         order:[['created_at','ASC']]}]
    });

    const article = articleComments.get({ plain: true });
    const commentArray= articleComments.comments.map((article) => article.get({ plain: true }));

    res.render('single-article', {
      article,
      commentArray,
      logged_in: req.session.logged_in,
      title:mainTitle
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});



module.exports = router;
