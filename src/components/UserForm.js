//註冊登入頁
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
    max-width: 500px;
    border: 1px sold #f5f4f0;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-geight: 2em;
    }

    input { 
        width: 100%
        margin-bottom: 1em;
    }
`;

const UserForm = props => {
    //設定表單的預設狀態
    const [values, setValues] = useState();

    //用戶輸入後更新狀態
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

return (
    <Wrapper>
        {props.formType === 'signup' ? <h2>註冊</h2> : <h2>登入</h2>}
        <Form
            onSubmit={e => {
                e.preventDefault();
                props.action({
                    variables: {
                        ...values
                    }
                });
            }}
        >

        {props.formType === 'signup' && (
            <React.Fragment>
            {/* JSX hrmlFor 取代 HTML 的for屬性以避免任何JS衝突*/}
            <label htmlFor="username">Username:</label>
            <input
                required
                type="text"
                id="username"
                name="username"
                placeholder="username"
                onChange={onChange}
            />
            </React.Fragment>
        )}
            <label htmlFor="email">Email:</label>
            <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={onChange}
            />
            <label htmlFor="password">Password:</label>
            <input
                required
                type="password"
                id="password"
                name="password"
                placeholder="password"
                onChange={onChange}
            />    
           
        <Button type="submit">Submit</Button>
        </Form>
    </Wrapper>
    );
};

export default UserForm;
