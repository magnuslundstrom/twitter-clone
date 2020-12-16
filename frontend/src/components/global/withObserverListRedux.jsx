import React from 'react';

class FollowList extends React.Component {
  constructor(props) {
    super(props);
    this.listBottom = React.createRef();
  }

  // state = {
  //   skip: 0,
  //   bottom: false,
  // };

  // options = {
  //   rootMargin: '100px',
  // };
  // observer = new IntersectionObserver((entries) => {
  //   entries.forEach(async (entry) => {
  //     if (entry.isIntersecting) {
  //       this.setState({ skip: this.state.skip + 10 }, () => this.props.cb(this.state.skip));
  //     }
  //   });
  // }, this.options);

  // componentDidMount() {
  //   this.observer.observe(this.listBottom.current);
  // }

  // componentWillUnmount() {
  //   this.observer.unobserve(this.listBottom.current);
  // }

  render() {
    return (
      <div className="follow-list-list" style={{ borderRight: '1px solid #e9e9e9' }}>
        {this.props.children}
        <div ref={this.listBottom} style={{ padding: '10px' }}></div>
      </div>
    );
  }
}

export default FollowList;
