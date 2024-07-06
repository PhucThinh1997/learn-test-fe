import React from 'react';
import { Footer } from 'antd/lib/layout/layout';
import { PhoneTwoTone } from '@ant-design/icons';

const FooterApp = () => (
  <Footer>
    <div className="col-sm-6">
      <strong className="float-left">
        Copyright ©2023
        <span>
          &nbsp; for CRM
        </span>
      </strong>
    </div>
    <div className="col-sm-6 text-right">
      Contact |&nbsp;
      <a href="tel:037770049X">
        <PhoneTwoTone /> 037770049X&nbsp;
      </a>
      <a href="mailto:nphucthinh@gmail.com">
        <i className="fa fa-envelope"></i>&nbsp;-&nbsp;txxx@gmail.com
      </a>
    </div>
  </Footer>
);

export default FooterApp;
