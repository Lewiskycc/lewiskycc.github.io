import React from 'react';
import itemStyle from './style.css';

export default class MyItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			status: this.props.item.status,
			show: this.props.item.show
		};
	}
	handleClick(type) {
		this.props.onChange(type);
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			status: newProps.item.status,
			show: newProps.item.show
		});
	}
	render() {
		let itemClassName = itemStyle[`myitem-${this.state.status}`];
		return (
			<li style={{display: this.state.show ? '' : 'none'}}>
				<span onClick={this.handleClick.bind(this, 'changeStatus')}
					className={itemClassName}>
					{this.props.item.content}
				</span>
				<span onClick={this.handleClick.bind(this, 'remove')}
					className={itemStyle['myitem-closebtn']}>×</span>
			</li>
		);
	}
}