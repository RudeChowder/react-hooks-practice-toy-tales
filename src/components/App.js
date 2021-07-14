import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const toysURL = "http://localhost:3001/toys"

  useEffect(() => {
    fetch(toysURL)
      .then(resp => resp.json())
      .then(data => {
        setToys(data)
      })
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleToyFormSubmit = (newToy) => {
    return new Promise((resolve, reject) => {
      const configObj = {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newToy)
      }

      fetch(toysURL, configObj)
      .then(resp => resp.json())
      .then(data => {
        setToys([...toys, data])
        alert(`${data.name} was added!`)
        resolve("success")
      })
      .catch(() => {
        alert("Something broke!")
        reject("failed")
      })
    })
  }

  const handleDeleteToy = (id) => {
    const configObj = { method: "DELETE" }

    fetch(`${toysURL}/${id}`, configObj)

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

    fetch(`${toysURL}/${id}`, configObj)
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
      {showForm ? <ToyForm toysURL={toysURL} onToyFormSubmit={handleToyFormSubmit}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onLikeToy={handleLikeToy}/>
    </>
  );
}

export default App;
