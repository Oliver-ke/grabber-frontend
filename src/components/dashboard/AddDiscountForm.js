import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDiscount } from '../../actions/discount';
import { Form, Input, Select, Button, Switch, Alert } from 'antd';
const { Option } = Select;

const { Group: InputGroup } = Input;

const AddDiscountForm = ({ addDiscount, closeModal, cancel, discount }) => {
	const { loading } = discount;
	const [ formInputs, setFormInputs ] = useState({
		price: '',
		discount: '',
		maxRange: '',
		minRange: '',
		category: '',
		fixed: false
	});
	const [ error, setError ] = useState('');
	const handleInput = (e) => {
		const { value, name } = e.target;
		setFormInputs({
			...formInputs,
			[name]: value
		});
	};
	const formSubmit = (e) => {
		e.preventDefault();
		const { price, discount, maxRange, minRange, category } = formInputs;
		if (!price || !discount || !maxRange || !minRange || !category) {
			return setError('Please fill all available fields');
		}
		if (minRange >= maxRange) {
			return setError('Min Range cannot be greater than Max Range');
		}
		addDiscount(formInputs);
		if (!loading) {
			closeModal();
		}
	};
	const formItemLayout = {
		labelCol: {
			xs: { span: 8 },
			sm: { span: 8 }
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 }
		}
	};

	return (
		<Form {...formItemLayout} onSubmit={formSubmit}>
			{error ? <Alert message={error} type="error" closable afterClose={() => setError('')} /> : null}
			<Form.Item label="Price">
				<Input
					onChange={handleInput}
					type="number"
					value={formInputs.price}
					name="price"
					style={{ width: '80%' }}
					placeholder="e.g 4569000"
				/>
			</Form.Item>
			<Form.Item label="Discount Percent">
				<Input
					type="number"
					onChange={handleInput}
					name="discount"
					style={{ width: '80%' }}
					placeholder="e.g 10"
				/>
			</Form.Item>
			<Form.Item label="Range">
				<InputGroup>
					<Input
						type="number"
						onChange={handleInput}
						name="minRange"
						style={{ width: '40%' }}
						placeholder="Min"
					/>
					<Input
						type="number"
						onChange={handleInput}
						name="maxRange"
						style={{ width: '40%' }}
						placeholder="Max"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Category">
				<Select
					onSelect={(e) => setFormInputs({ ...formInputs, category: e })}
					style={{ width: '80%' }}
					placeholder="Select category"
				>
					<Option value="schoolAccounting">School Accounting</Option>
					<Option value="gradeCoverage">Grade Coverage</Option>
					<Option value="enterprise">Enterprise</Option>
				</Select>
			</Form.Item>
			<Form.Item label="Fixed">
				<Switch onChange={(e) => setFormInputs({ ...formInputs, fixed: e })} />
			</Form.Item>
			<hr />
			<div style={{ textAlign: 'right' }}>
				<Button type="primary" loading={loading} htmlType="submit">
					Add
				</Button>
				<Button onClick={cancel} style={{ marginLeft: 8 }}>
					Cancel
				</Button>
			</div>
		</Form>
	);
};

const mapStateToProps = (state) => ({
	discount: state.discount
});

export default connect(mapStateToProps, { addDiscount })(AddDiscountForm);
