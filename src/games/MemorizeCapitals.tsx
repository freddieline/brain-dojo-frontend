import { AssociationRecall } from "../games-engines/AssociationRecall";

export const MemoriseCapital = () => {
  return (
    <AssociationRecall
      apiUrl="/api/capitals?continent=europe"
      recallInstruction="Memorise the capital cities"
      playInstruction="Enter the capital city"
    ></AssociationRecall>
  );
};