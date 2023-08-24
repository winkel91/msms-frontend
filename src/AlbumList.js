import React from 'react';

function AlbumList({
  albums,
  onEditClick,
  onDeleteClick,
  onRegisterInterestClick,
  editingAlbumId,
  selectedAlbumId,
}) {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlbumList;