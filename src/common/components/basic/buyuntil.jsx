import React from 'react';
import { Input, Select, Icon } from 'antd';
const Option = Select.Option;

export default class BuyUntil extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:{
        addonBefore:'消费满',
        addonAfter:'元',
        defaultValue:100
      }
    }
  }

  render(){
    return(
      <div style={{ marginBottom: 16, width:300,}}>
          <Input addonBefore={this.state.data.addonBefore} addonAfter={this.state.data.addonAfter} defaultValue={this.state.data.defaultValue} style={{ textAlign:'right'}}/>
      </div>
    );
  }
}
