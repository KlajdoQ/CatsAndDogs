import React, { useState } from 'react'
import Animal from './Animal'

export default function AnimalList({ animals, addLikes ,setAnimals }) {
  const [displayCount, setDisplayCount] = useState(5)

  const allanimals = animals
    .slice(0, displayCount)
    .map((animal) => (
      <Animal 
        animal={animal}
        key={animal.id}
        className="animal-list"
        addLikes={addLikes}
        setAnimals={setAnimals}
      />
    ))

  function showMore() {
    setDisplayCount(displayCount + 5)
  }

  return (
    <div className="animal-list">
      <>
        {allanimals}
        <div className="add-more-div">
          <button className="addMoreBtn" onClick={showMore}>
            Show More
          </button>
        </div>
      </>
    </div>
  )
}