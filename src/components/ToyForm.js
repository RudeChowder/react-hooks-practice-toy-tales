import React, { useState } from "react";

function ToyForm({ toysURL, onToyFormSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(formData.name.length > 0 && formData.image.length > 0){
      const newToy = {
        ...formData,
        likes: 0
      }

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
          onToyFormSubmit(data)
          alert(`${data.name} was added!`)
          setFormData({
            name:"",
            image:""
          })
        })
    } else { alert("Cannot submit without a name & image") }
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
