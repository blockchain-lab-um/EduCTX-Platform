import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import HelpChapter from '../../components/HelpChapter/HelpChapter';

const Help: React.FC = () => {
	return (
		<div>
			<div className="container-fluid" id="help">
				<PageTitle title="Help" />
				<HelpChapter></HelpChapter>
			</div>
		</div>
	);
};

export default Help;
