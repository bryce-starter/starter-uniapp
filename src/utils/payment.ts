import { to, uuid } from '@bryce-loskie/utils'
import type { IPrepayPayload } from '~/api/payment'
import { paymentApi } from '~/api/payment'

interface IMakePaymentPayload {
  description: string
  total_fee: number
}

export const makePayment = async (payload: IMakePaymentPayload): Promise<{ errMsg: string }> => {
  const prePayPayload: IPrepayPayload = {
    ...payload,
    out_trade_no: uuid(),
  }

  const [prepayErr, prepayRes] = await to(paymentApi.prepay(prePayPayload))
  if (prepayErr) {
    throw new Error(prepayErr.message || '预支付失败')
  }

  const paymentRes = prepayRes?.data?.data
  if (!paymentRes) {
    // @ts-expect-error ignore
    throw new Error(prepayErr?.message || '预支付失败')
  }

  const [err, res] = await to(uni.requestPayment({
    provider: 'wxpay',
    orderInfo: {},
    ...paymentRes,
  }) as any)

  if (err)
    throw new Error(err.message || '支付失败')

  return res as { errMsg: string }
}
