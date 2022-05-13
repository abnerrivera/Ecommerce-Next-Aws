import React from 'react'
import { Container } from 'semantic-ui-react'

const BasicLayout = ({ children }) => {
	return (
		<Container fuild className="basic-layout">

			<Container className="content">
				{children}
			</Container>
			
		</Container>
	)
}

export default BasicLayout