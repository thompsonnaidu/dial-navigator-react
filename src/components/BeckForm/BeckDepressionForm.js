import React, { useState } from 'react';
import { Form, Button, Container, Card, Row,ProgressBar, Col } from 'react-bootstrap';
import questions from "../../constants/beckQuestion.json";
const BeckDepressionForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState(false);

  const handleNext = () => {
    const selectedOption = answers[currentStep];
    if (selectedOption !== null) {
      setError(false);
      setCurrentStep(currentStep + 1);
    } else {
      setError(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setError(false);
  };

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers];
    option["questionId"]=currentStep+1;
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);
    setError(false);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted answers:', answers);

    const totalScore= answers.reduce((total,answer)=>total+answer.value,0);
    console.log(totalScore)
  };

  return (
    <Container>

      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>Question {currentStep + 1}</Card.Header>

            <Card.Body>
              <Card.Title>{questions[currentStep].title}</Card.Title>
              <Form.Group>
                {questions[currentStep].options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    label={option.name}
                    value={option.value}
                    checked={answers[currentStep]?.value === option.value}
                    onChange={() => handleAnswer(option)}
                  />
                ))}
              </Form.Group>
              {error && <p style={{ color: 'red' }}>Please select an option</p>}
              <Button variant="primary" onClick={handlePrevious}className='mt-4 ml-4' disabled={currentStep === 0}>Previous</Button>{' '}
              { currentStep !== questions.length-1 && <Button variant="primary" className='mt-4 m-r-2' onClick={handleNext} disabled={error}>Next</Button>}
              {currentStep === questions.length - 1 && (
                <Button variant="success" className='mt-4' onClick={handleSubmit}>Submit</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BeckDepressionForm;
