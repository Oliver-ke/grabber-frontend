import React from 'react';
import { Card } from 'antd';
import CustomCard from '../common/Card';

const CatContainer = () => {
	return (
		<div className="r-side-card">
			<CustomCard title="Select a Package Plan">
				<div className="categories">
					<Card hoverable={true} className="card">
						<h3 className="category-text">Nortify Enterprise</h3>
					</Card>
				</div>
			</CustomCard>
		</div>
	);
};

export default CatContainer;
