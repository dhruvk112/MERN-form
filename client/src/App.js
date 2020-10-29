import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class App extends React.Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    info: []
  }

  componentDidMount = () => {
    this.getForm();
  };

  getForm = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ info: data});
        console.log('Data has been received!');
      })
      .catch(() => {
        alert('Error retrieving data!');
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ 
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
    };
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server!');
        this.resetUserInputs();
        this.getForm();
      })
        .catch(() => {
          console.log('Internal server error!');
        });

  };

  resetUserInputs = () => {
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    });
  }

  displayInfo = (info) => {
    if (!info.length) return null;
    return info.map((info, index) => (
      <div key={index}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{info.firstname}</td>
              <td>{info.lastname}</td>
              <td>{info.email}</td>
              <td>{info.phone}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    ));
  };

  render() {
    console.log('State: ', this.state);
    return (
      <div className="container">
        <h2 className="text-center">Welcome to my App</h2>
        <Form class="needs-validation" novalidate onSubmit={this.submit}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" name="phone" value={this.state.phone} onChange={this.handleChange} required />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <hr></hr>
        <h2 className="text-center">Details</h2>
        <div className="form-info">
          {this.displayInfo(this.state.info)}
        </div>
      </div>
    );
  }
}

export default App;
