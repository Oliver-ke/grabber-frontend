import React from 'react';
import { Row, Col } from 'antd';
import NavBar from '../common/Navbar';
import Hero from '../common/Hero';
import CatContainer from '../discount/CatContainer';
const Landing = () => {
	return (
		<Row align="middle" justify="center">
			<Col span={24} className="landing-maincontainer">
				<div className="overlay">
					<NavBar />
					<Row>
						<Hero />
						<Col xs={24} md={12}>
							<CatContainer />
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
	);
};

export default Landing;
