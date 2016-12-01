import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Router } from 'react-router';
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
class DynamicField extends React.Component {
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    console.log(this.props.form);
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      k=index;
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {`names-${k}`}
          <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    return (
      <Form horizontal>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add}>+</Button>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedDynamicField = Form.create()(DynamicField);
