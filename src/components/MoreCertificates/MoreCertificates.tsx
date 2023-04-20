import React from 'react';
import './MoreCertificates.css';
import { Row, Card } from 'react-bootstrap';

const MoreCertificates: React.FC = () => {
	return (
		<Row className=" margin-bottom-ml pl-1 pr-4">
			{/* VERYFY ANOTHER*/}
			<Card className=" col-xl-12 offset-l-1 px-3 " id="verify">
				<Card.Body className="card-body p-1">
					<Row className="row m-0 p-1 pb-0  ">
						<p className="mb-1 mt-1 pt-1 mr-2 pr-3 font-weight-light">
							Have more certificates?
						</p>
						<a
							href="verify.2.html"
							className="btn btn-info ml-1 mt-1 pr-3"
						>
							<span className="font-weight-semibold ">
								VERIFY ANOTHER
							</span>
						</a>
					</Row>
				</Card.Body>
			</Card>
		</Row>
	);
};

export default MoreCertificates;
