import React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class Radiobuttons extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type:'radio',
      value:'rightnow',
      lable:'评价返赠选择',
      size:'default',
      data:[
        {key:1,value:'rightnow',name:'提交评价或问券即返赠'},
        {key:2,value:'aftercheck',name:'评价或问券审核有效后返赠'}
      ]};
  }

  handleInputChange (e){
    this.setState({
      value: e.target.value,
    });
  }
  render () {
      let label = this.state.lable;
      let data = this.state.data.map(function (item) {
      let type = this.state.type;
        if(type=='button'){
          return	<RadioButton key={item.key} disabled={item.disabled} value={item.value}>{item.name}</RadioButton>
        }else{
          return	<Radio key={item.key} disabled={item.disabled} value={item.value}>{item.name}</Radio>
        }
    }.bind(this));
    return (
      <div>
        <span style={{fontWeight:900}}>{label}&nbsp;</span>
        <RadioGroup value={this.state.value} size={this.state.size} onChange={e => this.handleInputChange(e)}>
          {data}
        </RadioGroup>
      </div>
    );
  }
}
