import React from 'react';
interface Props {
	title: string;
}

const PageTitle: React.FC<Props> = (props) => {
	return (
		<div className="d-sm-flex align-items-center justify-content-between">
			<h1 className="h4 text-gray-800 page-title">{props.title}</h1>
		</div>
	);
};

export default PageTitle;
