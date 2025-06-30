import React, { Component } from "react";
import {
  Row, Col, Card, CardBody, FormGroup, Button, Label, Input, Container, InputGroup, Form
} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
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

class UpdateEmploye extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
         { title: "Dashboard", link: "/" },
    { title: "Update Employee", link: "#" },
      ],
      fnm: false,
      lnm: false,
      unm: false,
      city: false,
      stateV: false,
      selectedGroup: null,
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
            <Breadcrumbs title="UPDATE EMPLOYEE" breadcrumbItems={this.state.breadcrumbItems} />
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
                            <Label className="form-label" htmlFor="validationCustom01">First name</Label>
                            <input
                                name="firstname"
                                placeholder="Name"
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
                            <Label className="form-label" htmlFor="validationCustom02">Email</Label>
                            <input
                                name="lastname"
                                placeholder="Email"
                                type="email"
                                errorMessage="Enter Email"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom02"
                            />
                            </div>
                        </Col>
                        <Col md="6">
                        <div className="mb-3">
                            <Label className="form-label">Select Role</Label>
                            {/* <Select
                                value={selectedGroup}
                                onChange={this.handleSelectGroup}
                                options={optionGroup}
                                //   className="form-control"
                                classNamePrefix="form-control"
                            /> */}
                            <select className="form-control" name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>

                        </div>
                        </Col>
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

export default UpdateEmploye;
