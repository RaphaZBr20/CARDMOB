import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://10.81.205.34:3000/compras';

const App = () => {
  const [compras, setCompras] = useState([]);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Erro ao carregar compras:', error);
    }
  };

  const adicionarItem = async () => {
    if (!item || !quantidade) return;

    const novaCompra = {
      item,
      quantidade: parseInt(quantidade),
    };

    try {
      let response;
      if (editandoId) {
        // Atualizar item existente
        response = await fetch(`${API_URL}/${editandoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novaCompra),
        });
      } else {
        // Adicionar novo item
        response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novaCompra),
        });
      }

      if (response.ok) {
        setItem('');
        setQuantidade('');
        setEditandoId(null);
        carregarCompras();
      }
    } catch (error) {
      console.error('Erro ao salvar compra:', error);
    }
  };

  const editarItem = (compra) => {
    setItem(compra.item);
    setQuantidade(compra.quantidade.toString());
    setEditandoId(compra.id);
  };

  const removerItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        carregarCompras();
      }
    } catch (error) {
      console.error('Erro ao remover compra:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Compras</Text>

      <TextInput
        style={styles.input}
        placeholder="Item"
        value={item}
        onChangeText={setItem}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Button
        title={editandoId ? "Atualizar" : "Adicionar"}
        onPress={adicionarItem}
      />

      <FlatList
        data={compras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.item} - {item.quantidade}
            </Text>

            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editarItem(item)} />
              <Button title="Remover" onPress={() => removerItem(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default App;