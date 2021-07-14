import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const toysUrl = "http://localhost:3001/toys"

  useEffect(() => {
    fetch(toysUrl)
      .then(resp => resp.json())
      .then(data => {
        setToys(data)
      })
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleToyFormSubmit = (newToy) => {
    setToys([...toys, newToy])
  }

  const handleDeleteToy = (id) => {
    const configObj = { method: "DELETE" }

    fetch(`${toysUrl}/${id}`, configObj)

    const updatedToys = toys.filter(toy => toy.id !== id)
    setToys(updatedToys)
  }

  const handleLikeToy = (id, likes) => {
    const configObj = {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    }

    fetch(`${toysUrl}/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        const updatedToys = toys.map(toy => {
          if (toy.id === id) {
            return data
          } else {
            return toy
          }
        })
        
        setToys(updatedToys)
      })
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm toysURL={toysUrl} onToyFormSubmit={handleToyFormSubmit}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onLikeToy={handleLikeToy}/>
    </>
  );
}

export default App;
