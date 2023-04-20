import React from 'react';
import './MessageSuccess.css';
import './MessageSuccess.css';
import { Row, Col, Card } from 'react-bootstrap';
import successSent from './../../img/success-sent.svg';

const MessageSuccess: React.FC = () => {
	return (
		<Row className="row mr-0 mb-4" style={{ width: '100%' }}>
			<Col className="col-xl-12 col-md-12 offset-s-1 pl-4 ">
				<Card
					className="card padding-bottom-small  pt-4 pl-2"
					id="help-contact"
				>
					{/* Card Body */}
					<Col className="col-xl-12 col-md-12 offset-s-1 ">
						<Row className="row mb-4 justify-content-center">
							<Col
								className="col-xl-12 col-md-12 pl-4 pb-4"
								id="sent-success"
							>
								{/*title and unit id*/}
								<img
									className="img-fluid p-2 pl-4 pt-4 mt-4 mb-1"
									src={successSent}
									alt=""
								/>
								<p className=" text-center pb-0 mb-0 pt-2 pb-4 font-weight-normal">
									Your message has been sent successfully.
									<br />
									<br /> We will get in touch shortly.
								</p>
								<input
									type="button"
									className="btn btn-success mt-2 pl-3"
									name="btn"
									defaultValue="BACK TO HOME"
									id="homeBtn"
								/>
							</Col>
						</Row>
					</Col>
				</Card>
			</Col>
		</Row>
	);
};

export default MessageSuccess;
