import axios from 'axios'

// 获取验证结果
const resultInfo = async function (data) {
  // 输入不完整
  if (!data.code || !data.user_qingting_phone_number || !data.user_wehotel_phone_number) {
    return {
      rechargeUsed: false,
      rechargeError: false,
      router: null
    }
  }
  const response = await axios.post('https://1411940963167423.cn-hongkong.fc.aliyuncs.com/2016-08-15/proxy/youzan-qingting-wehotel/qingting-wehotel-handler/', JSON.stringify(data))
  // 兑换码已经兑换
  if (response.data.code === 1) {
    return {
      rechargeUsed: true,
      rechargeError: false,
      router: null
    }
  }
  // 兑换码不存在
  if (response.data.code === 2) {
    return {
      rechargeUsed: false,
      rechargeError: true,
      router: null
    }
  }
  // 兑换码正确
  if (response.data.code === 0) {
    localStorage.clear()
    localStorage.setItem('qtvalue', data.user_qingting_phone_number)
    localStorage.setItem('btvalue', data.user_wehotel_phone_number)
    return {
      rechargeUsed: false,
      rechargeError: false,
      router: 'Success'
    }
  }
}
export default resultInfo
