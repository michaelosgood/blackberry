import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Footer from "../../components/Footer";
import "./Management.css";


class Management extends Component {
    state = {
      users: [],
      name: "",
      phone: "",
      guest: "",
      selectedres: ""
    };

    componentDidMount() {
      this.loadUsers();
    }

    loadUsers = () => {
      API.getUsers()
        .then(res =>
          this.setState({ users: res.data, name: "", phone: "", partysize: "", checkinto: "" })
        )
        .catch(err => console.log(err));
    };

    deleteUser = id => {
      API.deleteUser(id)
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    handleFormSubmit = event => {
      event.preventDefault();
      if (this.state.name && this.state.phone) {
        API.saveUser({
          name: this.state.title,
          phone: this.state.author,
          guest: this.state.synopsis
        })
          .then(res => this.loadUsers())
          .catch(err => console.log(err));
      }
    };

    render() {
      console.log(this.state)
      return (
        <div>
            <Container fluid>
              <Row>
              <Col size="md-4">
              {/*For testing*/}
                <div>
                  <h1>Waiting List</h1>
                </div>
                {this.state.users.length ? (
                  <List>
                    {this.state.users.map(user => (
                      <ListItem key={user._id}>
                        <Link to={"/users/" + user._id}>
                            Name: {user.name} <br/>
                            Party Size: {user.partysize} <br/>
                            Phone: {user.phone}<br/>
                            Checked Into: {user.checkinto}
                        </Link>
                        <DeleteBtn onClick={() => this.deleteUser(user._id)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
              </Row>
            </Container>
          <Footer />
        </div>
      );
    }
  }

  export default Management;
