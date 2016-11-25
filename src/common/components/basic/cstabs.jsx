import {
  Tabs,
  Icon,
  Calendar
} from 'antd';
import React from 'react';
import moment from 'moment';

import MenuTwo from "../../components/basic/menutwo";
const TabPane = Tabs.TabPane;

export default class CsTabs extends React.Component{

  render(){
    return (<Tabs defaultActiveKey="1">
      <TabPane tab="Tab 1" key="1"><div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
        <Calendar fullscreen={false}/>
      </div></TabPane>
      <TabPane tab="Tab 2" key="2"><MenuTwo /></TabPane>
      <TabPane tab="Tab 3" key="3"></TabPane>
      <TabPane tab="Tab 4" key="4"><Icon type="meh-o" /></TabPane>
      <TabPane tab="Tab 5" key="5"><Icon type="smile" /></TabPane>
      <TabPane tab="Tab 6" key="6"><Icon type="smile-o" /></TabPane>
      <TabPane tab="Tab 7" key="7"><Icon type="like" /></TabPane>
      <TabPane tab="Tab 8" key="8"><Icon type="like-o" /></TabPane>
      <TabPane tab="Tab 9" key="9"><Icon type="dislike" /></TabPane>
      <TabPane tab="Tab 10" key="10"><Icon type="dislike-o" /></TabPane>
    </Tabs>);
  }

};
