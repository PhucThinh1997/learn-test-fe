import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown } from 'antd';
import { useLocalStorage } from 'hooks/localStorage';
import { USER_KEY } from 'static/Constants';
import { UserMenu } from '../index';

const User = (props) => {
  const { size, bgColor, ...rest } = props;
  const [user] = useLocalStorage(USER_KEY, {});
  const { email } = user;

  const menu = <UserMenu username={email} {...rest} />;

  return (
    <Dropdown overlay={menu}>
      <Avatar
        style={{
          backgroundColor: { bgColor },
          verticalAlign: 'middle',
        }}
        size={size}
      >
        {email.substring(0, 2)}
      </Avatar>
    </Dropdown>
  );
};

User.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  bgColor: PropTypes.string,
};

export default User;
