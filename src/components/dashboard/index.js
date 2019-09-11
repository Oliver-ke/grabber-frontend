import React from 'react';
import DiscountTable from './Table';
import Nav from '../common/Navbar';
import DiscountModal from './AddDiscountModal';
import { Row, Col } from 'antd';
const Dashboard = () => {
	return (
		<Row>
			<Col span={24}>
				<Nav />
			</Col>
			<Col span={24}>
				<div className="dashboard-content">
					<div style={{ width: '100%', marginTop: '3rem' }}>
						<DiscountModal />
					</div>
					<div className="table">
						<DiscountTable />
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Dashboard;
