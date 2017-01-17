import React from 'react';
import MyRadio from '../my-radio';
import __style from './style.css';
export default class MyRadioGroup extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    radioList: this.props.radioList || []
	  };
	}
	onSelect(i) {
		this.props.onChange(i);
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			radioList: newProps.radioList
		});
	}
	render() {
		return (
			<div className={__style.fr}>
				{this.state.radioList.map((v, i) => {
					return <MyRadio key={i} onSelect={this.onSelect.bind(this, i)} {...v} />;
				})}
			</div>
		);
	}
}