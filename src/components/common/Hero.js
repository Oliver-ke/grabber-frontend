import React from 'react';
import { Col } from 'antd';

const Hero = () => {
	return (
		<Col xs={24} md={12}>
			<div className="caption">
				<div>
					<h1 className="hero-text">
						Grab your <br /> Discount Now!
					</h1>
					<p className="lead">and automate your school growth</p>
				</div>
			</div>
		</Col>
	);
};

export default Hero;
