import React from 'react';
import { Radio } from 'antd';

if (process.env.__CLIENT__===true){
  require('./style/selectBoxs.less');
}

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class SelectBoxs extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type: 'radio',
      value: 1,
      size: 'default',
    }
  }
  componentWillMount(){
    this.setState({ data:this.props.data});
  }
  handleInputChange=(e)=>{
    if(this.props.callBack){
      let {callBack} = this.props;
      callBack(e.target.value);
    }

    this.setState({
      value: e.target.value,
    });
  }
  render () {
    let label = this.props.label;
    let data = this.state.data.map(function (item) {
      return	<Radio key={item.key} disabled={item.disabled} value={item.value} size={'large'}>{item.name}</Radio>
    }.bind(this));
    return (
      <div className={'selectBox'}>
        <span className={'selectLabel'}>{label}&nbsp;</span>
        <RadioGroup value={this.state.value} size={this.state.size} onChange={e => this.handleInputChange(e)}>
          {data}
        </RadioGroup>
      </div>
    );
  }
}
