import React from 'react';
import { Form, Input, Button, Icon, Rows, Cols } from 'antd';
const FormItem = Form.Item;

export default class Forms extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expand: false,
    };
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {

    return (

        <Form
          horizontal
          className="ant-advanced-search-form"
        >

        </Form>

    );
  }
}
