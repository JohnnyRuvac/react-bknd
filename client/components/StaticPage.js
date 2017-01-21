import React from 'react';
import axios from 'axios';
import AuthService from '../utils/AuthService';


export default class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
  }

  render() {
    return (
      <div>
        <h3>New page</h3>
        <input type="text" 
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange.bind(this)}
        />
        <textarea
          name="content" 
          placeholder="Text"
          value={this.state.content}
          onChange={this.handleChange.bind(this)}
        ></textarea>
        <button onClick={this.save.bind(this)}>Save</button>
      </div>
    );
  }

  handleChange(e) {
    const name = e.target.name;
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  save() {
    console.log('saving');
    const url = process.env.SERVER_URL + '/pages/new';
    
    axios.post(url, 
      {
        title: this.state.title,
        content: this.state.content
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
      }
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log('page save error');
      console.log(error);
    });
  }

}