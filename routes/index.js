var express = require('express');
var router = module.exports = express.Router();
var Task = require('../models').Task;

router.get('/', (req, res) => {
  Task.findAll().then((tasks) => {
    var viewModel = { tasks: tasks };
    res.render('index', viewModel);
  });
});

router.post('/', (req, res) => {
  Task.create(req.body).then(() => {
    Task.findAll().then((tasks) => {
      var viewModel = { tasks: tasks };
      res.render('index', viewModel);
    });
  });
});

router.post('/state', (req, res) => {
  Task.update({ done: req.body.done ? true : false }, { where: { id: req.body.id } }).then(() => {
    res.redirect('/');
  });
});
