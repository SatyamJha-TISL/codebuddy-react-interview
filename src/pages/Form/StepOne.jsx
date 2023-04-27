import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';

const StepOne = ({ setPage, formData, setformData }) => {
  const [firstDetails, setFirstDetails] = useState({
    emailId: formData.emailId,
    password: formData.password,
  });
  const [emailIdError, setemailIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateemailId = () => {
    // eslint-disable-next-line no-console
    console.log('working');
    if (!firstDetails.emailId) {
      setemailIdError('emailId is required.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(firstDetails.emailId)) {
      setemailIdError('emailId is invalid.');
      return false;
    }

    setemailIdError('');
    return true;
  };

  const validatePassword = () => {
    // eslint-disable-next-line no-console
    console.log('working');
    if (!firstDetails.password) {
      setPasswordError('Password is required.');
      return false;
    }

    if (
      !/(?=.*[A-Z]){2,}(?=.*[a-z]){2,}(?=.*[0-9]){2,}(?=.*[^A-Za-z0-9]){2,}/.test(
        firstDetails.password,
      )
    ) {
      setPasswordError(
        'Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.',
      );
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleChange = e => {
    setFirstDetails({ ...firstDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (validateemailId() && validatePassword()) {
      setformData({ ...formData, emailId: firstDetails.emailId, password: firstDetails.password });
      // eslint-disable-next-line no-console
      console.log('working');
      return true;
    }

    return false;
  };

  const handleSaveAndNext = () => {
    if (handleSave()) {
      setPage(page => page + 1);
    }
  };

  return (
    <Col className=" mx-auto">
      <Form.Label htmlFor="emailId">Email:</Form.Label>
      <Form.Control
        type="emailId"
        value={firstDetails.emailId}
        name="emailId"
        onChange={e => handleChange(e)}
        placeholder="Enter your email..."
      />
      {emailIdError && <div className="text-danger">{emailIdError}</div>}
      <br />

      <Form.Label htmlFor="password">Password:</Form.Label>
      <Form.Control
        value={firstDetails.password}
        name="password"
        onChange={e => handleChange(e)}
        placeholder="Enter your password..."
      />
      {passwordError && <div className="text-danger">{passwordError}</div>}
      <br />

      <div className=" d-flex flex-row justify-content-between  align-content-center">
        <Button disabled>Prev</Button>
        <Button onClick={() => handleSave()}>Save</Button>
        <Button onClick={() => handleSaveAndNext()}>Save And Next</Button>
      </div>
    </Col>
  );
};

export default StepOne;
