import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from 'vite.svg'
import './App.css'

import Counter from './Components/Counter';
import Photo from './Components/Photo';

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url); // Por padrão executa um request do tipo GET
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
       // console.log(data);
       // correção da imagem thumb
       const updatedPhotos = data.map( (photo) => ({
        ...photo,
        thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
       }));
       // ...photo { id: 1, title: "rotulo", thumbnailUrl: "http:///",...}
       // { photo: { id: 1, title: "rotulo",... }}
        setPhotos(updatedPhotos);
      }

    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }

  }
  
  useEffect(() => {
    fetchPhotos();
  }, []);

  // function updateCount() {
  //  setCount(count+1)
  // }
  
  // arraw function
  // () => () // return implícito
  // () => {} // é necessário colocar

  const updateCount = () => {
    // outros comandos
    return count + 1;
  }
  
  const updateCount1 = () => count + 1; // return é implicito

  const dados = {
    "nome": "fulano",
    "atualiza": (novo_nome) => `Nome nome é $(novo_nome)`,
    "endereco": {
      "rua": "xyz",
      "numero": "111",
      "complementos": ["casa", "na esquina do supermercado ABC"]
    }
  }; // é um objeto JS
  dados.atualiza("gerson")
  dados.endereco.complementos[1] // acessando a refêrencia do endereço
  

  return (
    <>
    <Counter title="Contado..." />
    <Counter initial="100" />
    <article>
      <h1>Album da API</h1>
      {photos.map( (photo) => (
        // <article key={photo.id}>
        //   <h2>ID #{photo.id} {photo.title}</h2>
        //   <img src={photo.thumbnailUrl} alt={photo.title} />
        // </article>
        <Photo photo={photo} />
      ))}
    </article>
    </>
  )
}

export default App