// /*eslint-env es6*/
const dummy = (blogs) => {
  return 1;
}

const totalLikes = blogsList => {
  return blogsList.reduce((accumulated, blogArray) => {
    return accumulated + blogArray.likes;
  }, 0);
};

const favoriteBlog = blogsList => {
	const maxLikes = Math.max.apply(0, blogsList.map(blog => blog.likes))
	const fav = blogsList.filter(blog => blog.likes === maxLikes);
	return fav.length === 0 ? null : fav ;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}