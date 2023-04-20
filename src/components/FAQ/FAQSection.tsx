import React from 'react';
import './FAQ.css';

interface Props {
	title: string;
	id: string;
	children?: any[] | any;
}

const FAQSection: React.FC<Props> = (props) => {
	return (
		<div className="ac pl-3 pr-3">
			<input
				className="ac-input"
				id={props.id}
				name={props.id}
				type="checkbox"
			/>
			<label className="ac-label text-left" htmlFor={props.id}>
				{props.title}
			</label>
			<article className="ac-text">
				<p>{props.children}</p>
			</article>
		</div>
	);
};

export default FAQSection;
