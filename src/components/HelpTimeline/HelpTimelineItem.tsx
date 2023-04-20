import React, { useState } from 'react';
import './HelpTimeline.css';
import { Button, Collapse } from 'react-bootstrap';

interface Props {
	title: string;
	children?: any | any[];
}

const HelpTimelineItem: React.FC<Props> = (props) => {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(false);
	return (
		<li>
			{/* <a target="_blank" href="">New Web Design</a> */}
			<Button
				className="collapsible"
				onClick={() => {
					setOpen(!open);
					setActive(!active);
				}}
				aria-controls="example-collapse-text"
				aria-expanded={open}
				active={active}
			>
				{props.title}
			</Button>
			<Collapse in={open}>
				<div id="vsebina_zamaknjeno">{props.children}</div>
			</Collapse>
		</li>
	);
};

export default HelpTimelineItem;
