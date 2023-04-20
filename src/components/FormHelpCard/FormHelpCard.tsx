import React from 'react';
import './FormHelpcard.css';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

interface Props {
	name?: any;
}

const FormHelpCard: React.FC<Props> = (props) => {
	return (
		<div
			className="card p-4"
			style={{
				display: 'flex',
				flex: '1',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<FontAwesomeIcon
					icon={faQuestionCircle}
					className="mb-1"
					style={{ color: '#BFBFBF' }}
				/>
				<h3>Help</h3>
			</div>
			<div className="pt-2 text-mid-grey">{props.name}</div>
		</div>
	);
};

export default FormHelpCard;
