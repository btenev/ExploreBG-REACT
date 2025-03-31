import './FAQ.scss';
import QA from '../../components/QA';
import { questions } from './faqContent';

const FAQ = () => {
  return (
    <main className="faq">
      <section className="faq__qa">
        <section className="faq__qa__top">
          <h3>{questions.titles['h3-first']}</h3>
          <h3>{questions.titles['h3-second']}</h3>
        </section>

        <h1>{questions.titles.h1}</h1>

        <QA questionsContent={[questions[1], questions[2]]} />
      </section>
    </main>
  );
};

export default FAQ;
