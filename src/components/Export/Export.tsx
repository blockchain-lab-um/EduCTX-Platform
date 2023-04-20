import React from 'react';
import './Export.css';
import createZip from '../../pdf-zip/getZippedPdfsWithJsons.js';
import { connect } from 'react-redux';

interface Props {
	certs?: any;
	getAuthorizedAddressCa?: any;
}

class ExportRaw extends React.Component<Props, any> {
	constructor(props: any) {
		super(props);
		this.export = this.export.bind(this);
	}

	async export() {
		const exportedCertificates = this.props.certs;
		createZip(exportedCertificates, this.props.getAuthorizedAddressCa);
	}

	render() {
		return (
			<div>
				<div className="card">
					<div className="card-body text-left" id="export">
						<div className="row  margin-bottom-lg pt-0 mt-0 mr-0 mb-0">
							<div className="col-lg-2 form-inline">
								<button
									className="btn btn-success pl-4 mt-4"
									name="btn"
									id="export"
									onClick={this.export}
								>
									EXPORT
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => ({
	getAuthorizedAddressCa: (address: string) =>
		state.contracts.ca.getAuthorizedAddressCa(address, {
			from: state.address,
		}),
});

const Export = connect(mapStateToProps)(ExportRaw);

export default Export;
