import { useState } from 'react'
import './App.css'

import Counter from './Components/Counter';

function App() {
  const [count, setCount] = useState(0)

  // function updateCount() {
  //  setCount(count+1)
  // }
  
  // arrow function

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
    </>
  )
}

export default App