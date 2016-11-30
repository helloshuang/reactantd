import React from 'react';
import {Input, Icon} from 'antd';

export default class NSales extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{
        addonBefore:'选择第二件打折'
      }
    }
  }
  render(){

    return(
      <div style={{width:300}}>
        <Input addonBefore={this.state.data.addonBefore}/><Icon type="minus-circle-o" /><Icon type="plus-circle-o" />
      </div>
    );
  }

}
