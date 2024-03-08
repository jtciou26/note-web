import React from 'react';
import { useHistory } from 'react-router-dom';

import { FloatButton } from 'antd';
import {
  HomeOutlined,
  MenuOutlined,
  FormOutlined,
  HeartOutlined,
  LikeOutlined,
  UserOutlined,
  YoutubeOutlined
} from '@ant-design/icons';

const FloatMenu = () => {
  const goPath = useHistory();

  return (
    <React.Fragment>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 24
        }}
        icon={<MenuOutlined />}
      >
        <FloatButton icon={<HomeOutlined />} onClick={() => goPath.push('/')} />
        <FloatButton
          icon={<HeartOutlined />}
          onClick={() => goPath.push('/favorites')}
        />
        <FloatButton
          icon={<LikeOutlined />}
          onClick={() => goPath.push('/mynotes')}
        />
        <FloatButton
          icon={<UserOutlined />}
          onClick={() => goPath.push('/account')}
        />
        <FloatButton
          icon={<YoutubeOutlined />}
          onClick={() => goPath.push('/video')}
        />
        <FloatButton.BackTop />
      </FloatButton.Group>
    </React.Fragment>
  );
};
export default FloatMenu;
