import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy, onLikeToy }) {
  const toyComponents = toys.map(toy => {
    return(
      <ToyCard 
        key={toy.id}
        id={toy.id}
        name={toy.name}
        image={toy.image}
        likes={toy.likes}
        onDeleteToy={onDeleteToy}
        onLikeToy={onLikeToy}
      />
    )
  })

  return (
    <div id="toy-collection">{toyComponents}</div>
  );
}

export default ToyContainer;
