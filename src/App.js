import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumForm from './AlbumForm';
import AlbumList from './AlbumList';
import AlbumUpdateForm from './AlbumUpdateForm'; // Import the AlbumUpdateForm


function App() {
  const [albums, setAlbums] = useState([]);
  const [editingAlbumId, setEditingAlbumId] = useState(null); // Track the album being edited
  const [selectedAlbumId, setSelectedAlbumId] = useState(null); // New state for selected album

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleEditClick = albumId => {
    setEditingAlbumId(albumId);
  };

  const handleUpdateSuccess = () => {
    setEditingAlbumId(null); // Reset editing state
    fetchAlbums(); // Fetch updated albums
  };

  const handleDeleteClick = async (albumId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/albums/${albumId}`);
      if (response.status === 204) {
        console.log('Album deleted successfully');
        fetchAlbums(); // Refresh the album list
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };
  const handleRegisterInterestClick = (albumId) => {
    setSelectedAlbumId(albumId); // Update the selected album ID when registering interest
  };
  return (
    <div>
      <AlbumForm onAlbumCreated={fetchAlbums} />
      {albums.length > 0 && ( // Add conditional rendering check
        <AlbumList
          albums={albums}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onRegisterInterestClick={handleRegisterInterestClick}
          editingAlbumId={editingAlbumId}
          selectedAlbumId={selectedAlbumId}
        />
        )}
      {editingAlbumId && (
        <AlbumUpdateForm
          album={albums.find(album => album.id === editingAlbumId)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default App;
