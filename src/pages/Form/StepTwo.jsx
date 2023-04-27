import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const StepOne = ({ setPage, formData, setformData }) => {
  const [secondDetails, setsecondDetails] = useState({
    firstName: formData.firstName,
    lastName: formData.lastName,
  });
  const [firstNameError, setfirstNameError] = useState('');
  const [lastNameError, setlastNameError] = useState('');

  const validatefirstName = () => {
    // eslint-disable-next-line no-console
    console.log('working');
    if (!secondDetails.firstName) {
      setfirstNameError('firstName is required.');
      return false;
    }

    if (secondDetails.firstName.length < 2 || secondDetails.firstName.length > 50) {
      setfirstNameError('firstName is invalid.');
      return false;
    }

    setfirstNameError('');
    return true;
  };

  const validatelastName = () => {
    // eslint-disable-next-line no-console
    console.log('working');

    if (secondDetails.lastName) {
      if (!/(^[A-Za-z]+$)/.test(secondDetails.lastName)) {
        setlastNameError('lastName can only contain alphabets.');
        return false;
      }
    }

    setlastNameError('');
    return true;
  };

  const handleChange = e => {
    setsecondDetails({ ...secondDetails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (validatefirstName() && validatelastName()) {
      setformData({
        ...formData,
        firstName: secondDetails.firstName,
        lastName: secondDetails.lastName,
      });
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
      <Form.Label htmlFor="firstName">First Name:</Form.Label>
      <Form.Control
        type="firstName"
        value={secondDetails.firstName}
        name="firstName"
        onChange={e => handleChange(e)}
        placeholder="Enter your first name..."
      />
      {firstNameError && <div className="text-danger">{firstNameError}</div>}
      <br />

      <Form.Label htmlFor="lastName">Last Name:</Form.Label>
      <Form.Control
        value={secondDetails.lastName}
        name="lastName"
        onChange={e => handleChange(e)}
        placeholder="Enter your last name..."
      />
      {lastNameError && <div className="text-danger">{lastNameError}</div>}
      <br />

      <div className=" d-flex flex-row justify-content-between  align-content-center">
        <Button onClick={() => setPage(page => page - 1)}>Prev</Button>
        <Button onClick={() => handleSave()}>Save</Button>
        <Button onClick={() => handleSaveAndNext()}>Save And Next</Button>
      </div>
    </Col>
  );
};

export default StepOne;
