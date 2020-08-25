'use strict'
const Coupon = use('App/Models/Coupon')
const Order = use('App/Models/Order')

const DiscountHook = exports = module.exports = {}

DiscountHook.method = async model => {
  var couponProducts, discountItems = []
  model.discount = 0
  const coupon = await Coupon.find(model.coupon_id)
  const order = await Order.find(model.order_id)
}
