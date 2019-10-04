import React, { useState, useEffect, Fragment } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { setTotalLockPrice } from '../../actions/userDiscount';
import PriceItem from '../common/PriceItem';

const Discount = ({ discount, setTotalLockPrice }) => {
	const [ packageDiscount, setPackageDiscount ] = useState({});
	const [ impDiscount, setImpDiscount ] = useState({});
	const [ totalLockValue, setTotalLockValue ] = useState({});
	const { loading, discountDetail } = discount;
	const { discount: userDiscount, price, implementationCost, implementationDiscount } = discountDetail;

	const calculateDiscount = (actualAmount, discountPercent) => {
		const discountPrice = parseInt(discountPercent / 100 * actualAmount);
		return {
			actualAmount,
			discountPercent,
			discountPrice,
			paymentPrice: actualAmount - discountPrice
		};
	};

	const totalLockPrice = (totalImp, totalPackage) => {
		const totalPrice = Math.floor(parseInt(totalImp) + parseInt(totalPackage));
		const lockOfferPrice = Math.floor(30 / 100 * totalPrice);
		return {
			totalPrice,
			lockOfferPrice
		};
	};

	useEffect(
		() => {
			const packageResult = calculateDiscount(price, userDiscount);
			const impResult = calculateDiscount(implementationCost, implementationDiscount);
			setPackageDiscount(packageResult);
			setImpDiscount(impResult);
			const lockTotalResult = totalLockPrice(impResult.paymentPrice, packageResult.paymentPrice);

			// this is setting value for the local component state
			setTotalLockValue(lockTotalResult);
			// this is setting value for the general state
			setTotalLockPrice(lockTotalResult);
			return () => {
				setPackageDiscount({});
			};
		},
		// eslint-disable-next-line
		[ discount.discountDetail ]
	);

	return (
		<Fragment>
			{loading ? (
				<Spin className="spinner" />
			) : (
				<Fragment>
					<PriceItem tag="Actual Package Price:" amount={`₦${packageDiscount.actualAmount}`} />
					<PriceItem tag="Discount Percent:" amount={`${packageDiscount.discountPercent}%`} />
					<PriceItem tag="Discount Price:" amount={`₦${packageDiscount.discountPrice}`} />
					<PriceItem tag="Required Payment:" amount={`₦${packageDiscount.paymentPrice}`} />
					<hr />
					<PriceItem tag="One Time Setup Fee:" amount={`₦${impDiscount.actualAmount}`} />
					<PriceItem tag="Setup Discount:" amount={`${impDiscount.discountPercent}%`} />
					<PriceItem tag="Setup Discount Price:" amount={`₦${impDiscount.discountPrice}`} />
					<PriceItem tag="Setup Payment:" amount={`₦${impDiscount.paymentPrice}`} />
					<hr />
					<h4>Total Payment = Package Amount + Setup Amount</h4>
					<PriceItem tag="Total Payment:" amount={`₦${totalLockValue.totalPrice}`} />
					<PriceItem tag="Lock Offer with:" amount={`₦${totalLockValue.lockOfferPrice}`} />
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	discount: state.userDiscount
});
export default connect(mapStateToProps, { setTotalLockPrice })(Discount);
