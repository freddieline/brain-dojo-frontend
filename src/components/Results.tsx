import { useState } from 'react';
import { Answer, Feedback, QuizQuestion } from '../types/types'
import { Textarea , Button } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  useMutation,
} from '@tanstack/react-query';

type InputProps = {
  answers: Answer[];
  questions: QuizQuestion[];
}

const submitFormData = async (formData: Feedback): Promise<any> => {
  const url = import.meta.env['VITE_QUIZ_API'] + "/api/feedback";
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form data');
  }

  return response.json();
}

const Results: React.FC<InputProps> = ({answers, questions}) => {

  const [formData, setFormData ] = useState<Feedback>({
    quizName: questions[0].quizName,
    feedback: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      feedback: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: submitFormData,
    onSuccess: () => {
      setFormData({
        quizName: questions[0].quizName,
        feedback: '',
        }); 
    },
  });

  let likedAnswers: Answer[] = [];
  if (answers.length > 0){
    likedAnswers = answers.reduce((accum: Answer[], answer) => {
      if(answer.like) {
        accum.push(answer);
        return accum;
      } else { 
        return accum
      }
    },[]);
  }

  let dislikedAnswers: Answer[] = [];
  if (answers.length > 0){
    dislikedAnswers = answers.reduce((accum: Answer[], answer) => {
      if(answer.like == false) {
        accum.push(answer);
        return accum;
      } else { 
        return accum
      }
    },[]);
  }

  const feedbackHidden =  mutation.isSuccess ? " hidden" : " ";

  return (<form onSubmit={handleSubmit}>
    <h1 className="text-2xl bold mb-4 font-bold">&#127881; Well done! &#127881;</h1>
    <p className="font-bold">You got {answers.filter((answer) => answer.isCorrect).length} of {questions.length} correct</p>
   
      { likedAnswers.length > 0 && 
        <>
          <p className="font-bold mt-3 mb-2">You liked these questions:</p>
          <ul>
            {likedAnswers.map((answer) => {
                return <li key={answer.question} className="text-sm">{answer.question}. {questions[answer.question - 1].question}</li>
            },'')}
          </ul>
        </>
      }
      { dislikedAnswers.length > 0 && 
        <>
          <p className="font-bold mt-3 mb-2">You did not like these questions:</p>
          <ul>
            {dislikedAnswers.map((answer) => {
                return <li className="text-sm">{answer.question}. {questions[answer.question - 1].question}</li>							
            },'')}
          </ul>
        </>
      }
      <p className={"font-bold mb-2 mt-4" + feedbackHidden}>Additional feedback</p>
      <Textarea id="feedback" onChange={handleChange} rows={3} className={'w-500'+feedbackHidden}></Textarea>
      <div className="flex flex-row mt-4 gap-3">
        <Link to="/"><Button className="rounded-lg border-4 gray-700 p-2 font-bold text-gray">Back to main menu</Button></Link>
        <Button type="submit" disabled={mutation.isPending} color="gray" className={"text-white bg-blue-700 rounded-lg border-4 border-blue-800 p-2 font-bold"+feedbackHidden}>
          {mutation.isPending ? 'Submitting...' : 'Submit feedback'}
        </Button>
      </div>
  </form>
  )

}

export default Results;