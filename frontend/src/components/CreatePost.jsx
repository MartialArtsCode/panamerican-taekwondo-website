import React, { useState } from 'react';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('author', localStorage.getItem('userId')); // current logged-in user
    formData.append('content', content);
    if (file) formData.append('media', file);

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      body: formData,
    });
    const newPost = await res.json();

    // Pass new post back to Feed
    onPostCreated(newPost);

    // Reset form
    setContent("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your post..."
      />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
