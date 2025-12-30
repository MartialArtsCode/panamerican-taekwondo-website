import api from './index';

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Posts
export const getPosts = () => api.get('/posts');
export const createPost = (data) => api.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Comments
export const addComment = (postId, text) => api.post(`/posts/${postId}/comment`, { text });
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);

// Likes
export const likePost = (postId) => api.post(`/posts/${postId}/like`);

// Profile
export const updateProfile = (data) => api.post('/profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });

// User
export const getUser = () => api.get('/profile');
