import React from 'react'
import { Container } from 'semantic-ui-react'
import Header from '../../components/Header/Header'

const BasicLayout = ({ children }) => {
	return (
		<Container fluid className="basic-layout">

			{/* HEADER */}
			<Header/>

			<Container className="content">
				{children}
			</Container>
			
		</Container>
	)
}

export default BasicLayout