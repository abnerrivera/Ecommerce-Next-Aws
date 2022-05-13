import React from 'react'
import { Container } from 'semantic-ui-react'

const BasicLayout = ({ children }) => {
	return (
		<Container fuild className="basic-layout">
			<div>BasicLayout</div>
			{children}
		</Container>
	)
}

export default BasicLayout