/**
 * Created by wxk on 2016/7/28.
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import  Meta  from "../../components/basic/view";
import MarketingGift from "../../components/basic/marketinggift";
import MarketingActive from "../../components/basic/Marketingactive";
import BuyUntil from "../../components/basic/buyuntil";
import Nsales from "../../components/basic/nsales";
import Add from "../../components/basic/add";
import SelectGroup from "../../components/basic/selectgroup";
import EditableTable from "../../components/basic/EditableTable/editableTable";
import SelectBoxs from "../../components/basic/SelectBoxs/selectBoxs";
import UnitInput from "../../components/basic/UnitInput/unitInput";
import CutAmount from "../../components/basic/CutAmount/cutAmount";
import AddOrDelInput from "../../components/basic/AddOrDelInput/addOrDelInput";
import {
  Row,
  Col,
  Modal,
  Button,
  Menu,
  Icon,
  Tabs,
  Tag,
  Affix,
  Popconfirm,
  Checkbox
  // Tree,
} from 'antd';
import  Refer  from "./refer";
import * as tabsactions from '../../redux/modules/tabs'
import * as modalactions from '../../redux/modules/modal'

const TabPane = Tabs.TabPane;

let index = 3;


class TabList extends Component {
  constructor(props){
    super(props);
    this.list = [];//渲染队列
    this.keylist =[];//维护渲染队列时候便于比对key值
    this.newmetaid = 0;
  }

  onTreeChange = (activeKey)=>{//tabs切换
    let {tabsactions,modal,tabs} = this.props,
      pane = tabs.panes.filter((item)=>{
        return item.key === activeKey;
      });
    if(pane.indexopen === modal.indexopen){
      tabsactions.onTreeChange(activeKey);
      //let timestamp=new Date().getTime();
      //console.log('timestamp'+timestamp);
      this.tabflag = true;
    }
    else {
      tabsactions.onRerander(activeKey,modal.indexopen);
    }
  };

  onTreeEdit = (targetKey, action)=>{//删除tab时候调用this.remove
    this[action](targetKey)
  };

  remove = (targetKey)=>{
    let {tabsactions} = this.props;
    tabsactions.TabDel(targetKey);
    this.tabflag = true;
  };

  /*shouldComponentUpdate = (nextProps, nextState)=>{
    console.log('this.props.id:'+this.props.id+'nextProps.id:'+nextProps.id);
    return nextProps.id !== this.props.id;
  };*/

  render(){
    const dataTableone = [
      {
        key: '0',
        operation: {
          value: '32',
        },
        category: {
          value: '饮料类',
        },
        code: {
          value: '110001',
        },
        editpercent: {
          editable: false,
          value: '+10',
        },
        editprice: {
          editable: false,
          value: '+8',
        },
      },
      {
        key: '1',
        operation: {
          value: '32',
        },
        category: {
          value: '饮料类',
        },
        code: {
          value: '110001',
        },
        editpercent: {
          editable: false,
          value: '+10',
        },
        editprice: {
          editable: false,
          value: '+8',
        },
      },
      {
        key: '2',
        operation: {
          value: '32',
        },
        category: {
          value: '饮料类',
        },
        code: {
          value: '110001',
        },
        editpercent: {
          editable: false,
          value: '+10',
        },
        editprice: {
          editable: false,
          value: '+8',
        },
      }];
    const dataTabletwo = [
      {
        key: '0',

        activityType: {
          value: '满减活动1',
        },
        activityName: {
          value: '情人节活动',
        },
        activityCode: {
          value: '11002222',
        },
        validTime: {
          value: '2016.11.05--2016.12.31',
        },
        activityState: {
          value: '未开始',
        },
        creater: {
          value: 'doulaofang',
        },
        createTime: {
          value: '2016.11.01/2016.11.02',
        }
      },
      {
        key: '1',

        activityType: {
          value: '满减活动2',
        },
        activityName: {
          value: '情人节活动',
        },
        activityCode: {
          value: '11002222',
        },
        validTime: {
          value: '2016.11.05--2016.12.31',
        },
        activityState: {
          value: '未开始',
        },
        creater: {
          value: 'doulaofang',
        },
        createTime: {
          value: '2016.11.01/2016.11.02',
        }
      },
      {
        key: '2',

        activityType: {
          value: '满减活动3',
        },
        activityName: {
          value: '情人节活动',
        },
        activityCode: {
          value: '11002222',
        },
        validTime: {
          value: '2016.11.05--2016.12.31',
        },
        activityState: {
          value: '未开始',
        },
        creater: {
          value: 'doulaofang',
        },
        createTime: {
          value: '2016.11.01/2016.11.02',
        }
      }];
    const dataSelect = [
      {key:1,value:1,name:'提交评价或问券即返赠'},
      {key:2,value:2,name:'评价或问券审核有效后返赠'}
    ];
    const dataSelectTwo = [
      {key:1,value:1,name:'全部'},
      {key:2,value:2,name:'菜品分类'},
      {key:3,value:3,name:'菜品'}
    ];
    let { tabs,tabsactions } = this.props;
    if(tabs.tabflag){//只有更新时候进入此分支
      let length = tabs.panes.length,//this.keylist.length>?this.keylist.length:tabs.panes.length;
        i=0,
        width = 0;
      if(this.refs.container){
        width = this.refs.container.clientWidth;
      }
      for(;i<length;i++){//遍历panes数组，更新tabs渲染队列
        let pane = tabs.panes[i];
        if(this.list[i]){
          if(pane.key!==this.keylist[i]){//如果遍历到的渲染队列的元素跟panes的对不上，则认为是已经删除，就把其从渲染队列中删除
            this.list.splice(i,1);
            this.keylist.splice(i,1);
          }
          else {
            if(tabs.activeKey===pane.key){
              if(pane.content!=='index') {
                if (pane.content.vm) {
                  this.list[i] = (<TabPane tab={pane.title} key={pane.key}>
                    <Meta width={width} vm={pane.content.vm} metaData={pane.content.metaData}
                          id={`meta${this.newmetaid++}`}/>
                  </TabPane>);
                }
              }
              /*else {//如果vm为空则认为是首页
                this.list[i] =(
                  <TabPane tab={pane.title} key={pane.key}>
                    <p/>这是首页桌面
                  </TabPane>);
                this.keylist.push(pane.key);
              }*/
            }
          }
        }
        else {//如果渲染队列比panes短，则将长出的元素放入渲染队列
          if(pane.content.vm){
            //const width = parseInt(this.refs.container.clientWidth / 100) * 100;
            this.list.push(<TabPane tab={pane.title} key={pane.key}>
              <Meta width={width} vm={pane.content.vm} metaData={pane.content.metaData} id={`meta${this.newmetaid++}`}/>
            </TabPane>);
            /*timestamp=new Date().getTime();
            console.log('timestamp2'+timestamp);*/
            this.keylist.push(pane.key);
          }
          else {//如果vm为空则认为是首页
            this.list.push(
              <TabPane tab={pane.title} key={pane.key}>
                <Tabs>
                  <TabPane tab='菜品管理' key='1'>
                    <SelectGroup/>
                    <br/>
                    <EditableTable colName={1} data={dataTableone}/>
                    <br/>
                    <EditableTable colName={2} data={dataTabletwo}/>
                    <br/>
                    <SelectBoxs label={'评价返赠选择'} data={dataSelect}/>
                    <br/>
                    <SelectBoxs label={'活动范围'} data={dataSelectTwo}/>
                    <br/>
                    <CutAmount unit={'元'} type={'withRadio'} tit={'按金额随机减'}/>
                    <br/><br/>
                    <CutAmount unit={'%'} tit={'按账单金额比例随机折扣'}/>
                  </TabPane>
                  <TabPane tab='礼品管理' key='2'>
                    <AddOrDelInput/>
                  </TabPane>
                </Tabs>

              </TabPane>);
            this.keylist.push(pane.key);
          }
        }
      }
      if(this.list[i]){//如果遍历完成后list内容比panes多，则删除多余的pane
        this.list.splice(i,1);
        this.keylist.splice(i,1)
      }
      tabsactions.disableTabflag();
    }

    console.log(this.list);
    return(
      <div ref="container">
      <Tabs
        hideAdd
        onChange={this.onTreeChange}
        activeKey={tabs.activeKey}
        type="editable-card"
        onEdit={this.onTreeEdit}
      >
        {this.list}
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tabs : state.tabs.toJS(),
    modal: state.modal.toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions : bindActionCreators( tabsactions , dispatch ),
    modalactions: bindActionCreators(modalactions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabList);
