import React from 'react';
import { Typography } from 'antd';

const { Text, Link } = Typography;

const Gravatar = () => {
  return (
    <>
      <Text>*信箱可使用&nbsp;</Text>
      <Link href="https://gravatar.com/" target="_blank">
        Gravatar
      </Link>
      <Text>&nbsp;的大頭貼。目前不會驗證。</Text>
    </>
  );
};

const MD = () => {
  return (
    <>
      <Text type="secondary">
        <Text strong>常用 Markdown 語法</Text>
        <li>標題: #</li>
        <li>粗體: ** **</li>
        <li>斜體: * *</li>
        <li>刪除: ~~ ~~</li>
        <li>程式: ` `</li>
        <li>有序: 1. </li>
        <li>無序: -</li>
        <li>待辦: - [x] </li>
        <li>分隔線: ---</li>
        <li>連結: [註解](https://)</li>
        <li>圖片: ![註解](https://)</li>
        <li></li>
      </Text>
    </>
  );
};

export { Gravatar, MD };
