import React from 'react';
import { FilePond } from 'react-filepond';
import './DragDrop2.css';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import { Alert } from 'react-bootstrap';
let JSZip = require('jszip');

interface IProps {
	checkFile?: any;
	unzippedFile?: any;
	setName?: any;
}

class DragDropV2 extends React.Component<IProps, any> {
	constructor(props: IProps) {
		super(props);
		this.state = { listEmpty: true, fileName: '', show: false };
	}
	async checkFile(file: any) {
		if (
			file.type !== 'application/x-zip-compressed' &&
			file.type !== 'application/zip'
		) {
			console.log(file.type);
			this.setState({ show: true, listEmpty: true });
		} else {
			let unzipped = await this.unzipFile(file);
			this.setState({ fileName: file.name });
			this.props.setName(this.state.fileName, this.state.listEmpty);
			this.props.unzippedFile(unzipped);
		}
	}

	unzipFile(file: any) {
		return new Promise(async (resolve, reject) => {
			let jsonCertArray = [];
			try {
				const zip = await JSZip.loadAsync(file);
				for (const filename of Object.keys(zip.files)) {
					if (
						filename.substr(filename.lastIndexOf('.') + 1) ===
						'json'
					) {
						let fileData = await zip.files[filename].async('text');
						jsonCertArray.push(JSON.parse(fileData));
					}
				}
				resolve(jsonCertArray);
			} catch (error) {
				reject(error);
			}
		});
	}

	pond: any;

	render() {
		if (this.state.show) {
			return (
				<Alert
					variant="danger"
					onClose={() => this.setState({ show: false })}
					dismissible
				>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>Only .zip files are allowed.</p>
				</Alert>
			);
		} else {
			return (
				<div
					style={
						!this.state.listEmpty
							? { display: 'none' }
							: { height: '100%' }
					}
				>
					<FilePond
						allowMultiple={false}
						maxFiles={1}
						className="dd"
						labelIdle='Drag and drop the .zip certificate or <span class="filepond--label-action">browse</span>'
						onupdatefiles={(fileItems) => {
							if (fileItems.length === 0)
								this.setState({ listEmpty: true });
							else this.setState({ listEmpty: false });
							for (const file of fileItems) {
								this.checkFile(file.file);
							}
						}}
					/>
				</div>
			);
		}
	}
}

export default DragDropV2;
