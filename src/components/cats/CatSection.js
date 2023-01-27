import React, {useState, useEffect} from 'react'
import CatFact from './CatFact'
import CatsHeader from './CatsHeader'
import FeaturedCat from './FeaturedCat'
import FeaturedHeader from './FeaturedHeader'

export default function CatFactsList() {
  const [facts, setFacts] = useState([])


  useEffect(() =>{
    fetch('https://cat-fact.herokuapp.com/facts')
    .then((response) =>response.json())
    .then(setFacts)
  },[])



  return ( 
    <div className="cats">
      <CatsHeader />
      <ol className="cat-fact-list" >
          {
            facts.map(fact => (
              <CatFact key={fact.text} fact={fact}/>
            ))
          }
      </ol>
      <FeaturedHeader />
      <FeaturedCat />
    </div>
  )
}
