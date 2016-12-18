import React, { Component } from 'react';
import './App.css';
import './index.css';

const DEFAULT_QUERY = 'redux'
const PATH_BASE     = 'https://hn.algolia.com/api/vi';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query='; 

const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

const list = [
];

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {
     list,
     query: DEFAULT_QUERY,
   };
   this.setSearchTopstories = this.setSearchTopstories.bind(this);
   this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
   this.onSearchChange = this.onSearchChange.bind(this);
  }
  
  setSearchTopstories(result) {
    this.setState({result});
  }

  fetchSearchTopstories(query) {
    fetch('${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}')
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const{query} = this.state;
    this.fetchSearchTopstories(query);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value});
  }
  
render() {
  const { query, list } = this.state;
  return (
    <div className="page">
      <div className="interactions">
        <Search value={query} onChange={this.onSearchChange}>
          Search
        </Search>
      </div>
      <Table list={list} pattern={query} />
    </div>
  );
  }
}
const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

const Table = ({ list, pattern }) =>
  <div className="table">
    { list.filter(isSearched(pattern)).map((item) =>
      <div key={item.objectID} className="table-row">
        <span style={{width: '40%'}}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%'}}>
          {item.author}
        </span>
        <span style={{width: '15%'}}>
          {item.num_comments}
        </span>
        <span style={{width: '15%'}}>
          {item.points}
        </span>
    </div>
  )}
  </div>

export default App;
