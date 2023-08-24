import React, { useState } from 'react';
import axios from 'axios';

function AlbumList({
  albums,
  onEditClick,
  onDeleteClick,
  onRegisterInterestClick,
  editingAlbumId,
  selectedAlbumId,
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleCustomerEmailChange = (event) => {
    setCustomerEmail(event.target.value);
  };

  const handleInterestSubmission = async (albumId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/albums/${albumId}/register-interest`,
        {
          name: customerName,
          email: customerEmail,
        }
      );

      if (response.status === 200) {
        console.log('Customer interest registered successfully');
        setCustomerName('');
        setCustomerEmail('');
        // Optionally, you can update the albums list or interest count
      }
    } catch (error) {
      console.error('Error registering customer interest:', error);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Genre</th>
          <th>Availability</th>
          <th>Store</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {albums.map(album => (
          <tr key={album.id}>
            <td>{album.title}</td>
            <td>{album.artist}</td>
            <td>{album.genre}</td>
            <td>{album.availability ? 'Available' : 'Not Available'}</td>
            <td>{album.store ? album.store.name : 'N/A'}</td>
            <td>
              {editingAlbumId === album.id ? (
                <button onClick={() => onEditClick(null)}>Cancel</button>
              ) : (
                <div>
                  <button onClick={() => onEditClick(album.id)}>Edit</button>
                  <button onClick={() => onDeleteClick(album.id)}>Delete</button> {/* Add delete button */}
                  <button onClick={() => onRegisterInterestClick(album.id)}>Register Interest</button> {/* Add register interest button */}
                </div>
              )}
            </td>
            <td>
            {selectedAlbumId === album.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={customerName}
                    onChange={handleCustomerNameChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={handleCustomerEmailChange}
                  />
                  
                  <button onClick={() => handleInterestSubmission(album.id)}>
                    Submit Interest
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlbumList;