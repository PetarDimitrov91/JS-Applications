const ALL_MOVIES_URL = 'http://localhost:3030/data/movies';
const ALL_LIKES_URL = 'http://localhost:3030/data/likes ';
const LOGIN_URL = 'http://localhost:3030/users/login';

function movie_likes_url(movieId) {
    return `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;
}

function user_likes_url(movieId, userId) {
    return `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `;
}

export {ALL_MOVIES_URL, ALL_LIKES_URL,LOGIN_URL, movie_likes_url, user_likes_url};