/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable dot-notation */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LatestScoreData: { teams: { Match: [] } },
      Sport: 'basketball',
      isDropdown: false,
      useless: '',
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/40130162/latest${this.state.Sport}.php`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // this.setState({ LatestScoreData: data });
        console.log(data);
      });
  }

  toggleDropdown() {
    if (this.state.isDropdown === true) {
      this.setState({ isDropdown: false });
    } else {
      this.setState({ isDropdown: true });
    }
    console.log(this.state.isDropdown);
  }

  render() {
    console.log(JSON.stringify(this.state.LatestScoreData.teams.Match));
    return (
      <div>
        <div>
          <button type="button" onClick={() => this.toggleDropdown()}>Sports</button>
        </div>
        <div>
          <ul>
            HI
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
