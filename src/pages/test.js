import React from 'react';

import { Button, message, Popconfirm } from 'antd';

const confirm = e => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = e => {
  console.log(e);
  message.error('Click on No');
};

const Test = () => (
  <React.Fragment>
    <Popconfirm title="Delete the task" onConfirm={confirm} onCancel={cancel}>
      <Button danger>Delete</Button>
    </Popconfirm>
  </React.Fragment>
);

export default Test;
