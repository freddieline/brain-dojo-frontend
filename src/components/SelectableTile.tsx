 import React from 'react';
 type InputProps = {
  id:string;
  src: string;
  onClick: (item: string) => void;
  show: boolean;
  selected: boolean;
 }

const SelectableTile: React.FC<InputProps> = ({ id, src, onClick, show, selected }) => {

  function handleOnClick() {
    onClick(id);
  }

  const hiddenClass = show ? '': " invisible";
  const selectedClass = selected ? " select" : '';

  return <button key={id} 
            className={"w-110 mr-2 mb-2 h-auto bg-white border-4 border-gray-300 select-card hover:border-blue-700 hover:border-4" + hiddenClass + selectedClass} 
            onClick={handleOnClick}>
          <img width={110} height="auto" src={src}></img>
        </button>
}

export default React.memo<InputProps>(SelectableTile);