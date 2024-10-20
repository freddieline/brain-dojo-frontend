import { Button } from "flowbite-react";
import Thermometer from 'react-thermometer-component'
import { Link } from "react-router-dom";
import { getEmoji, getMotivation, getScore } from "../lib/getGrade";

type InputProps = {
  quizName: string;
  numberCorrect: number;
  totalQuestions: number;
  onClick: () => void;
}

// const submitFormData = async (formData: Feedback): Promise<any> => {
//   const url = import.meta.env['VITE_QUIZ_API'] + "/api/feedback";
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(formData),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to submit form data');
//   }

//   return response.json();
// }

const Results: React.FC<InputProps> = ({quizName, numberCorrect, totalQuestions, onClick}) => {

  const percentageScore: number = (numberCorrect / totalQuestions) *100;

  const grade = getScore(percentageScore);
  const emoji = getEmoji(grade);
  const motivation = getMotivation(grade);


  // const [formData, setFormData ] = useState<Feedback>({
  //   quizName: quizName,
  //   feedback: ''
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     feedback: value
  //   }));
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   mutation.mutate(formData);
  // };

  // const mutation = useMutation({
  //   mutationFn: submitFormData,
  //   onSuccess: () => {
  //     setFormData({
  //       quizName: quizName,
  //       feedback: '',
  //       }); 
  //   },
  // });

  // const feedbackHidden =  mutation.isSuccess ? " hidden" : " ";

  function handleOnClick(){
    onClick();
  }

  return (
    <div>
      <p className="text-lg font-bold text-center">{motivation} You got {numberCorrect} of {totalQuestions} correct in</p> 
      <p className="text-lg font-bold text-center">the {quizName} quiz</p>
        {/* <p className={"font-bold mb-2 mt-4" + feedbackHidden}>Additional feedback</p>
        <Textarea id="feedback" onChange={handleChange} rows={3} className={'w-500'+feedbackHidden}></Textarea>
        <div className="flex flex-row mt-4 gap-3">
          <Button type="submit" disabled={mutation.isPending} color="gray" className={"rounded-lg border-4 border-blue-800 p-2 font-bold"+feedbackHidden}>
            {mutation.isPending ? 'Submitting...' : 'Submit feedback'}
          </Button>
        </div> */}
        <div className="mt-10 mb-10 flex flex-row items-center justify-center">
          <div className="text-[70px]">{emoji}</div>
          <Thermometer
            theme="light"
            value={numberCorrect}
            max={totalQuestions}
            size="large"
            height="200"
            reverseGradient={true}
          />
        </div>
        <div className="flex flex-row mt-5 gap-3 items-center justify-center">
          <a><Button onClick={handleOnClick} className="rounded-lg border-4 border-blue-700 p-2 font-bold text-gray bg-blue-500 text-white">Retry</Button></a>
          <Link to="/"><Button className="rounded-lg border-4 border-blue-700 p-2 font-bold text-slate-600">Back to main menu</Button></Link>
        </div>
    </div>
  )

}

export default Results;