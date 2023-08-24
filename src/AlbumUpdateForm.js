import React, { useState } from 'react';
import axios from 'axios';

function AlbumUpdateForm({ album, onUpdateSuccess }) {
  const [title, setTitle] = useState(album.title);
  const [artist, setArtist] = useState(album.artist);
  const [genre, setGenre] = useState(album.genre);
  const [availability, setAvailability] = useState(album.availability);
  const [store, setStore] = useState(album.store);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/api/albums/${album.id}`, {
        title,
        artist,
        genre,
        availability,
        store
      });

      if (response.status === 200) {
        console.log('Album updated successfully');
        onUpdateSuccess();
      }
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Album</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Artist:</label>
        <input type="text" value={artist} onChange={e => setArtist(e.target.value)} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
      </div>
      <div>
        <label>Availability:</label>
        <input
          type="checkbox"
          checked={availability}
          onChange={e => setAvailability(e.target.checked)}
        />
      </div>
      <div>
        <label>Store:</label>
        <input
          type="text"
          value={store.name} // Display the store name
          onChange={e => setStore({ ...store, name: e.target.value })} // Update only the name in the store object
        />
      </div>
      <button type="submit">Update Album</button>
    </form>
  );
}

export default AlbumUpdateForm;
