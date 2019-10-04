import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDiscount } from '../../actions/discount';
import { Form, Input, Select, Button, Switch, Alert } from 'antd';
const { Option } = Select;

const { Group: InputGroup } = Input;

const EditForm = ({ updateDiscount, closeModal, cancel, discount }) => {
	const { loading, editData } = discount;
	const {
		price,
		discount: editDiscount,
		maxRange,
		minRange,
		category,
		fixed,
		id,
		implementationCost,
		implementationDiscount
	} = editData;
	const [ formInputs, setFormInputs ] = useState({
		price,
		discount: editDiscount,
		implementationDiscount,
		implementationCost,
		maxRange,
		minRange,
		category,
		fixed,
		id
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
		updateDiscount(formInputs);
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
			<Form.Item label="Price Offer">
				<InputGroup>
					<Input
						onChange={handleInput}
						type="number"
						value={formInputs.price}
						name="price"
						style={{ width: '40%' }}
						placeholder="e.g 4569000"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.discount}
						name="discount"
						style={{ width: '40%' }}
						placeholder="% discount"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Implementation">
				<InputGroup>
					<Input
						onChange={handleInput}
						type="number"
						value={formInputs.implementationCost}
						name="implementationCost"
						style={{ width: '40%' }}
						placeholder="amount"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.implementationDiscount}
						name="implementationDiscount"
						style={{ width: '40%' }}
						placeholder="% discount"
					/>
				</InputGroup>
			</Form.Item>
			<Form.Item label="Range">
				<InputGroup>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.minRange}
						name="minRange"
						style={{ width: '40%' }}
						placeholder="Min"
					/>
					<Input
						type="number"
						onChange={handleInput}
						value={formInputs.maxRange}
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
					value={formInputs.category}
					placeholder="Select category"
				>
					<Option value="schoolAccounting">School Accounting</Option>
					<Option value="gradeCoverage">Grade Coverage</Option>
					<Option value="enterprise">Enterprise</Option>
				</Select>
			</Form.Item>
			<Form.Item label="Fixed">
				<Switch checked={formInputs.fixed} onChange={(e) => setFormInputs({ ...formInputs, fixed: e })} />
			</Form.Item>
			<hr />
			<div style={{ textAlign: 'right' }}>
				<Button type="primary" loading={loading} htmlType="submit">
					Update
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

export default connect(mapStateToProps, { updateDiscount })(EditForm);
