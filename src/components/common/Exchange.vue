<template>
  <div class="container">
    <!-- 顶部标题区域 -->
    <div class="recharge">
      <!-- 蜻蜓充值验证 -->
      <div class="info">
        <span v-show="QtInfo" class="account right">请填写正确手机号</span>
        <span class="account left">蜻蜓充值账号</span>
      </div>
      <div>
        <input v-model="QtValue" class="account-input" :class="{'input-checked': QtInfo}" type="text" placeholder="填写手机号" maxlength="11">
        <button v-show="QtValue" @click="handleQtClick" class="QtclearBtn"></button>
      </div>
      <!-- 铂涛充值验证 -->
      <div class="info">
      <span v-show="BtInfo" class="account right">请填写正确手机号</span>
      <span class="account left">铂涛充值账号</span>
      </div>
      <div>
       <input v-model="BtValue" class="account-input" :class="{'input-checked': BtInfo}" type="text" placeholder="填写手机号"  maxlength="11">
       <button v-show="BtValue" @click="handleBtClick" class="BtclearBtn"></button>
      </div>
      <span class="recharge-text">* 非注册手机号，充值成功后，对应手机账号会自动激活，完成注册</span>
      <!-- 兑换码验证 -->
      <div class="info">
        <span v-show="rechargeInfo" class="account right">请输入正确的兑换码</span>
        <span v-show="rechargeUsed" class="account right">该兑换码已经兑换</span>
        <span v-show="rechargeError" class="account right">该兑换码不存在</span>
        <span class="account left">充值兑换码</span>
      </div>
      <div>
        <input v-model="ReValue" type="text" class="account-input" :class="{'input-checked': rechargeInfo}" @focus="handleFocus" placeholder="填写21-22位由数字、字母组成的兑换码" maxlength="22">
        <button v-show="ReValue" @click="handleRcClick" class="ReclearBtn"></button>
      </div>
      <button class=" recharge-btn" :class="{'recharge-btn-true' : rechargeBtn }" @click="handleRecharge">兑换</button>
      <!-- <button v-show="rechargeCheck" class=" recharge-btn recharge-btn-true">兑换</button> -->
      <!-- <button v-show="!rechargeCheck" class=" recharge-btn recharge-btn-error">兑换</button> -->
      <!-- 会员特权专区 -->
      <div class="wehotel-member">
        <img class="we-hotel" src="/static/images/Group 9.png" alt="">
        <img class="fm" src="/static/images/Group 10.png" alt= "">
      </div>
    </div>
   </div>
</template>
<script>
import resultInfo from '../../../src/api/index'
export default {
  data () {
    return {
      rechargeError: false,
      rechargeUsed: false,
      rechargeCheck: false,
      // 清空按钮
      QtClear: true,
      BtClear: true,
      ReClear: true,
      // 输入框的数据
      QtValue: '',
      BtValue: '',
      ReValue: ''
    }
  },
  computed: {
    QtInfo () {
      return !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.QtValue) && this.QtValue.split('').length !== 0
    },
    BtInfo () {
      return !/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.BtValue) && this.BtValue.split('').length !== 0
    },
    rechargeInfo () {
      return !/^([1-9a-km-zA-HJ-NP-Z]){21,22}$/.test(this.ReValue) && this.ReValue.split('').length !== 0
    },
    rechargeBtn () {
      return /^([1-9a-km-zA-HJ-NP-Z]){21,22}$/.test(this.ReValue) && /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.QtValue) && /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.BtValue)
    }
  },
  methods: {
    // 兑换输入框选中时清除提示信息
    handleFocus () {
      this.rechargeUsed = false
      this.rechargeError = false
    },
    // 点击兑换按钮触发的事件验证
    handleRecharge () {
      // 接口需要传入的数据
      const data = {code: this.ReValue,
        user_qingting_phone_number: this.QtValue,
        user_wehotel_phone_number: this.BtValue}
      resultInfo(data).then((info) => {
        // console.log(info)
        this.rechargeUsed = info.rechargeUsed
        this.rechargeError = info.rechargeError
        this.$router.push({name: info.router})
      })
    },
    // 清空输入框方法
    handleQtClick () {
      this.QtValue = ''
    },
    handleBtClick () {
      this.BtValue = ''
    },
    handleRcClick () {
      this.ReValue = ''
      this.rechargeUsed = false
      this.rechargeError = false
    }
  }
}
</script>
<style scoped>
</style>
