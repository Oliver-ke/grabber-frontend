import React, { useState } from 'react';
import DiscountTable from './Table';
import Nav from '../common/Navbar';
import DiscountModal from './AddDiscountModal';
import LockOfferTable from './LockedOfferTable';
import { Row, Col, Button } from 'antd';
const Dashboard = () => {
	const [ showLockOffer, setShowLockOffer ] = useState(false);
	const toggleShowLockOffer = () => {
		setShowLockOffer(!showLockOffer);
	};
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
					<Button onClick={toggleShowLockOffer}>
						{!showLockOffer ? 'Show Locked Offers' : 'Hide Locked Offer'}
					</Button>
					{showLockOffer && (
						<div className="table">
							<LockOfferTable />
						</div>
					)}
					<div className="table">
						<DiscountTable />
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Dashboard;
