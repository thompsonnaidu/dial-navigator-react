import React, { useState } from 'react';
import { Form, Button, Container, Card, Row,ProgressBar, Col } from 'react-bootstrap';
import questions from "../../constants/beckQuestion.json";
import axios from 'axios';
import BASEURL from '../../config/baseurl';
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router';
const BeckDepressionForm = ({taskId,...props}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [error, setError] = useState(false);

  const navigate= useNavigate();
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
    option["score"]=option.value;
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);
    setError(false);
  };
  const {currentUser}= useAuth();
  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted answers:', answers);

    const totalScore= answers.reduce((total,answer)=>total+answer.value,0);
    console.log(totalScore)
    const submitAnswer= async()=>{
        try {
            const {data}=await axios.put(`${BASEURL}/api/beckquestion/${taskId}`,{answer:answers},{headers:{authToken:currentUser?.accessToken}})
            console.log("data",data);
            
            navigate("/client/dashboard")
          } catch (error) {
          
        }
    }
    submitAnswer();
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
