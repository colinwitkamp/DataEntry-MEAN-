'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },  //  Record
  record: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  ordinate: {
    type: String,
    default: ''
  },
  genus: {
    type: String,
    default: ''
  },
  species: {
    type: String,
    default: ''
  },
  animal: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  reference: {
    type: String,
    default: ''
  }
});

mongoose.model('Article', ArticleSchema);
