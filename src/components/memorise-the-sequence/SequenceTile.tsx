import React from "react";

interface InputProps {
  id: string;
  src: string;
  show: boolean;
  highlight: boolean;
  animate: boolean;
  incorrectlyGuessed: boolean;
}

const SequenceTile: React.FC<InputProps> = ({
  id,
  src,
  show,
  highlight,
  animate,
  incorrectlyGuessed,
}) => {
  const hiddenClass = show ? "is-flipped " : "";
  const highlightClass = highlight ? "highlight " : "";
  const animateClass = animate ? "animate " : "";
  const wrongClass = incorrectlyGuessed ? "wrong" : "";
  const darkenedClass = incorrectlyGuessed
    ? "absolute inset-0 bg-black bg-opacity-50 pointer-events-none"
    : "";
  console.log(src);
  src = "/" + src;
  return (
    <div
      key={id}
      className={"flip-card w-110 mr-2 mb-2 " + hiddenClass + animateClass}
    >
      <div className="flip-card-inner ">
        <div
          className={"flip-card-front border-4 " + highlightClass + wrongClass}
        ></div>
        <div
          className={
            "flip-card-back border-4 relative " + highlightClass + wrongClass
          }
        >
          <img width={110} height="auto" src={src}></img>
          <div className={darkenedClass}></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo<InputProps>(SequenceTile);
