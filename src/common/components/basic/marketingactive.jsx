import React from 'react';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Select,
  Button,
  Table,
  DatePicker,
  Switch
} from 'antd';

import Forms from "../../components/basic/forms";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const Option  = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class MarketingActive extends  React.Component{

  constructor(props){
    super(props);
  }
  render(){
    const columns = [{
      title: '活动类型',
      dataIndex: 'active_type'
    }, {
      title: '活动名称',
      dataIndex: 'active_name'
    }, {
      title: '人气',
      dataIndex: 'active_moods'
    },{
      title: '活动日期',
      dataIndex: 'active_time'
    }, {
      title: '创建人',
      dataIndex: 'active_maker'
    }, {
      title: '活动开关',
      dataIndex: 'active_switch'
    }, {
      title: '操作',
      dataIndex: 'active_event'
    }];

    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        key: i,
        active_type: <div className="active_type" style={{background:'pink',color:'#fff',textAlign:'center',lineHeight:'20px',borderRadius:'5px',position:'relative'}}>
          <br/>礼品券<br/>
          {i}元
          <div className="left" style={{width:'30px',height:'30px',background:'#fbfbfb',borderRadius:'50%',position:'absolute',left:'-15px',top:'25px'}}></div>
          <div className="right" style={{width:'30px',height:'30px',background:'#fbfbfb',borderRadius:'50%',position:'absolute',right:'-15px',top:'25px'}}></div>
        </div>,
        active_name: `打折促销`,
        active_moods:`45244`,
        active_time: `2016/11/28 13:19`,
        active_maker: `doulaofang`,
        active_switch:<Switch checkedChildren={'开'} unCheckedChildren={'关'}/>,
        active_event: <div><a href="#">修改</a><br/><a href="#">删除</a><br/><a href="#">使用详情</a></div>,
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
          <div id="components-form-demo-advanced-search">
            <Form horizontal className="ant-advanced-search-form">
              <Row>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`活动名称`}>
                    <Input placeholder="" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`活动类型`}>
                    <Select defaultValue="all">
                      <Option value="all">全部</Option>
                      <Option value="type1">摇奖活动</Option>
                      <Option value="type2">免费领取</Option>
                      <Option value="type3">短信群发</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`活动状态`}>
                    <Select defaultValue="all">
                      <Option value="all">不限</Option>
                      <Option value="on">已启用</Option>
                      <Option value="no">未启用</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`起止日期`}>
                    <RangePicker/>
                  </FormItem>
                </Col>
                <Col span={4} offset={8}>
                    <Button  style={{width:'50%',height:'30px',backgroundColor:'orange',color:'#fff',border:'none'}}>查询</Button>
                </Col>
                <Col span={4}>
                    <Button  style={{width:'50%',height:'30px',backgroundColor:'orange',color:'#fff',border:'none'}}>添加礼品</Button>
                </Col>
              </Row>
            </Form>
            <div className="search-result-list">
              <Table columns={columns} dataSource={data} pagination={pagination} />
            </div>
          </div>
    );
  }
}

