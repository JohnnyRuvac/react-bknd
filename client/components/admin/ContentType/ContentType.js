import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import AuthService from 'Utils/AuthService';
import getSlug from 'speakingurl';
import Helpers from 'Utils/Helpers';


export default class ContentType extends React.Component {
  constructor(props) {
    super(props);
    this.isEditing = !!this.props.params.slug;
    this.serverUrl = Helpers.getServerUrl();
    this.state = {
      contentData: {},
      slugOverridden: false,
    }
  }

  render() {
    return (
      <div>Base content type, extend it.</div>
    );
  }

  componentDidMount() {
    if (this.isEditing) {
      this.fechItemData();
    }
  } 

  fechItemData() {
    const url = this.serverUrl + '/api/' + this._getContentTypeSlug() + '/' + this.props.params.slug;
    
    axios.get(url)
      .then(res => {
        this.originalSlug = res.data[0].slug;
        this.setState({
          contentData: res.data[0]
        });
      });
  }

  updateContentDataState(changedData) {
    const contentData = Object.assign({}, this.state.contentData);
    for (const key in changedData) {
      contentData[key] = changedData[key];
    }
    this.setState({contentData: contentData});
  }

  handleChange(e) {
    const id = e.target.id;
    const changedData = {};
    changedData[id] = e.target.value;

    // update slug after title change
    if ( id === 'title' && !this.state.slugOverridden ) {
      changedData.slug = getSlug(e.target.value);
    }

    this.updateContentDataState(changedData);
  }

  handleSlugChange(e) {
    const val = e.target.value;
    const slugNotEmpty = val !== '';
    const differentThanTitle = val !== this.state.contentData.title;
    
    this.setState({
      contentData: {
        slug: val,
      },
      slugOverridden: ( slugNotEmpty && differentThanTitle )
    });
  }

  _getContentTypeSlug() {
    const path = this.props.route.path;
    const segments = path.split('/');
    const adminIndex = segments.indexOf('admin');
    return segments[adminIndex + 1]
  }

  _removeIdFromContentData(data) {
    const newData = Object.assign({}, data);
    delete newData._id;
    return newData;
  }

  saveMediumEditor() {
    if (this.refs.te) {
      const html = this.refs.te.me.getContent()
      this.state.contentData.content = html;
    }
  }

  save() {
    console.log('saving');

    // save content from medium editor
    this.saveMediumEditor();

    // patch if item already exists, post if doesn't
    const method = ( this.isEditing ) ? 'patch' : 'post';
    // if updating use original slug
    const slug = ( this.isEditing ) ? this.originalSlug : this.state.contentData.slug
    const url = this.serverUrl + '/api/' + this._getContentTypeSlug() + '/' + slug;
    const data = this._removeIdFromContentData( this.state.contentData );
    
    axios[method](url, data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
      }
    )
    .then(response => {
      const slug = this._getContentTypeSlug();
      const path = '/admin/' + slug;

      if (slug !== 'items') {
        browserHistory.push(path);
      } else {
        browserHistory.goBack();
      }
    })
    .catch(error => {
      console.log('page save error');
      console.log(error);
    });
  }

}