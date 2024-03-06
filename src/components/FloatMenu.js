import React from 'react';

import { FloatButton } from 'antd';
import {
  MenuOutlined,
  FormOutlined,
  HeartOutlined,
  LikeOutlined,
  UserOutlined,
  YoutubeOutlined
} from '@ant-design/icons';

const FloatMenu = () => (
  <React.Fragment>
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{
        right: 24
      }}
      icon={<MenuOutlined />}
    >
      <FloatButton icon={<FormOutlined />} href="/new" />
      <FloatButton icon={<HeartOutlined />} href="/favorites" />
      <FloatButton icon={<LikeOutlined />} href="/mynotes" />
      <FloatButton icon={<UserOutlined />} href="/account" />
      <FloatButton icon={<YoutubeOutlined />} href="/video" />
    </FloatButton.Group>
  </React.Fragment>
);
export default FloatMenu;
