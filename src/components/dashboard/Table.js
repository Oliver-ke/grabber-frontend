import React, { useEffect, useState } from 'react';
import { Table, Divider, Tag } from 'antd';
import CustomCard from '../common/Card';
import EditModal from './EditModal';
import { getDiscount, deleteDiscount, editData } from '../../actions/discount';
import { connect } from 'react-redux';

const DiscountTable = ({ discount, getDiscount, deleteDiscount, editData }) => {
	const [ showModal, setShowModal ] = useState(false);

	const handleEdit = (data) => {
		editData(data);
		setShowModal(true);
	};
	const onModalClose = () => {
		setShowModal(false);
	};
	const columns = [
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (text) => <a>₦{text}</a>
		},
		{
			title: 'Discount',
			dataIndex: 'discount',
			key: 'discount',
			render: (value) => <span>{`${value}%`}</span>
		},
		{
			title: 'Min Range',
			dataIndex: 'minRange',
			key: 'minRange'
		},
		{
			title: 'Max Range',
			dataIndex: 'maxRange',
			key: 'maxRange'
		},
		{
			title: 'Fixed',
			dataIndex: 'fixed',
			key: 'fixed',
			render: (value) => {
				let color = 'blue';
				if (value === true) {
					color = 'red';
				}
				value = value ? 'Yes' : 'No';
				return <span style={{ color: `${color}` }}>{value}</span>;
			}
		},
		{
			title: 'Category',
			key: 'category',
			dataIndex: 'category',
			render: (cat) => {
				let color;
				if (cat === 'schoolAccounting') {
					color = 'volcano';
				}
				if (cat === 'gradeCoverage') {
					color = 'geekblue';
				}
				if (cat === 'enterprise') {
					color = 'green';
				}
				return (
					<span>
						<Tag color={color}>{cat.toUpperCase()}</Tag>
					</span>
				);
			}
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
					<a onClick={() => handleEdit(record)} href="#!">
						Edit
					</a>
					<Divider type="vertical" />
					{/* <Popconfirm title="Sure to delete?" onConfirm={deleteDiscount(record.id)}>
						<a href="#!" style={{ color: 'red' }}>
							Delete
						</a>
					</Popconfirm> */}
					<a onClick={() => deleteDiscount(record.id)} href="#!" style={{ color: 'red' }}>
						Delete
					</a>
				</span>
			)
		}
	];
	useEffect(
		() => {
			getDiscount();
		},
		[ getDiscount ]
	);
	let { discounts, loading } = discount;
	if (discounts) {
		// add key and sort
		discounts = discounts
			.map((deal) => {
				const { id, ...rest } = deal;
				return {
					...rest,
					key: id,
					id
				};
			})
			.sort((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
	}
	return (
		<div>
			<CustomCard>
				<EditModal showModal={showModal} modalClosed={onModalClose} />
				<Table loading={loading} bordered columns={columns} dataSource={discounts} />
			</CustomCard>
		</div>
	);
};

const mapStateToProps = (state) => ({
	discount: state.discount
});

export default connect(mapStateToProps, { getDiscount, deleteDiscount, editData })(DiscountTable);
