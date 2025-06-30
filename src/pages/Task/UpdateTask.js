import React, { Component } from "react";
import {
  Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form
} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr"
import Select from "react-select";
const optionGroup = [
    {
        label: "Role",
        options: [
            { label: "Mustard", value: "Mustard" },
            { label: "Ketchup", value: "Ketchup" },
            { label: "Relish", value: "Relish" }
        ]
    }
    
];
const assignedOptions = [
  { label: "Devendra", value: "devendra" },
  { label: "Rajshree", value: "rajshree" },
  { label: "Abhishek", value: "abhishek" },
  { label: "Omkar", value: "omkar" }
];

class UpdateTask extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      breadcrumbItems: [
        { title: "Dashboard", link: "#" },
        { title: "Update Task", link: "#" },
      ],
      fnm: false,
      lnm: false,
      unm: false,
      city: false,
      stateV: false,
      selectedGroup: null,
        assignedTo: []      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandeler = this.changeHandeler.bind(this);
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const fnm = document.getElementById("validationTooltip01").value;
    const lnm = document.getElementById("validationTooltip02").value;
    const unm = document.getElementById("validationTooltipUsername").value;
    const city = document.getElementById("validationTooltip03").value;
    const stateV = document.getElementById("validationTooltip04").value;
    

    document.getElementById("tooltipForm").classList.add("was-validated");

    this.setState({
      fnm: !!fnm,
      lnm: !!lnm,
      unm: !!unm,
      city: !!city,
      stateV: !!stateV
    });

    const validations = document.getElementsByName("validate");
    for (let i = 0; i < validations.length; i++) {
      validations[i].style.display = "block";
    }
  }
  handleSelectGroup = selectedGroup => {
        this.setState({ selectedGroup });
    };

  changeHandeler(event, eleId) {
    document.getElementById(eleId).style.display = event.target.value !== "" ? "none" : "block";
  }

  render() {
    const { selectedGroup } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs title="UPDATE TASK" breadcrumbItems={this.state.breadcrumbItems} />
            <Row>
                <Col xl="12">
                <Card>
                    <CardBody>
                    {/* <h4 className="card-title">React Validation - Normal</h4> */}
                    {/* <p className="card-title-desc">Provide valuable, actionable feedback to your users with HTML5 form validation–available in all our supported browsers.</p> */}
                    <form className="needs-validation" >
                        <Row>
                        <Col md="6">
                            <div className="mb-3">
                            <Label className="form-label" htmlFor="validationCustom01">Task Title</Label>
                            <input
                                name="Task Title"
                                placeholder="Task Title"
                                type="text"
                                errorMessage="t Name"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                            />
                            </div>
                        </Col>
                         <Col md="6">
                        <div className="mb-3">
                            <Label className="form-label">Frequency</Label>
                       
                            <select className="form-control" >
                                <option value="One-time">One-time</option>
                                <option value="Daily ">Daily </option>
                                <option value="Weekly ">Weekly </option>
                                <option value="Monthly ">Monthly </option>
                                <option value="Continuous ">Continuous </option>
                            </select>

                        </div>
                        </Col>
                         <Col md="6">
                             <div className="form-group mb-4">
                                <label>Start Date</label>
                                <div className="input-group">
                                    <Flatpickr
                                    className="form-control d-block"
                                    placeholder="dd M,yyyy"
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d"
                                    }}
                                    />
                                </div>
                            </div>
                        </Col>
                         <Col md="6">
                             <div className="form-group mb-4">
                                <label>Deadline</label>
                                <div className="input-group">
                                    <Flatpickr
                                    className="form-control d-block"
                                    placeholder="dd M,yyyy"
                                    options={{
                                        altInput: true,
                                        altFormat: "F j, Y",
                                        dateFormat: "Y-m-d"
                                    }}
                                    />
                                </div>
                            </div>
                        </Col>
                         <Col md="6">
                            <div className="mb-3">
                                <Label className="form-label">Attachments</Label>
                        
                                  <div className="input-group">
                                            <input type="file" className="form-control" id="customFile" />
                                        </div>

                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-3">
                                <Label className="form-label">Status</Label>
                        
                                <select className="form-control" >
                                    <option value="Assigned ">Assigned </option>
                                    <option value=" In-Process "> In-Process </option>
                                    <option value="Pending Review  ">Pending Review  </option>
                                    <option value="Complete  ">Complete  </option>
                                    <option value="Delayed  ">Delayed  </option>
                                </select>

                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-3">
                                <Label className="form-label">Priority</Label>
                        
                                <select className="form-control" >
                                    <option value="Low">Low</option>
                                    <option value="Medium ">Medium </option>
                                    <option value="High"> High </option>
                                </select>

                            </div>
                        </Col>
                       
                      <Col md="6">
                    <div className="mb-3">
                        <Label className="form-label">Assigned To </Label>
                        <Select
                        isMulti
                        name="assignedTo"
                        options={assignedOptions}
                        className="basic-multi-select text-white"
                        classNamePrefix="select"
                        onChange={(selectedOptions) => {
                            console.log("Selected:", selectedOptions);
                            this.setState({ assignedTo: selectedOptions });
                            }}
                        />
                    </div>
                    </Col>
                     <Col md="6">
                            <div className="mb-3">
                                <Label className="form-label">Client</Label>
                        
                                <select className="form-control" >
                                    <option value="Low">Lotus</option>
                                    <option value="Medium ">IDFC </option>
                                    <option value="High"> RDV </option>
                                </select>

                            </div>
                        </Col>
                     <Col md="6">
                            <div className="mb-3">
                                <Label className="form-label">Project</Label>
                        
                                <select className="form-control" >
                                    <option value="Low">Lotus</option>
                                    <option value="Medium ">IDFC </option>
                                    <option value="High"> RDV </option>
                                </select>

                            </div>
                        </Col>
                      
                  
                   
                        <Col md="12">
                            <div className="mb-3">
                            <Label className="form-label" htmlFor="validationCustom02">Description</Label>
                            <textarea
                                name="Description"
                                placeholder="Description"
                                type="text"
                                errorMessage="Phone"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom02"
                            />
                            </div>
                        </Col>
                        {/* <Col md="6">
                        <div className="mb-3">
                            <Label className="form-label">Select Role</Label>
                       
                            <select className="form-control" name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>

                        </div>
                        </Col> */}
                        </Row>
                       
                       
                        <Button color="primary" type="submit">Update</Button>
                    </form>
                    </CardBody>
                </Card>
                </Col>
            </Row>
                    
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default UpdateTask