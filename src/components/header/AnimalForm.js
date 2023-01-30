import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export default function AnimalForm({addNewAnimal}) {
  const [show, setShow] = useState(false);
  
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    breed: '',
    hobbies: ''
  });


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }
  const handleSubmit = () => {
    const newAnimal ={
      ...formData,
      likes: 0
    }
    fetch('http://localhost:3000/animals',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newAnimal)
    })
    .then(response=>response.json())
    .then(addNewAnimal)
  };
 
  return (
    <>
    <button onClick={handleShow} variant="primary" className="nav-links" type="text" ><span className="plus">+</span><span className='new-pet'>New Pet</span></button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>Enter Pet Details </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit} className="add-form" >
          <label>
           Name
            <input
            name="name"
            className="form-input name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Picture
            <input
            name="image"
            className="form-input image"          
              type="text"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Breed
            <input
            name="breed"
            className="form-input breed"          
              type="text"
              value={formData.breed}
              onChange={handleChange}
            />
          </label>
          <label>
            Hobbies
            <textarea
            name="hobbies"
            className="form-input hobbies"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <Modal.Footer>
              <button type="submit" className="addPetBtn">Add </button>
            </Modal.Footer>
        </form>
    </Modal.Body>
    </Modal>
    </>
  )
  
  
}  
