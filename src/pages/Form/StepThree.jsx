import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const StepThree = ({ setPage, formData }) => {
  const [thirdDetails, setthirdDetails] = useState({
    countryCode: '',
    phoneNumber: '',
  });

  const [checked, setChecked] = useState(false);
  const [countryCodeError, setcountryCodeError] = useState('');
  const [phoneNumberError, setphoneNumberError] = useState('');
  const navigate = useNavigate();

  const validatecountryCode = () => {
    if (!thirdDetails.countryCode) {
      setcountryCodeError('countryCode is required.');
      return false;
    }

    setcountryCodeError('');
    return true;
  };

  const validatephoneNumber = () => {
    if (!thirdDetails.phoneNumber) {
      setphoneNumberError('phoneNumber is required.');
      return false;
    }

    if (thirdDetails.phoneNumber.length !== 10) {
      setphoneNumberError('phoneNumber should be of 10 digits');
      return false;
    }

    setphoneNumberError('');
    return true;
  };

  const handleChange = e => {
    setthirdDetails({ ...thirdDetails, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  async function sendFormdata(formdata) {
    try {
      const response = await fetch('https://codebuddy.review/submit', {
        method: 'POST',

        body: JSON.stringify(formdata),
      });

      const data = await response.json();
      const { message } = data;

      if (message === 'Success') navigate('/posts');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('err', error);
    }
  }

  const handleSave = () => {
    if (validatecountryCode() && validatephoneNumber() && checked) {
      sendFormdata({
        ...formData,
        countryCode: thirdDetails.countryCode,
        phoneNumber: thirdDetails.phoneNumber,
      });

      // eslint-disable-next-line no-console
      console.log(formData);
    }
  };

  return (
    <Col className=" mx-auto">
      <Form.Label htmlFor="countryCode">Country Code:</Form.Label>
      <select
        className="form-select"
        aria-label="Default select example"
        name="countryCode"
        value={thirdDetails.countryCode}
        onChange={e => handleChange(e)}
      >
        <option selected>Open this select menu</option>
        <option>India (+91) </option>
        <option>America (+1)</option>
      </select>
      {countryCodeError && <div className="text-danger">{countryCodeError}</div>}
      <br />

      <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
      <Form.Control
        type="number"
        value={thirdDetails.phoneNumber}
        name="phoneNumber"
        onChange={e => handleChange(e)}
      />
      {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
      <br />

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          defaultValue={checked}
          name="checked"
          onChange={handleCheckbox}
        />
        <label className="form-check-label mb-2 " htmlFor="flexCheckDefault">
          Terms and Conditions
        </label>
      </div>

      <div className=" d-flex flex-row justify-content-between  align-content-center">
        <Button onClick={() => setPage(page => page - 1)}>Prev</Button>
        <Button onClick={() => handleSave()}>Save</Button>
        <Button disabled>Save And Next</Button>
      </div>
    </Col>
  );
};

export default StepThree;
