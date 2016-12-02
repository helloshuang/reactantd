import React from 'react';
import {Table, Icon, Popconfirm, Modal, Button,Switch,Input} from 'antd';
if (process.env.__CLIENT__===true){
  require('./style/editableTable.less');
}
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    visible: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (<div>
      {
        editable ?
          <div>
            <Input
              value={value}
              onChange={e => this.handleChange(e)}
              autofocus = {true}
            />
          </div>
          :
          <div className="editable-row-text">
            {value || ' '}
          </div>
      }
    </div>);
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columnsone =  [
      {
        title: '序号',
        dataIndex: 'num',
        width: '8%',
        //参数分别为当前行的值，当前行数据，行索引，return可以决定表格里最终存放的值
        render: (text, record, index) => {
          return <span>{index+1}</span>
        },
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">

              <span>
              <a onClick={() => this.handleAdd()}>添加</a>
                &nbsp;
                <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDel(index)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            </div>
          );
        },
      }, {
        title: '菜品类别',
        dataIndex: 'category',
        width: '20%',
        render: (text, record, index) => this.renderColumns(this.state.data, index, 'category', text),
      },{
        title: '编码',
        dataIndex: 'code',
        width: '20%',
        render: (text, record, index) => this.renderColumns(this.state.data, index, 'code', text),
      }, {
        title: '调整比例(%)',
        dataIndex: 'editpercent',
        width: '20%',
        render: (text, record, index) => {
          const { editable } = this.state.data[index].editpercent;
          return (<div className="editable-row-operations">
            {
              editable ?
                <span onBlur={() => this.editDone(index, 'save')}>
                {this.renderColumns(this.state.data, index, 'editpercent', text)}
              </span>
                :
                <span onClick={() => this.edit(index,record)}>
               {this.renderColumns(this.state.data, index, 'editpercent', text)}
             </span>
            }
          </div>);
        }
      }, {
        title: '调整价格(元)',
        dataIndex: 'editprice',
        width: '20%',
        render: (text, record, index) => {
          const { editable } = this.state.data[index].editpercent;
          return (<div className="editable-row-operations">
            {
              editable ?
                <span onBlur={() => this.editDone(index, 'save')}>
                {this.renderColumns(this.state.data, index, 'editpercent', text)}
              </span>
                :
                <span onClick={() => this.edit(index,record)}>
               {this.renderColumns(this.state.data, index, 'editpercent', text)}
             </span>
            }
          </div>);
        }
      }];
    this.columnstwo = [
      {
        title: '序号',
        dataIndex: 'num',
        //参数分别为当前行的值，当前行数据，行索引，return可以决定表格里最终存放的值
        render: (text, record, index) => {
          return <span>{index+1}</span>
        },
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            <div className="editable-row-operations">
              <span>
                <a onClick={() => this.handleAdd()}>查看</a>
                &nbsp;
                <a onClick={() => this.handleAdd()}>修改</a>
                &nbsp;

                <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDel(index)}>
                  <a>删除</a>
                </Popconfirm>
                &nbsp;
                <a onClick={() => this.handleAdd()}>适应店铺</a>

              </span>
            </div>
          );
        },
      }, {
        title: '活动类型',
        dataIndex: 'activityType',
      },{
        title: '活动名称',
        dataIndex: 'activityName',
      },{
        title: '活动编码',
        dataIndex: 'activityCode',
      }, {
        title: '有效时间',
        dataIndex: 'validTime',
      }, {
        title: '活动状态',
        dataIndex: 'activityState',
      },{
        title: '创建人/修改人',
        dataIndex: 'creater',
      },{
        title: '创建时间/修改时间',
        dataIndex: 'createTime',
      },{
        title: '启用状态',
        dataIndex: 'enabled',
        render: (text, record, index) => {
          return <div className={'enabled-switch'}><Switch checkedChildren={'已启用'} unCheckedChildren={'未启用'}></Switch></div>
        }
      },{
        title: '排序',
        dataIndex: 'sort',
        render: (text, record, index) => {
          return (
            <span>
              <Icon type="verticle-right" onClick={() =>this.toTop(this.state.data,index)}/>&nbsp;
              <Icon type="verticle-left" onClick={() =>this.toBottom(this.state.data,index)} />&nbsp;
              <Icon type="left"  onClick={() =>this.upRecord(this.state.data,index)}/>&nbsp;
              <Icon type="right"  onClick={() =>this.downRecord(this.state.data,index)}/>
            </span>
          );
        }
      }];

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

  }
  componentWillMount(){
    this.setState({ data:this.props.data});
    this.columns = this.getColumns();
  }
  //根据colName来获取相应的表格格式
  getColumns(){
    const colName = this.props.colName;
    if(colName==1){
      return this.columnsone;
    }else {
      return this.columnstwo;
    }
  }


  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

//编辑
  edit(index,record) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
    console.log(record);
  }
  //编辑结束
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  handleAdd() {
    this.setState({
      visible: true,
    });
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }

  handleOk() {
    this.setState({
      visible: false,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  //删除一行数据
  handleDel(index){
    const DelDataSource = this.state.data;
    DelDataSource.splice(index, 1);
    this.setState({
      data: DelDataSource,
    });
  }

  // 交换数组元素
  swapItems = (arr, index1, index2)=> {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  };

  // 上移
  upRecord =(arr, index)=> {
    if(index == 0) {
      return;
    }
    this.swapItems(arr, index, index - 1);
    this.setState({
      data: arr,
    });
    console.log("up");
  };

  // 下移
  downRecord =(arr, index)=> {
    if(index == arr.length -1) {
      return;
    }
    this.swapItems(arr, index, index + 1);
    this.setState({
      data: arr,
    });
    console.log("down");
  };
  //置顶
  toTop = (arr, index) =>{
    console.log("upTop");
    arr.unshift(arr[index]);
    arr.splice(index+1, 1);
    this.setState({
      data: arr,
    });
  }
  //置底
  toBottom = (arr, index) =>{
    console.log("downBottom");
    arr.push(arr[index]);
    arr.splice(index, 1);
    this.setState({
      data: arr,
    });
  }

  render() {

    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });

    return (
      <div>
        <Table className={'editTable'} bordered dataSource={dataSource} columns={this.columns} pagination={false} />
        <Modal title="Modal" visible={this.state.visible}
               onOk={this.handleOk} onCancel={this.handleCancel}
               okText="OK" cancelText="Cancel"
        ></Modal>
      </div>);
  }
}
