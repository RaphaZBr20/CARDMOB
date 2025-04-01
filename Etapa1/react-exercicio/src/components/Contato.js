import React from 'react';

const Contato = ({ nome, telefone, onDelete, onEdit }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{nome}</h3>
            <p>Telefone: {telefone}</p>
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Excluir</button>
        </div>
    );
};

export default Contato;