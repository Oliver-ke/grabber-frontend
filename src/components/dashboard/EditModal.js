import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import EditForm from './EditForm';
const EditDisCountModal = ({ showModal, modalClosed }) => {
	const [ modalVisible, setModalVisible ] = useState(showModal);
	useEffect(
		() => {
			setModalVisible(showModal);
		},
		[ showModal ]
	);
	const closeModal = () => {
		setModalVisible(false);
		modalClosed();
	};
	const handleCancel = () => {
		setModalVisible(false);
		modalClosed();
	};
	return (
		<div>
			<Modal
				centered={true}
				title="New Discount Offer"
				visible={modalVisible}
				destroyOnClose={true}
				onCancel={handleCancel}
				footer={null}
			>
				<EditForm closeModal={closeModal} cancel={handleCancel} />
			</Modal>
		</div>
	);
};

export default EditDisCountModal;
