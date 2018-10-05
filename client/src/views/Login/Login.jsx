import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import axios from "axios"

// import avatar from "../../assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class Login extends Component {
  state = {
    company: "",
    username: "",
    email: "",
    adminFirstName: "",
    adminLastName: "",
    city: "",
    country:"",
    postalCode: "",
    brand: "",
    password: "",
    passwordMatch: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
    axios.post('/api/account/newSignUp', 
    this.state
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };
render(){
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete company profile, you will be added as an admin.</p>
            </CardHeader>
            <CardBody>
              <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company"
                    id="company"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.company}
                    onChange={this.handleInputChange}
                    name="company"
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="usercreate"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.adminFirstName}
                    onChange={this.handleInputChange}
                    name="adminFirstName"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.adminLastName}
                    onChange={this.handleInputChange}
                    name="adminLastName"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.city}
                    onChange={this.handleInputChange}
                    name="city"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    name="country"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.postalCode}
                    onChange={this.handleInputChange}
                    name="postalCode"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Company Brand Statement</InputLabel>
                  <CustomInput
                    labelText=""
                    id="brandStatement"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2
                    }}
                    value={this.state.brand}
                    onChange={this.handleInputChange}
                    name="brand"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                    labelText="Password"
                    type="password"
                    id="pass"
                    name="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Retype Password"
                    type="password"
                    id="repass"
                    name="passwordMatch"
                    formControlProps={{
                      fullWidth: true
                    }}
                    value={this.state.passwordMatch}
                    onChange={this.handleInputChange}
                  />
            </GridItem>
            </GridContainer>
            <CardFooter>
              <Button 
              color="primary" 
              type="submit" 
              onClick={this.handleFormSubmit}>
              Add Company</Button>
            </CardFooter>
            </form>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a> */}
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Already a Member?</h6>
              <h4 className={classes.cardTitle}>Please Login</h4>
              <CustomInput
                    labelText="Username"
                    id="userlogin"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    type="passwords"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />

             
              <Button color="primary" round>
                Login
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
}

export default withStyles(styles)(Login);
