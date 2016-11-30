import React from 'react';
import {Table, Input, Popconfirm, Modal, Button} from 'antd';

export class EditableCell extends React.Component {
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
    this.columns = [
      {
      title: '序号',
      dataIndex: 'num',
      width: '8%',
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
    this.state = {
      tit:'调价菜品类别',
      batchTlt:'批量添加类别',
      data: [{
        key: '0',
        operation: {
          value: '32',
        },
        category: {
          value: '饮料类',
        },
        code: {
          value: '110001',
        },
        editpercent: {
          editable: false,
          value: '+10',
        },
        editprice: {
          editable: false,
          value: '+8',
        },
      },
        {
          key: '1',
          operation: {
            value: '32',
          },
          category: {
            value: '饮料类',
          },
          code: {
            value: '110001',
          },
          editpercent: {
            editable: false,
            value: '+10',
          },
          editprice: {
            editable: false,
            value: '+8',
          },
        },
        {
          key: '2',
          operation: {
            value: '32',
          },
          category: {
            value: '饮料类',
          },
          code: {
            value: '110001',
          },
          editpercent: {
            editable: false,
            value: '+10',
          },
          editprice: {
            editable: false,
            value: '+8',
          },
        }],
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
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

  //添加一行市局
  handleAdd() {
    //const newDataSource = this.state.data;
    //newDataSource.push({
    //  operation: {
    //    value: '32',
    //  },
    //  category: {
    //    value: '饮料类',
    //  },
    //  code: {
    //    value: '110001',
    //  },
    //  editpercent: {
    //    editable: false,
    //    value: '+10',
    //  },
    //  editprice: {
    //    editable: false,
    //    value: '+8',
    //  }
    //});
    //this.setState({
    //  data: newDataSource,
    //});
    this.setState({
      visible: true,
    });
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

  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });

    const columns = this.columns;
    return (
      <div>
        <span>
          <span style={{fontWeight:900}}>{this.state.tit}</span>
          (空为不调整，上调输入正的，下调输入负的)
        </span>
        <span  style={{float:'right'}}>
          <a href="##"  onClick={this.handleAdd}>{this.state.batchTlt}</a>
        </span>
        <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
        <Modal title="Modal" visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel}
        okText="OK" cancelText="Cancel"
        >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
      </div>);
  }
}
