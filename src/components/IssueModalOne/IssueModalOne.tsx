import React from 'react';
import './IssueModalOne.css';
import { Row, Col, Card } from 'react-bootstrap';
import umlogo from './../../img/um-logo.svg';

const IssueModalOne: React.FC = () => {
	return (
		<div
			className="modal fade"
			id="confirm-submit"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="myModalLabel"
			aria-hidden="true"
			data-dismiss="confirm-submit"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<Row className="row ml-2 mt-2 mb-0">
							<h3 className="bold font-weight-semibold">
								Review
							</h3>
						</Row>
					</div>
					<div className="modal-body pl-4 pt-0 mt-0 pr-4">
						<p>Certificate</p>
						<p className="font-weight-normal small">Title:</p>
						<p className="font-weight-normal small">Unit ID:</p>
						<p className="font-weight-normal small">Achievment:</p>
						<p className="font-weight-normal small">
							Certificate short description:
						</p>
						<p className="font-weight-normal small">
							Full description URI:
						</p>
						<p className="font-weight-normal small">
							Certificate type:
						</p>
						<p className="font-weight-normal small">Value:</p>
						<p className="font-weight-normal small">
							Measurment unit:
						</p>
						<hr
							style={{
								marginLeft: '-1.5rem',
								marginRight: '-1.5rem',
							}}
						/>
						<p>Reciever</p>
						<p className="font-weight-normal small">
							Recipient EduCTX ID:
						</p>
						<p className="font-weight-normal small">Student ID:</p>
						<p className="font-weight-normal small">First name:</p>
						<p className="font-weight-normal small">Last name:</p>
					</div>
					<div className="modal-footer">
						<Col className="col-lg-12">
							<Row className="row text-midgrey">
								<div className="col-md-1 col-lg-1">
									{/* <i class="small far fa-question-circle mr-2 pl-2"></i>*/}
									<img
										className="nav-icon"
										src="img/exclamation.svg"
										alt="exclamation"
										style={{ marginTop: '0rem' }}
									/>
								</div>
								<Col className="col-md-10 col-lg-10 pl-0">
									<p className="small inline">
										Please recheck information carefully and
										be aware that the certificates cannot be
										edited after issuing.
									</p>
								</Col>
							</Row>
							<Row className="row">
								<Col className="col-lg-4 offset-md-2 pl-0">
									<a
										href="#"
										id="submit"
										className="btn btn-success success "
										data-target="#confirm-submit-final"
										data-dismiss="modal"
										data-toggle="modal"
									>
										ISSUE
									</a>
								</Col>
								<Col className="col-lg-4">
									<button
										type="button"
										className="btn btn-secondary"
										data-dismiss="modal"
									>
										CANCEL
									</button>
								</Col>
							</Row>
						</Col>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IssueModalOne;
