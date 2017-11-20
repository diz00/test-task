const mongoose = require("mongoose");

const { Schema } = mongoose;

const changeSchema = new Schema({
  articleUrl: {
    type: String,
    trim: true,
    required: "You must supply an article URL"
  },
  originalText: {
    type: String,
    trim: true,
    required: "You must supply original text"
  },
  usersText: {
    type: String,
    trim: true,
    required: "You must supply users text"
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false
  }
});

/* eslint-disable */
changeSchema.statics.getSuggestions = function() {
  return this.aggregate([
    {
      $group: {
        _id: "$originalText",
        suggestions: { $push: "$$ROOT" }
      }
    }
  ]);
};

module.exports = mongoose.model("Change", changeSchema);
