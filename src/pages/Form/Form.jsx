import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

export default function Form() {
  const [page, setPage] = useState(0);
  const [formData, setformData] = useState({ emailId: '', password: '' });

  const handleNavClick = tabIndex => {
    if (tabIndex <= page) {
      setPage(tabIndex);
    }
  };

  const formStep = () => {
    switch (page) {
      case 0:
        return <StepOne setPage={setPage} formData={formData} setformData={setformData} />;
      case 1:
        return <StepTwo setPage={setPage} formData={formData} setformData={setformData} />;
      case 2:
        return <StepThree setPage={setPage} formData={formData} setformData={setformData} />;
      default:
        return <StepOne />;
    }
  };

  return (
    <div>
      <div className="display-5 text-center mb-5 mt-3 ">Form</div>
      <div className="d-flex justify-content-center align-items-center">
        <Navbar.Brand href="#home">Navigation</Navbar.Brand>
        <Nav className="text-center">
          <Nav.Link active={page === 0} onClick={() => handleNavClick(0)}>
            Step 1
          </Nav.Link>
          <Nav.Link active={page === 1} onClick={() => handleNavClick(1)}>
            Step 2
          </Nav.Link>
          <Nav.Link active={page === 2} onClick={() => handleNavClick(2)}>
            Step 3
          </Nav.Link>
        </Nav>
      </div>
      <div className="p-5 border border-primary border-3 w-50  mx-auto rounded">{formStep()}</div>
    </div>
  );
}
