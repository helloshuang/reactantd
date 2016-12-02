import React from 'react';
import UnitInput from '../UnitInput/unitInput';
import SelectBoxs from '../SelectBoxs/selectBoxs';
import {Checkbox} from 'antd';
if (process.env.__CLIENT__===true){
  require('./style/cutAmount.less');
}
export default class CutAmount extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:false
    }
  }
  componentWillMount(){
    this.setState({unit:this.props.unit});
  }

  toggle = () =>{
    this.setState({
      visible:!this.state.visible,
    });
  }

  render(){

    const visible= this.state.visible? 'block':'none';
    const dataSelect = [
      {key:1,value:1,name:'元'},
      {key:2,value:2,name:'角'},
      {key:3,value:3,name:'分'}
    ];
    const type = this.props.type;
    const style = {
      display:visible
    }
    if(type=='withRadio'){
      return(
        <Checkbox onChange={this.toggle}>
          <div className={'cutAmount'}>
            <div className={'amountTit'}>{this.props.tit}</div>
            <div style={style}>
              <UnitInput addbefore={'减免范围'} addafter={this.state.unit} width="230px" InputWidth="135px"/>
              <UnitInput addbefore={'~'} addafter={this.state.unit} width="170px" InputWidth="135px"/>
              <SelectBoxs  label={'最小单位'} data={dataSelect} callBack = {(arg)=>{
              this.setState({ unit:  dataSelect[arg-1].name});
               }}/>
            </div>
          </div>
        </Checkbox>
      );
    }else{
      return(
        <Checkbox onChange={this.toggle}>
          <div className={'cutAmount'}>
            <div className={'amountTit'}>{this.props.tit}</div>
            <div style={style}>
              <UnitInput addbefore={'比例范围'} addafter={this.state.unit} width="230px" InputWidth="135px"/>
              <UnitInput addbefore={'~'} addafter={this.state.unit} width="170px" InputWidth="135px"/>
            </div>
          </div>
        </Checkbox>
      );
    }

  }
}
