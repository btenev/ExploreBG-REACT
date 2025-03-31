import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';

import './QA.scss';

interface IQuestion {
  id: number;
  ask: string;
  answer: string;
}

interface Props {
  questions: IQuestion[];
}

const QA = ({ questions }: Props) => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleQuestion = (id: number) =>
    openQuestionId === id ? setOpenQuestionId(null) : id;

  return questions.map((question) => (
    <article
      className="question-wrapper"
      key={question.id}
      onClick={() => toggleQuestion(question.id)}
    >
      <div className="question-wrapper__question">
        <p>{question.ask}</p>
        {openQuestionId !== question.id ? <FiPlus /> : <MdClear />}
      </div>

      {openQuestionId === question.id && (
        <p className="question-wrapper__answer">{question.answer}</p>
      )}
    </article>
  ));
};

export default QA;
