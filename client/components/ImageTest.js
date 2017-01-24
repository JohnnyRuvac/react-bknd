import React from 'react';
import ContentType from './ContentType';
import axios from 'axios';


export default class ImageTest extends ContentType {
  constructor(props) {
    super(props);
    this.state.contentData = {
      title: '',
      slug: '',
      imageUrl: '',
    };
  }

  render() {
    return (
      <div>
        <input type="text" 
          name="title"
          placeholder="Title"
          value={this.state.contentData.title}
          onChange={this.handleChange.bind(this)}
        />
        <input type="text" 
          name="slug"
          placeholder="slug"
          value={this.state.contentData.slug}
          onChange={this.handleSlugChange.bind(this)}
        />
        <form encType="multipart/form-data" onSubmit={this.uploadPhoto.bind(this)}>
          <input type="file" name="photo" accept="image/*" />
          <input type="submit" />
        </form>
        <img src={this.state.contentData.imageUrl} alt=""/>
      </div>
    );
  }

  uploadPhoto(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = process.env.SERVER_URL + '/upload'
    axios.post(url, data, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('id_token')
        },
      })
      .then(response => {
        this.updateContentDataState({
          imageUrl: '/uploads/' + response.data
        });
      })
      .catch(err => {
        console.log('error :/');
        console.log(err);
      });
  }
}