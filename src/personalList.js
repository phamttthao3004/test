import React from "react";
import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    persons: [],
    name: "",
    id: ""
  };

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(error => console.log(error));
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // const user = {
    //   name: this.state.name
    // };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, {
        name: this.state.name
      })
      .then(res => {
        // console.log(res);
        // console.log(res.data);
        const { persons } = this.state;
        persons.push(res.data);
        this.setState({ persons, name: "" });
      });
  };
  handleChangeID = event => {
    this.setState({ id: event.target.value });
  };

  handleSubmitID = event => {
    event.preventDefault();

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const persons = this.state.persons.filter(person => {
          return person.id !== this.state.id;
        });
        this.setState({
          persons,
          id: ""
        });
      });
  };
  select = id => {
    this.setState({
      id
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li onClick={this.select.bind(this, person.id)}>{person.name}</li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        <form onSubmit={this.handleSubmitID}>
          <label>
            Person ID:
            <input
              type="text"
              value={this.state.id}
              name="id"
              onChange={this.handleChangeID}
            />
          </label>
          <button type="submit">Delete</button>
        </form>
      </div>
    );
  }
}
