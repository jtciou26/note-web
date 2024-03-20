import React from 'react';
import { Typography } from 'antd';

const { Text, Link } = Typography;

const Gravatar = () => {
  return (
    <>
      <Text>*信箱的用途是可以從&nbsp;</Text>
      <Link href="https://gravatar.com/" target="_blank">
        Gravatar
      </Link>
      <Text>&nbsp;取得大頭貼。信箱目前不會驗證。</Text>
    </>
  );
};

export default Gravatar;
