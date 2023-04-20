/*
  Install:
    - npm add graphql-request graphql
*/

import { GraphQLClient, gql } from 'graphql-request';

/* 
  Query:
  
  Parameters:
    - {dataCipher: "..."}
  
  Response:
    - {
      issuedCertificates: [
        {
          id: "..."
        }
      ]
    }
*/
const query = gql`
	query getIssuedCertificate($dataHash: String!) {
		issuedCertificates(where: { dataHash: $dataHash }) {
			id
		}
	}
`;

/*
  Creating the GraphQLClient that calls the queries
*/
const client = new GraphQLClient(
	'https://bclabum.informatika.uni-mb.si/graph/subgraphs/name/bclab/EduCTX-graph'
);

/*
  Variable shape -> {dataChiper: "..."}
*/

async function graphqlQuery(hashValue: string): Promise<any> {
	const variables = {
		dataHash: hashValue,
	};
	return client.request(query, variables);
}

export { graphqlQuery };
