import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import MovieContainer from '../MovieContainer/MovieContainer';
import Login from '../Login/Login';
import UserData from '../UserData/UserData';
import { retrieveAllMovies, retrieveAllCharacters } from '../../fetchCalls';


class App extends Component {
  constructor() {
    super();
    this.state = {
      flicks: [],
      selectedFlick: {},
      selectedCharacters:[],
      isSignedIn: false,
      user: {},
    }
  }

  componentDidMount() {
    retrieveAllMovies('https://swapi.co/api/films/')
      .then(flicks => this.setState({ flicks }))
  }

  selectFlick = (id) => {
    console.log(id)
    this.setState({selectedFlick: this.state.flicks[id-1]})
    this.findCharacters(this.state.flicks[id-1].characters)
  }

  findCharacters(characters) {
    // console.log(cha)
    retrieveAllCharacters(characters.slice(0,10))
      // .then(response => this.setState({ selectedCharacters: response }))
  }

  enterUserInfo = (userData) => {
    this.setState({
      user: { ...userData },
      isSignedIn: true
    })
    console.log(this.state.user)
  }

  logOut = () => {
    this.setState({
      user: {
        name: '',
        quote: '',
        ranking: ''
      },
      isSignedIn: false
    })
  }

  render() {
    const { isSignedIn } = this.state
    return (
      <main>
        {!isSignedIn && (
          <Login enterUserInfo={this.enterUserInfo}/>
        )}
        {this.state.flicks && (
          <MovieContainer movies={this.state.flicks} selectFlick={this.selectFlick}/>
        )}
        <UserData logOut={this.logOut} name={this.state.user.name} quote={this.state.user.quote} ranking={this.state.user.ranking}/>
      </main>
    )
  }
}

export default App;
