import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  Row,
  Col,
  Modal,
  Button,
  Menu,
  Icon,
  Tabs,
  // Tree,
} from 'antd';
import Giftuseinfo from '../../components/basic/giftuseinfo'

export default class Newcs extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    console.log('ok')
    return(
      <div>
        <Giftuseinfo/>
        {/*注释*/}
      </div>
    )
  }
}
