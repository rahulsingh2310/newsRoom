import React from 'react';
import { Button } from "shards-react";
import classes from './Button.css';

const button = (props) => (
    <Button pill size="lg" theme="info" style={{marginLeft:"36%",marginTop:"6%"}}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</Button>
);

export default button;