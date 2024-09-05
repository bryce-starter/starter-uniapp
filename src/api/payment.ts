export interface IPrepayPayload {
  description: string
  out_trade_no: string
  total_fee: number
}

export const paymentApi = {
  prepay(payload: IPrepayPayload) {
    return http({
      method: 'POST',
      url: '/api/v1/payment/wx-pay',
      data: payload,
    })
  },
}
