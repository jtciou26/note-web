import React from 'react';

const ImageModal = ({ onClose, children, width, height }) => {
  const modalStyle = {
    width: width || 'auto',
    height: height || 'auto'
    /* Add other modal styles as needed */
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default ImageModal;
