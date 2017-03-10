import React from 'react';
import DocumentMeta from 'react-document-meta';


export default class Page extends React.Component {
  render() {
    const meta = {
      title: 'Page | BKND',
      description: 'meow',
    };

    return (
      <div>
        <DocumentMeta {...meta} />
        <p>meow</p>
      </div>
    );
  }
}