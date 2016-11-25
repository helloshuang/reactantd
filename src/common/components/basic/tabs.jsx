/**
 * Created by wxk on 2016/7/28.
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import  Meta  from "../../components/basic/view";
import CsTabs from "../../components/basic/cstabs";

import {
  Row,
  Col,
  Modal,
  Button,
  Menu,
  Icon,
  Tabs,
  Tag
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
                <p>这是首页桌面</p>

                <Row style={{textAlign:'center'}}>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'lightBlue'}}>第一个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'pink'}}>第二个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'grey'}}>第三个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'yellow'}}>第四个</h1></Col>
                </Row>
                <br/>
                <Row gutter={16} style={{textAlign:'center'}}>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'lightBlue',padding: '0 16px'}}>第一个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'pink',padding: '0 16px'}}>第二个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'grey',padding: '0 16px'}}>第三个</h1></Col>
                  <Col span={6}><h1 style={{border:'solid 1px red',backgroundColor:'yellow',padding: '0 16px'}}>第四个</h1></Col>
                </Row>
                <br/>
                <Row style={{textAlign:'center'}}>
                  <Col span={6} offset={2}><h1 style={{border:'solid 1px red',backgroundColor:'lightBlue'}}>第一个</h1></Col>
                  <Col span={6} offset={2}><h1 style={{border:'solid 1px red',backgroundColor:'pink'}}>第二个</h1></Col>
                  <Col span={6} offset={2}><h1 style={{border:'solid 1px red',backgroundColor:'grey'}}>第三个</h1></Col>
                </Row>
                <Tag color="#f50" closable >#f50</Tag>
                <Tag color="#87d068" closable >#87d068</Tag>
                <Tag color="#2db7f5" closable >#2db7f5</Tag>
                <CsTabs/>
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
