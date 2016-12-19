import React, { Component } from 'react';
import './App.css';
import './index.css';

const DEFAULT_QUERY = 'redux'
const DEFAULT_PAGE  = 0;
const DEFAULT_HPP   = 100;
const PATH_BASE     = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH   = '/search';
const PARAM_SEARCH  = 'query='; 
const PARAM_PAGE    = 'page=';
const PARAM_HPP     = 'hitsPerPage=';
class App extends Component {
  constructor(props) {
   super(props);

   this.state = {
     results: null,
     query: DEFAULT_QUERY,
   };
   this.setSearchTopstories = this.setSearchTopstories.bind(this);
   this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
   this.onSearchChange = this.onSearchChange.bind(this);
   this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  
  onSearchSubmit (event){
   const {query} = this.state;
   this.fetchSearchTopstories(query,DEFAULT_PAGE); 
   event.preventDefault(); 
  }

  fetchSearchTopstories(query, page){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${query}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const{query} = this.state;
    this.fetchSearchTopstories(query, DEFAULT_PAGE);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value});
  }
  
  setSearchTopstories(result) {
    const {hits, page} = result
    const { query }    = this.state;
 
    const oldHits = page === 0 ? [] : this.state.results[query].hits;
    const updatedHits = [ ...oldHits, ...hits];

    this.setState(
      { result: { ...this.state.results, [query]: {hits: updatedHits, page}}
   });
  }  
render() {
  const { query, results} = this.state;
  const page = (results && results[query] && results[query].page) || 0;
  const list = (results && results[query] && results[query].hits) || [];
  return (
    <div className="page">
      <div className="interactions">
        <Search value={query} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
          Search
        </Search>
      </div>
      <Table list={list}/>
      <div>
        <Button onClick={() => this.fetchSearchTopstories(query, page + 1)}>
          More
        </Button>
      </div>
    </div>
  );
  }
}
const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>

const Table = ({ list }) =>
  <div className="table">
    { list.map((item) =>
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

const Button = ({ onClick, children}) =>
  <button onClick={onClick} type="button">
    {children}
  </button>
export default App;
