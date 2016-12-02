import React from 'react'
import { Input, Select, Icon } from 'antd';
if (process.env.__CLIENT__===true){
  require('./style/unitInput.less');
}
const Option = Select.Option;

export default class UnitInput extends React.Component{

  render(){
    const addBefore= this.props.addbefore;
    const addAfter = this.props.addafter;

    const styles = {
      background:this.props.background,
      width:this.props.width
    }
    const styles1 = {
      width:this.props.InputWidth,
      float:'right'
    }
    return (
      <div className="UnitInputAll clearfix" style={styles}>
        <Input type='text' addonBefore={addBefore} addonAfter={addAfter} defaultValue="" size="large" style={styles1} />
      </div>
    );

  }
}
