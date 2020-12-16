import React from 'react';

class FollowList extends React.Component {
  constructor(props) {
    super(props);
    this.listBottom = React.createRef();
  }

  state = {
    skip: 0,
    list: [],
    bottom: false,
  };

  componentDidMount() {
    fetch(this.props.api).then((data) => {
      data.json().then((list) => {
        this.setState({ list, skip: this.state.skip + 10 }, () => {
          if (this.state.list.length >= 10) {
            let options = {
              rootMargin: '100px',
            };
            let observer = new IntersectionObserver((entries) => {
              entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                  const res = await fetch(`${this.props.api}&skip=${this.state.skip}`);
                  if (!res.ok) return console.log(await res.text());
                  const list = await res.json();
                  if (list.length > 0) {
                    this.setState({ list: [...this.state.list, ...list], skip: this.state.skip + 10 });
                  } else {
                    this.setState({ bottom: true });
                    observer.unobserve(this.listBottom.current);
                  }
                }
              });
            }, options);
            observer.observe(this.listBottom.current);
          }
        });
      });
    });
  }

  render() {
    return (
      <div className="follow-list-list" style={{ borderRight: '1px solid #e9e9e9' }}>
        {(this.state.list.length > 0 && this.props.render(this.state.list)) || <p className="no-users-found">No items found</p>}
        <div ref={this.listBottom} style={{ padding: '10px' }}></div>
      </div>
    );
  }
}

export default FollowList;
