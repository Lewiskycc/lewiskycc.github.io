import React from 'react';
import inputStyle from './style.css';
export default class MyInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}
	handleChange(e) {
		this.setState({
			inputValue: e.target.value
		});
	}
	handleClick() {
		if(!this.state.inputValue.trim()) return;
		this.props.onChange(this.state.inputValue);
		this.setState({
			inputValue: ''
		});
	}
	handleEnter(e) {
		if(e.keyCode === 13) {
			e.preventDefault();
			this.handleClick();
		}
	}
	render() {
		return (
			<div>
				<input type="text"
					className={inputStyle.myinput}
					value={this.state.inputValue}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleEnter.bind(this)}
					placeholder={this.props.info}
					autoFocus
				/>
				<input type="button" value="添加"
					className={inputStyle.mybtn}
					onClick={this.handleClick.bind(this)}
				/>
			</div>
		);
	}
}