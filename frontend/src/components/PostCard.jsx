
import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { deletePost, likePost, addComment, updatePost, deleteComment } from '../api/endpoints';

const PostCard = ({ post, currentUser, onDelete, onEdit }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const isAdmin = currentUser?.role === "admin";
  const { showNotification } = useNotification();

  const handleDelete = async () => {
    await deletePost(post._id);
    showNotification('Post deleted', 'info');
    if (onDelete) onDelete(post._id);
  };

  const handleLike = async () => {
    const res = await likePost(post._id);
    setLikes(res.data.likes.length);
    showNotification('You liked a post', 'info');
  };

  const handleComment = async (text) => {
    const res = await addComment(post._id, text);
    setComments(res.data.comments);
    showNotification('Comment added', 'info');
  };

  const handleEdit = async () => {
    const res = await updatePost(post._id, { content: editContent });
    setEditing(false);
    showNotification('Post updated', 'info');
    if (onEdit) onEdit(res.data);
  };

  return (
    <div className="post-card bg-white rounded shadow p-4 mb-4 flex flex-col gap-2 w-full sm:w-auto" style={{ maxWidth: 600 }}>
      <h4 className="text-lg font-semibold mb-1">{post.author?.name}</h4>
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full p-2 border rounded" />
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white rounded px-4 py-2 w-full sm:w-auto" onClick={handleEdit}>Save</button>
            <button className="bg-gray-300 rounded px-4 py-2 w-full sm:w-auto" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <p className="mb-2 break-words">{post.content}</p>
      )}
      {post.mediaUrl && <img src={`http://localhost:5000${post.mediaUrl}`} alt="media" className="rounded w-full max-h-64 object-cover mb-2" />}
      <button className="bg-green-500 text-white rounded px-4 py-2 w-full sm:w-auto mb-2" onClick={handleLike}>👍 {likes}</button>
      <div className="comments bg-gray-50 rounded p-2">
        <h5 className="font-bold mb-1">Comments</h5>
        <div className="flex flex-col gap-1">
          {comments.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <p className="m-0 text-sm"><strong>{c.author?.name}:</strong> {c.text}</p>
              {(isAdmin || c.author?._id === currentUser?._id) && (
                <button
                  className="bg-red-500 text-white rounded px-2 py-1 text-xs w-full sm:w-auto"
                  onClick={async () => {
                    await deleteComment(post._id, c._id);
                    setComments(comments.filter(com => com._id !== c._id));
                    showNotification('Comment deleted', 'info');
                  }}
                >Delete</button>
              )}
            </div>
          ))}
        </div>
        <input type="text" placeholder="Add comment..." 
               className="w-full p-2 border rounded mt-2"
               onKeyDown={e => e.key === 'Enter' && handleComment(e.target.value)} />
      </div>
      {/* Admin-only controls */}
      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <button className="bg-red-600 text-white rounded px-4 py-2 w-full sm:w-auto" onClick={handleDelete}>Delete</button>
          <button className="bg-blue-500 text-white rounded px-4 py-2 w-full sm:w-auto" onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
