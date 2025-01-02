const mongoose = require('mongoose');

const PodcastSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String
})

module.exports = mongoose.model('Podcast', PodcastSchema);