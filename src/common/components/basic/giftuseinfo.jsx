import React ,{Component} from 'react'
import {Breadcrumb, Card, Table, Col, Row,Input} from 'antd'
const BreadcrumbItem = Breadcrumb.Item;


export default class Giftuserinfo extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:[
        {name: 'Microsoft Internet Explorer', value: 56.33 },
        {name: 'Chrome', value: 24.03},
        {name: 'Firefox', value: 10.38},
        {name: 'Safari',  value: 4.77},
        {name: 'Opera', value: 0.91},
        {name: 'Proprietary or Undetectable', value: 0.2}
      ]
    }
  }
  render(){

    const data= [
      {
        key: '名称', name: '豆捞坊豆捞坊'
      },{
        key: '类型', name: '实物礼品券'
      },{
        key: '价值', name: '11元'
      },{
        key: '创建时间', name: '2016/11/25 16:51'
      },{
        key: '使用说明', name: '这里是使用说明'
      },{
        key: '使用规则', name: '1、获取礼品后可立即使用;2、不限时段,堂食外送均可使用,本电子代金券不与其他优惠同享'
      },{
        key: '使用店铺', name: '不限'
      }
    ];
    const columns = [
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '消费返券',
        dataIndex: 'back',
        key: 'back',
      },
      {
        title: '摇奖活动',
        dataIndex: 'shake_active',
        key: 'shake_active',
      },
      {
        title: '积分摇奖',
        dataIndex: 'score_shake',
        key: 'score_shake',
      },
      {
        title: '积分兑换',
        dataIndex: 'score_change',
        key: 'score_change',
      },
      {
        title: '免费领取',
        dataIndex: 'free',
        key: 'free',
      },
      {
        title: '商家赠送',
        dataIndex: 'give',
        key: 'give',
      },
      {
        title: '商家支付',
        dataIndex: 'pay',
        key: 'pay',
      },
      {
        title: '商家卖出',
        dataIndex: 'sale',
        key: 'sale',
      },
      {
        title: '总计',
        dataIndex: 'total',
        key: 'total',
      },
    ];
    const loop = data => data.map((item) => {
      return <p>{item.key}:{item.name}</p>;
    });

    const datasourse = [];
    for (let i = 0; i < 2; i++) {
      datasourse.push({
        key: i,
        state:0,
        back:0,
        shake_active:0,
        score_shake:0,
        score_change:0,
        free:0,
        give:0,
        pay:0,
        sale:0,
        total:0
      });
    }
    return(
      <div style={{width:'70%',margin:'100px auto'}}>
        <Breadcrumb style={{lineHeight:'30px'}}>
          <BreadcrumbItem  style={{lineHeight:'50px'}}><a href="/">礼品管理</a></BreadcrumbItem>
          <BreadcrumbItem>礼品使用详情</BreadcrumbItem>
        </Breadcrumb>
        <Card title={`礼品信息`} style={{width:'40%',display:'inline-block',marginRight:'50px',verticalAlign:'top'}}>
          {loop(data)}
        </Card>
        <Card title={`礼品统计`} style={{width:'55%',display:'inline-block'}}>
          <Table columns = {columns} dataSource = {datasourse}></Table>
          <Input addonAfter={`元`} defaultValue="mysite" />
        </Card>

      </div>

    );
  }

}
