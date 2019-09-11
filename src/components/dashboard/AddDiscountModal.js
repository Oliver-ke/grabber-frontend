import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import AddDiscountForm from './AddDiscountForm';
const AddDiscountModal = () => {
	const [ modalVisible, setModalVisible ] = useState(false);

	const showModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};
	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<div>
			<Button onClick={showModal} type="primary" shape="round" icon="plus" size="large">
				Add Discount Offer
			</Button>
			<Modal
				centered={true}
				title="New Discount Offer"
				visible={modalVisible}
				destroyOnClose={true}
				onCancel={handleCancel}
				footer={null}
			>
				<AddDiscountForm closeModal={closeModal} cancel={handleCancel} />
			</Modal>
		</div>
	);
};

export default AddDiscountModal;
