import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export default function AnimalForm({addNewAnimal}) {

    //Create a state to control the visibility of the modal on page load 
  const [show, setShow] = useState(false);
    // State to store the form data
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    breed: '',
    hobbies: ''
  });

  // functions to toggle the visibility of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to update the form data in state as the form input values change
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    })
  }
  // Function to submit the form and add a new animal
  const handleSubmit = () => {
    // Creating a new animal object by adding the likes property
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
    {/* Rendering the button to open the modal and the modal itself*/}
    <button onClick={handleShow} variant="primary" className="nav-links" type="text" ><span className="plus">+</span><span className='new-pet'>New Pet</span></button>
    {/* Modal component to display the form to add a new animal*/}
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
      { /*Form to add a new animal*/}
        <form onSubmit={handleSubmit} className="add-form" >
          <label>
           Name
          { /*Input field to enter the animal name*/}
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
            {/*Input field to enter the animal image URL*/}
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
             {/*Input field to enter the animal breed*/}
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
              {/*Input field to enter the animal hobbies*/}
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
