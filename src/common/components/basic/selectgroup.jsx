import React from 'react';
import {Icon,Modal,Tag} from 'antd';

export default class SelectGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false,
      label:'选择群体',
      data:[
        {
          name:'宫保鸡丁',
          key:1
        },
        {
          name:'干煸豆角',
          key:2
        },
        {
          name:'干煸豆角',
          key:3
        },
        {
          name:'干煸豆角',
          key:4
        }
      ]

    };

  }
  showModal=() => {
    this.setState({
      visible: true,
    });
  }
  handleOk=() =>{
    this.setState({
      visible: false,
    });
  }
  handleCancel=() => {
    this.setState({
      visible: false,
    });
  }
  handleClose = (key) => {
    const tags = [...this.state.data].filter(tag => (tag.key !== key) && tag);
    console.log(this.state.data);
    this.setState({ data:tags });
  }

  render(){
    const {data} = this.state;
    var showStyle;
    if(data.length==0){
      showStyle = (
        <div>
          <span style={{fontWeight:'900'}}>{this.state.label}&nbsp;</span>
          <div style={{minHeight:'100px',width:'500px',border:'1px solid #cecece',display:'inline-block',verticalAlign:'middle',textAlign:'center'}}>
            <div style={{cursor:'default'}} onClick = {this.showModal}>
              <Icon type="plus-circle-o" style={{display:'block'}}/>
              <span>点击{this.state.label}</span>
            </div>
            <Modal title="Basic Modal" visible={this.state.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            ></Modal>
          </div>
        </div>
      );
    }else{
      showStyle = (
        <div>
          <span style={{fontWeight:'900'}}>{this.state.label}&nbsp;</span>
          <div style={{minHeight:'100px',width:'500px',border:'1px solid #cecece',display:'inline-block',verticalAlign:'middle'}}>
            {data.map(tag =>
              <Tag key={tag.key} closable={true} afterClose={() => this.handleClose(tag.key)}>
                {tag.name}
              </Tag>
            )}

            <Modal title="Basic Modal" visible={this.state.visible}
                   onOk={this.handleOk} onCancel={this.handleCancel}
            ></Modal>
          </div><Icon type="plus-circle-o" onClick = {this.showModal}/>
        </div>
      )
    }

    return showStyle;

  }
}
