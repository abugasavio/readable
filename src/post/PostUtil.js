import orderBy from 'lodash/orderBy';

export const sortPosts = (posts, sortBy = 'voteScore') => {
	let sortedPosts;

	if (sortBy === 'voteScore') {
		sortedPosts = orderBy(posts, post => post.voteScore, "desc")
	} else if (sortBy === 'timestamp') {
		sortedPosts = orderBy(posts, post => post.timestamp)
	} else if (sortBy === 'title'){
		sortedPosts = orderBy(posts, post => post.title)
	} else {
		sortedPosts = posts
	}
	console.log(sortedPosts);
	return sortedPosts;
}
