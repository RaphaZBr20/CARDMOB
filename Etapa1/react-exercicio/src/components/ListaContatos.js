import React, { useState } from 'react';
import Contato from './Contato';

const ListaContatos = () => {
    const [contatos, setContatos] = useState([
        { id: 1, nome: 'João Silva', telefone: '(11) 9999-9999' },
        { id: 2, nome: 'Maria Souza', telefone: '(11) 8888-8888' }
    ]);

    const [novoContato, setNovoContato] = useState({ nome: '', telefone: '' });
    const [editando, setEditando] = useState(null);

    const adicionarContato = (e) => {
        e.preventDefault();
        if (editando) {
            setContatos(contatos.map(contato => 
                contato.id === editando ? { ...novoContato, id: editando } : contato
            ));
            setEditando(null);
        } else {
            setContatos([...contatos, { ...novoContato, id: Date.now() }]);
        }
        setNovoContato({ nome: '', telefone: '' });
    };

    const excluirContato = (id) => {
        setContatos(contatos.filter(contato => contato.id !== id));
    };

    const editarContato = (id) => {
        const contato = contatos.find(c => c.id === id);
        setNovoContato({ nome: contato.nome, telefone: contato.telefone });
        setEditando(id);
    };

    return (
        <div>
            <h2>Lista de Contatos</h2>

            <form onSubmit={adicionarContato}>
              <input
                type="text"
                placeholder="Nome"
                value={novoContato.nome}
                onChange={(e) => setNovoContato({ ...novoContato, nome: e.target.value })}
                required
              />
            <input
              type="text"
              placeholder="Telefone"
              value={novoContato.telefone}
              onChange={(e) => setNovoContato({ ...novoContato, telefone: e.target.value })}
              required
            />
            <button type="submit">
                {editando ? 'Atualizar' : 'Adicionar'}
            </button>
            </form>

            {contatos.map (contato => (
                <Contato
                  key={contato.id}
                  nome={contato.nome}
                  telefone={contato.telefone}
                  onDelete={() => excluirContato(contato.id)} 
                  onEdit={() => editarContato(contato.id)}
                />
            ))}
        </div>
    );
};

export default ListaContatos;