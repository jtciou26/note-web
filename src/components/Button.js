import style from 'styled-components';

const Button = style.button`
    display: block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    color: #fff
    background-color: #0077cc;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 10px;
    
    :hover {
        opacity: 0.5;
    }

    :active {
        background-color: #005fa3;
    }
`;

export default Button