import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (name: string, avatar: string) => void;
  coder: { name: string; avatar: string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onEdit, coder }) => {
  const [name, setName] = React.useState(coder.name);
  const [avatar, setAvatar] = React.useState(coder.avatar);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onEdit(name, avatar);
    onClose();
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Coder</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
