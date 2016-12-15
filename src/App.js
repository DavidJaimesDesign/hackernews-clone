import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Marky Zuck',
    num_comments: 3,
    points: 4,
    objectID: 0, 
  },

  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan and Andrew',
    num_comments: 2,
    points: 5,
    objectID:1,
  },
];

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {
     list
     query: '',
   };

   this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(even) {
    this.setState({ query: event.target.value});
  }

  render() {
    const helloWorld = 'Welcome to React';
    return (
      <div className="App">
	<form>
         <input type = "text" onChange = {this.onSearchChange}/>
        </form>
	{ this.state.list.map((item, key) =>
	    <div key = {item.ObjectID}>
		<span> <a href = {item.url}>{item.title}</a></span>
	        <span>{item.author}</span>
		<span>{item.num_comments}</span>
		<span>{item.points}</span>
            </div>
	)}
      </div>
    );
  }
}

export default App;
