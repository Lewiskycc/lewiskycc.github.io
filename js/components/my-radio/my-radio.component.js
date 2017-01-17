import React from 'react';
import radioStyle from './style.css';
export default function MyRadio (props) {
  return (
		<span className={radioStyle.myradiocontainer}>
			<input type="radio"
				className={radioStyle.myradio}
				name={props.name}
				value={props.value}
				checked={props.selected}
				onChange={props.onSelect}
			/>
			<label onClick={props.onSelect}>{props.text}</label>
		</span>
	);
}
