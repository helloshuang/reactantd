import React from 'react';
import {
  Tabs,
  Form,
  Input,
  Icon,
  Row,
  Col,
  Select,
  Checkbox,
  Button,
  DatePicker,
  TimePicker,
  Table
} from 'antd';

import Forms from "../../components/basic/forms";

const TabPane = Tabs.TabPane ;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};

export default class Orderonline extends  React.Component{

  constructor(props){
    super(props);
  }
  render(){
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];

    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }

    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange: (current) => {
        console.log('Current: ', current);
      },
    };

    return(
      <Tabs>
        <TabPane tab="订单查询" key="1">
          <div id="components-form-demo-advanced-search">
            <Form horizontal className="ant-advanced-search-form">
              <Row >
                <Col span={4} >
                  <FormItem {...formItemLayout} label={`起止时间`}>
                    <DatePicker/>
                  </FormItem>
                </Col>
                <Col span={4} >
                  <FormItem {...formItemLayout} >
                    <TimePicker format="HH:mm"/>
                  </FormItem>
                </Col>
                <Col span={4} >
                  <FormItem {...formItemLayout} label={`--`}>
                    <DatePicker/>
                  </FormItem>
                </Col>
                <Col span={4} >
                  <FormItem {...formItemLayout} >
                    <TimePicker format="HH:mm" />
                  </FormItem>
                </Col>
                <Col span={4} >
                  <FormItem {...formItemLayout} label={`起止时间`}>
                    <Input placeholder="placeholder" />
                  </FormItem>
                </Col>
                <Col span={4} >
                  <FormItem {...formItemLayout} label={`起止时间`}>
                    <Input placeholder="placeholder" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`订单号`}>
                    <Input placeholder="placeholder" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`状态`}>
                    <Select></Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`城市`}>
                    <Select></Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`手机号`}>
                    <Input placeholder="placeholder" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`订单类型`}>
                    <Select></Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`店铺`}>
                    <Input placeholder="placeholder" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`店铺品牌`}>
                    <Select></Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`仅会员支付`}>
                    <Checkbox/>
                  </FormItem>
                </Col>
                <Col span={4} style={{textAlign:'center'}}>
                  <FormItem {...formItemLayout} label={` `}>
                  <Button  style={{width:'100%',backgroundColor:'orange'}}>查询</Button>
                    </FormItem>
                </Col>
                <Col span={4} style={{textAlign:'center'}}>
                  <FormItem {...formItemLayout} label={` `}>
                  <Button style={{width:'100%',backgroundColor:'orange'}}>导出</Button>
                    </FormItem>
                </Col>
              </Row>
            </Form>
            <div className="search-result-list">
              <Table columns={columns} dataSource={data} pagination={pagination} />
            </div>
          </div>
        </TabPane>
        <TabPane tab="订单日汇总" key="2">

        </TabPane>
        <TabPane tab="订单期间汇总" key="3">

        </TabPane>
        <TabPane tab="菜品销量排行" key="4">

        </TabPane>
        <TabPane tab="顾客统计" key="5">

        </TabPane>
        <TabPane tab="打赏员工汇总" key="6">

        </TabPane>
      </Tabs>
    );
  }
}

