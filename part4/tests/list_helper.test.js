// /*eslint-env es6*/
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// describe('total likes', () => {
// 	test('of empty list is zero', () => {
// 		expect(listHelper.totalLikes([])).toBe(0)
// 	})	

//   test('when list has only one blog, equals the likes of that', () => {
// 	const listWithOneBlog = [
// 	{
// 	  _id: '5a422aa71b54a676234d17f8',
// 	  title: 'Go To Statement Considered Harmful',
// 	  author: 'Edsger W. Dijkstra',
// 	  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 	  likes: 5,
// 	  __v: 0
// 	}
// 	]
//     const result = listHelper.totalLikes(listWithOneBlog)
//     expect(result).toBe(5)
//   })

//   test('of a bigger list is calculated right', () => {
//     const listWithMultpleBlogs = [
//       {
//         _id: "5a422aa71b54a676234d17f8",
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url:
//           "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 5,
//         __v: 0
//       },
//       {
//         _id: "5a422aa71b54a676234d17f8",
//         title: "Go To Statement Considered Harmful",
//         author: "Edsger W. Dijkstra",
//         url:
//           "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//         likes: 10,
//         __v: 0
//       }
//     ];

//     const result = listHelper.totalLikes(listWithMultpleBlogs);
//     expect(result).toBe(15);  	
//   })
// })

// describe('favoriteBlog returns', () => {
// 	test('null when no blog is passed', () => {
// 		const listWithOneBlog = []
// 		expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(null)		
// 	})	
// 	test('the info of a single blog when only one blog is passed', () => {
// 		const listWithOneBlog = [
// 			{
// 			  _id: '5a422aa71b54a676234d17f8',
// 			  title: 'Go To Statement Considered Harmful',
// 			  author: 'Edsger W. Dijkstra',
// 			  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			  likes: 88897,
// 			  __v: 0
// 			}	
// 			]
// 		const result = listHelper.favoriteBlog(listWithOneBlog)
// 		const exactBlog = listWithOneBlog.filter(blog => blog.likes === result[0].likes);
// 		const exactProps = exactBlog.map(prop => {
// 			return {
// 				title: prop.title,
// 				author: prop.author,
// 				likes: prop.likes,
// 			}
// 		})
// 		expect(exactProps[0]).toEqual({
// 			title: result[0].title,
// 			author: result[0].author,
// 			likes: result[0].likes,
// 		})		
// 	})
// 	test('the info of the blog with the maximum likes when a list of blogs are passed', () => {
// 		const listWithOneBlog = [
// 			{
// 			  _id: '5a422aa71b54a676234d17f8',
// 			  title: 'Go To Statement Considered Harmful',
// 			  author: 'Edsger W. Dijkstra',
// 			  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			  likes: 5,
// 			  __v: 0
// 			},
// 			{
// 			  _id: '5a422aa71b54a676234d17f8',
// 			  title: 'Go To Statement Considered Harmful',
// 			  author: 'Edsger W. Dijkstra',
// 			  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			  likes: 402,
// 			  __v: 0
// 			},
// 			{
// 			  _id: '5a422aa71b54a676234d17f8',
// 			  title: 'Go To Statement Considered Harmful',
// 			  author: 'Edsger W. Dijkstra',
// 			  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			  likes: 20,
// 			  __v: 0
// 			},
// 			{
// 			  _id: '5a422aa71b54a676234d17f8',
// 			  title: 'Go To Statement Considered Harmful',
// 			  author: 'Edsger W. Dijkstra',
// 			  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
// 			  likes: 6,
// 			  __v: 0
// 			}	
// 			]
// 		const result = listHelper.favoriteBlog(listWithOneBlog)
// 		const exactBlog = listWithOneBlog.filter(blog => blog.likes === result[0].likes);
// 		const exactProps = exactBlog.map(prop => {
// 			return {
// 				title: prop.title,
// 				author: prop.author,
// 				likes: prop.likes,
// 			}
// 		})
// 		expect(exactProps[0]).toEqual({
// 			title: result[0].title,
// 			author: result[0].author,
// 			likes: result[0].likes,
// 		})
// 	})
// })
