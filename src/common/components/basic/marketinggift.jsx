import React from 'react';
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Select,
  Button,
  Table
} from 'antd';

import Forms from "../../components/basic/forms";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const Option  = Select.Option;

export default class MarketingGift extends  React.Component{

  constructor(props){
    super(props);
  }
  render(){
    const columns = [{
      title: '礼品类型',
      dataIndex: 'gift_type',
      width:'150px'
    }, {
      title: '礼品名称',
      dataIndex: 'gift_name',
      width:'50%'
    },{
      title: '创建时间',
      dataIndex: 'gift_time'
    }, {
      title: '创建人',
      dataIndex: 'gift_maker'
    }, {
      title: '操作',
      dataIndex: 'gift_event'
    }];

    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        key: i,
        gift_type: <div className="gift_type" style={{width:'120px',height:'80px',background:'pink',color:'#fff',textAlign:'center',lineHeight:'20px',borderRadius:'5px',position:'relative'}}>
          <br/>礼品券<br/>
          {i}元
          <div className="left" style={{width:'30px',height:'30px',background:'#fbfbfb',borderRadius:'50%',position:'absolute',left:'-15px',top:'25px'}}></div>
          <div className="right" style={{width:'30px',height:'30px',background:'#fbfbfb',borderRadius:'50%',position:'absolute',right:'-15px',top:'25px'}}></div>
        </div>,
        gift_name: <div>
          <div className="name">豆捞坊礼品券</div>
          <br/>
          <div className="gift_rule">礼品规则：<br/>
            顾客在获取实物礼品券后，礼品具体领取方式请联系商家，商家会在核对信息无误后进行赠送。<br/>
            在法律允许的范围内豆捞坊保留对本活动的最终解释权</div>
        </div>,
        gift_time: `2016/11/28 13:19`,
        gift_maker: `doulaofang`,
        gift_event: <div><a href="#">修改</a><br/><a href="#">删除</a><br/><a href="/useinfo">使用详情</a></div>,
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
                  <FormItem {...formItemLayout} label={`礼品名称`}>
                    <Input placeholder="" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem {...formItemLayout} label={`礼品类型`}>
                    <Select defaultValue="all">
                      <Option value="all">全部</Option>
                      <Option value="type1">电子代金券</Option>
                      <Option value="type2">菜品代金券</Option>
                      <Option value="type3">实物代金券</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span={4}>
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

