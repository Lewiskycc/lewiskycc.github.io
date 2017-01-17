import React from 'react';
import MyItem from '../my-item';
import radioStyle from './style.css';
export default class MyItemList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			itemList: this.props.itemList || []
			/**
				itemList = [{
					content: '',
					status: '',
					show: true
				}]
			*/
		}
	}
	changeItem(index, type) {
		this.props.onChange(type, index);
	}
	componentWillReceiveProps(newProps, oldProps) {
		this.setState({
			itemList: newProps.itemList.map(v => {
				if(newProps.status === 'all') {
					v.show = true;
				} else {
					v.show = (v.status === newProps.status);
				}
				return {...v};
			})
		});
	}

	render() {
		return (
			<ul className={radioStyle.itemList}>
				{
					this.state.itemList.map((v, i) => {
						return (<MyItem item={v} key={i}
							onChange={this.changeItem.bind(this, i)}
						/>);
					}).filter(v => v.props.item.show)
				}
			</ul>
		);
	}
}