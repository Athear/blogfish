const router = require('express').Router();
const { User,Article } = require('../models');
const withAuth = require('../utils/auth');

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

  res.render('login');
});

module.exports = router;
