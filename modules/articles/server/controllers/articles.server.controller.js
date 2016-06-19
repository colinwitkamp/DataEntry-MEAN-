'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var article = new Article(req.body);
  article.user = req.user;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var article = req.article ? req.article.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  article.isCurrentUserOwner = !!(req.user && article.user && article.user._id.toString() === req.user._id.toString());

  res.json(article);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  //  Check if User's role is not 'admin'
  if (req.user.roles.indexOf('admin') < 0) {
    return res.status(400).send({
      message: 'The user is not an Admininistrator.'
    });
  }
  var article = req.article;

  article.record = req.body.record;
  article.ordinate = req.body.ordinate;
  article.title = req.body.title;
  article.name = req.body.name;
  article.genus = req.body.genus;
  article.species = req.body.species;
  article.animal = req.body.animal;
  article.notes = req.body.notes;
  article.reference = req.body.reference;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  //  Check if User's role is not 'admin'
  if (req.user.roles.indexOf('admin') < 0) {
    return res.status(400).send({
      message: 'The user is not an Admininistrator.'
    });
  }
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
* Search Articles : Search API
*/
exports.search = function(req, res) {
  var field = req.query.field;
  var search_string = new RegExp('.*' + req.query.search + '.*', "i");

  console.log('field:' + req);
  console.log('search:' + search_string);
  var search_dic = {};
  var query;
  if (field === 'all') { // If you want to search over all fields or query is applied
    search_dic = {
      $or: [
        {
          record: search_string
        }, {
          ordinate: search_string
        }, {
          title: search_string
        }, {
          genus: search_string
        }, {
          species: search_string
        }, {
          animal: search_string
        }, {
          name: search_string
        }, {
          notes: search_string
        }, {
          reference: search_string
        }
      ]
    };
  } else {
    search_dic[field] = search_string; // Build search query
  }
  Article.find(search_dic, function(err, doc) {
    res.json(doc); // Retrieve the articles by json.
  });


};

/**
 * Article middleware --Retrieve Articles from MongoDB
 */
exports.articleByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
