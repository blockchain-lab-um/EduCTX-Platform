import React from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
//import HelpVideo from "../../components/HelpVideo/HelpVideo";
import StillHaveQuestions from '../../components/StillHaveQuestions/StillHaveQuestions';
//import { Col, Tab, Nav } from "react-bootstrap";
import FAQ from '../../components/FAQ/FAQ';
import FAQSection from '../../components/FAQ/FAQSection';

const HelpData: React.FC = () => {
	return (
		<div>
			<div>
				<div className="container-fluid " id="my-certificates">
					<PageTitle title="Data protection" />
					<div className="pl-4"></div>

					<div className="pl-2">
						<StillHaveQuestions></StillHaveQuestions>
					</div>
					<div className="pl-2">
						<FAQ title="Frequently asked questions">
							<FAQSection
								title="How safe is access with digital wallet and Ethereum?"
								id="ac-1"
							>
								Each user stores it’s private key on own device
								in digital wallet and doesn’t share it with
								network. Therefore, all the data sent to the
								network is encrypted with the user's private
								key. When the certificate is issued, it is also
								encrypted, this time using the recipient’s
								public key. Therefore, it can only be decrypted
								using the recipient’s private key, meaning
								unauthorized access is not possible.
							</FAQSection>
							<FAQSection
								title="What can I do if the institution has certified invalid certificate?"
								id="ac-2"
							>
								Your institution can revoke the issued
								certificate using the API and reissue it with
								correct information.
							</FAQSection>
						</FAQ>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HelpData;
