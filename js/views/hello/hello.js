import React from 'react';
import MyInput from '../../components/my-input';
import MyRadioGroup from '../../components/my-radio-group';
import MyItemList from '../../components/my-item-list';
import helloStyle from './style.css';
export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	radioList: [{
	      text: '全部',
	      selected: true,
	      value: 'all'
	    }, {
	      text: '未完成',
	      selected: false,
	      value: 'yes'
	    }, {
	      text: '已完成',
	      selected: false,
	      value: 'no'
	    }].map(v => (v.name = 'todo') && v),
	    itemList: []
    };
  }
  onStatusChange(i) {
  	let radioList = this.state.radioList.map(v => {
  		v.selected = false;
  		return v;
  	});
  	radioList[i].selected = true;
  	this.setState({
  		radioList
  	});
  }
  onItemAdd(item) {
  	this.setState({
  		itemList: this.state.itemList.concat([{
  			content: item,
  			status: 'yes',
  			show: true
  		}])
  	});
  }

  onItemChange(type, i) {
  	let itemList = this.state.itemList.slice();
  	switch(type) {
  		case 'remove':
  			itemList.splice(i, 1);
  			break;
  		case 'changeStatus':
  			itemList[i].status = itemList[i].status === 'yes' ? 'no' : 'yes'
  			break;
  		default: break;
  	}
  	this.setState({
  		itemList
  	});
  }

	render() {
		let status = this.state.radioList.find(v => v.selected).value;
		return (<div className={helloStyle.lc_center}>
			<h2 className={helloStyle.indent1}>webpack+es6+react热加载项目</h2>
			<form>
				<MyInput
					onChange={this.onItemAdd.bind(this)}
					info={'请输入待办事项'}
				/>
				<MyRadioGroup
					radioList={this.state.radioList}
					onChange={this.onStatusChange.bind(this)}
				/>
				<MyItemList
					itemList={this.state.itemList}
					onChange={this.onItemChange.bind(this)}
					status={status}
				/>
			</form>
		</div>);
	}
};