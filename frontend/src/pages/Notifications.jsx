import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/global/Nav';
import BackButton from '../components/global/BackButton';

const Notifications = ({}) => {
  useEffect(() => {}, []);

  return (
    <div style={{ gridTemplateColumns: '220px 600px 1fr', display: 'grid' }} className="container status">
      <Nav />
      <div>
        <div className="mid-top">
          <BackButton />
          <h1>Notifications</h1>
        </div>
        <div>
          <p>Mid</p>
        </div>
      </div>
      <div className="right">
        <p>xxxx</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, {})(Notifications);
