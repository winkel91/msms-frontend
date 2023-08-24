// AlbumForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AlbumForm({ onAlbumCreated }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [store, setStore] = useState({
    id: 1, // Replace with the actual store ID
    name: 'Store Name', // Replace with the actual store name
    street: 'Store Street',
    city: 'Store City',
    zipcode: '12345'
  });
  const [availability, setAvailability] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/albums', {
        title,
        artist,
        genre,
        availability,
        store // Include the structured store object
      });

      if (response.status === 201) {
        console.log('Album created successfully');
        setTitle('');
        setArtist('');
        setGenre('');
        setStore({
          id: 1, // Reset store ID
          name: 'Store Name', // Reset store name
          street: 'Store Street',
          city: 'Store City',
          zipcode: '12345'
        });
        setAvailability(true);
        onAlbumCreated(); // Call the function provided by App.js
      }
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Album</h2>
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
        <label>Store:</label>
        <input
          type="text"
          value={store.name} // Display the store name
          onChange={e => setStore({ ...store, name: e.target.value })} // Update only the name in the store object
        />
      </div>
      <div>
        <label>Availability:</label>
        <input
          type="checkbox"
          checked={availability}
          onChange={e => setAvailability(e.target.checked)}
        />
      </div>
      <button type="submit">Create Album</button>
    </form>
  );
}

export default AlbumForm;
