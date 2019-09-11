import React from "react";
import "./App.css";
import { callApi } from "./commons/callApi";
import PersonalList from "./personalList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      is_loaded: false,
      items: [],
      total_pages: 0,
      total: 0,
      per_page: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.getData(1);
  }
  async doSomethingAsync(page) {
    let result = await callApi(page);
    return result;
  }
  getData(page) {
    this.doSomethingAsync(page)
      .then(result =>
        this.setState({
          is_loaded: true,
          items: result.data,
          total_pages: result.total_pages,
          total: result.total,
          per_page: result.per_page,
          page: result.page
        })
      )
      .catch(error =>
        this.setState({
          is_loaded: true,
          error
        })
      );
  }
  changePage(event) {
    const { value } = event.target;
    this.getData(value);
  }
  renderPagging(total_pages) {
    const { page } = this.state;
    var htmlrender = [];
    for (let i = 0; i < total_pages; i++) {
      htmlrender.push(
        <button
          disabled={page === i + 1}
          onClick={this.changePage.bind(this)}
          value={i + 1}
        >
          {i + 1}
        </button>
      );
    }
    return htmlrender;
  }
  render() {
    const { error, is_loaded, items, total_pages } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!is_loaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <PersonalList />
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <img
                  src={item.avatar ? item.avatar : "/public/loading.gif"}
                  alt=""
                />
                <p>
                  {item.first_name} {item.last_name}
                </p>
                <p>{item.email}</p>
              </li>
            ))}
          </ul>
          <div>{this.renderPagging(total_pages)}</div>
        </div>
      );
    }
  }
}

export default App;
