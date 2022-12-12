import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@/styles/browse.scss';

function SearchBrowse({ closeButton }) {
  const [items, setItems] = useState([]);
  return (
    <div className="search">
      <header className="search__header">
        <input type="text" className="search__input" />
        <div className="search__close">{closeButton}</div>
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

SearchBrowse.defaultProps = {
  closeButton: null
};

SearchBrowse.propTypes = {
  closeButton: PropTypes.element
};

export default SearchBrowse;
