import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import NewNav from "../../components/NewNav";
import Footer from "../../components/Footer";
import "./Home.css";

class Home extends Component {
  state = {
    restaurants: [],
    name: "",
    zip: "",
    img: "",
    waittime: "",
  };


  componentDidMount() {
    this.loadRestaurants();
  }

  loadRestaurants = () => {
    API.getRestaurants()
      .then(res =>
        this.setState({ restaurants: res.data, name: "", zip: "", img: "", waittime: ""  })
      )
      .catch(err => console.log(err));
  };

  deleteRestaurant = id => {
    API.deleteRestaurant(id)
      .then(res => this.loadRestaurants())
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
    if (this.state.name && this.state.zip) {
      API.saveRestaurant({
        name: this.state.name,
        address: this.state.zip,
        waittime: this.state.waittime,
        img: this.state.img
      })
        .then(res => this.loadRestaurants())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <NewNav />
          <Container fluid>
          <Row>
              <Col size="md-12">
              <div className="wrapper">
                <div>
                  <input type="text" name="search" placeholder="Search..."/>
                  <h1>Nearby Restaurants</h1>
                </div>
                {this.state.restaurants.length ? (
                  <List>
                    {this.state.restaurants.map(restaurant => (
                      <Col size="md-6">
                      <ListItem key={restaurant._id}>
                        <Link to={"/restaurants/" + restaurant._id}>
                            {restaurant.name} <br/>
                            {restaurant.zip} <br/>
                            Current wait time: {restaurant.waittime} <br/>
                            <img alt='res' src= {restaurant.img} />
                        </Link>
                      </ListItem>
                      </Col>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
                </div>
              </Col>
            </Row>
          </Container>
        <Footer />
      </div>
    );
  }
}



export default Home;
