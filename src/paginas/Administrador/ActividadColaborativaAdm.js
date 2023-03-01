import React, {useState}from "react";
import { Container, Row } from "reactstrap";
import { Stepbar } from "../../componentes/Administrador/Stepbar";
import MenuAdmi from "../../componentes/MenuAdmi";
import { NavBar } from "../../componentes/NavBar";
const steps = [
    {
      id: 1,
      label: 'Inicial ',
    },
    {
      id: 2,
      label: 'paso  2',
    },
    {
      id: 3,
      label: 'paso 3',
    },{
        id: 4,
        label: 'paso 4',
      }
  ];
const ActividadColaborativaAdm    =   ()  =>{
  const [index, setIndex] = useState(1)
    const [isOpen, setIsOpen] = useState(false)
    const toggle  = ()  =>  {setIsOpen(!isOpen)}
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    });
    const handleNext = () => {
      if(index > 1){
        setIndex(prev => prev -1);
      }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
      const handleBack = () => {
        if(index < 3){
          setIndex(prev => prev +1);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
      };
    return(
        <Container>
        <NavBar toggle={toggle} Seccion={"Actividad Colaborativa"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>
<Row>
<Stepbar  steps={index}/>
<form onSubmit={(e)=>handleSubmit(e)}>
      <h2>{steps[activeStep].label}</h2>
      {activeStep === 0 && (
        <>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </label>
        </>
      )}
      {activeStep === 1 && (
        <>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            ZIP Code:
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
          </label>
        </>
      )}
      {activeStep === 2 && (
        <>
          <p>Thank you for submitting your information!</p>
        </>
      )}
      {activeStep === 3 && (
        <>
          <p>dasdsdyour information!</p>
        </>
      )}
      <br />
      {activeStep > 0 && (
        <button type="button" onClick={handleBack}>
          Back
        </button>
      )}
      {activeStep < steps.length - 1 ? (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      ) : (
        <button type="submit">Submit</button>
      )}
      </form>
</Row>         
        </Container>
       

    )
}
export default ActividadColaborativaAdm;