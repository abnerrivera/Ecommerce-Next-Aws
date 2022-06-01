import React from 'react';
import classNames from 'classnames';
import { Container } from 'semantic-ui-react';
import Header from '../../components/Header/Header';

const BasicLayout = ({ children, className }) => {

	return (
		<Container fluid
			className={
				classNames(
					"basic-layout", {
					[className]: className, //si la prop de calassName tiene valor lo toma y lo agrega a la clase
				}
				)}>

			{/* HEADER */}
			<Header />

			<Container className="content">
				{children}
			</Container>

		</Container>
	)
}

export default BasicLayout