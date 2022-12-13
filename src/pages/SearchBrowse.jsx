import React, { useState } from 'react';
import '@/styles/browse.scss';

function SearchBrowse() {
  const [items, setItems] = useState([]);
  return (
    <div className="search">
      <header className="search__header">
        <input type="text" className="search__input" />
      </header>
      <div className="search__body container">
        Elementos resultantes aquí Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Numquam pariatur tenetur voluptatibus? Itaque, dolorum
        veniam nemo officia veritatis exercitationem labore atque nulla? Earum
        molestias voluptate nesciunt doloribus. Inventore, quaerat nulla? Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Numquam pariatur
        tenetur voluptatibus? Itaque, dolorum veniam nemo officia veritatis
        exercitationem labore atque nulla? Earum molestias voluptate nesciunt
        doloribus. Inventore, quaerat nulla? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Numquam pariatur tenetur voluptatibus?
        Itaque, dolorum veniam nemo officia veritatis exercitationem labore
        atque nulla? Earum molestias voluptate nesciunt doloribus. Inventore,
        quaerat nulla? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Numquam pariatur tenetur voluptatibus? Itaque, dolorum veniam nemo
        officia veritatis exercitationem labore atque nulla? Earum molestias
        voluptate nesciunt doloribus. Inventore, quaerat nulla? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Numquam pariatur tenetur
        voluptatibus? Itaque, dolorum veniam nemo officia veritatis
        exercitationem labore atque nulla? Earum molestias voluptate nesciunt
        doloribus. Inventore, quaerat nulla? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Numquam pariatur tenetur voluptatibus?
        Itaque, dolorum veniam nemo officia veritatis exercitationem labore
        atque nulla? Earum molestias voluptate nesciunt doloribus. Inventore,
        quaerat nulla? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Numquam pariatur tenetur voluptatibus? Itaque, dolorum veniam nemo
        officia veritatis exercitationem labore atque nulla? Earum molestias
        voluptate nesciunt doloribus. Inventore, quaerat nulla? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Numquam pariatur tenetur
        voluptatibus? Itaque, dolorum veniam nemo officia veritatis
        exercitationem labore atque nulla? Earum molestias voluptate nesciunt
        doloribus. Inventore, quaerat nulla?
      </div>
    </div>
  );
}

export default SearchBrowse;
