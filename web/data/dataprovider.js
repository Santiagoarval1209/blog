var posts = require("./posts.json");

function getAllPosts(){ return posts; }

function getPostById(id){ return posts.find(a => a.id == id); }

function getCategories() { return [...new Set(posts.map(post => post.category))]; }

module.exports = {
    getAllPosts,
    getPostById,
    getCategories
}