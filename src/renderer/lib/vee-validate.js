import VeeValidate, { Validator } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko.js'

Validator.extend('phone', {
  validate: value => /^01[0-9][[-]?\d{3,4}[-]?\d{4}$/.test(value)
})

Validator.extend('alpha_spaces_dash', {
  validate (value) {
    let valid = true
    if (/^[^A-Za-z]/.test(value)) {
      valid = false
    } else if (/[^A-Za-z]$/.test(value)) {
      valid = false
    } else if (value.match(/- |[\s]{2,}|[-]{2,}| -/)) {
      valid = false
    } else if (!/^[A-Za-z]+[A-Za-z\s-]*$/.test(value)) {
      valid = false
    }
    return {
      data: value,
      valid
    }
  }
})

Validator.extend('customer_name', {
  validate: value => /^[ㄱ-ㅣ가-힣A-Za-z0-9]+$/.test(value)
})

ko.messages.phone = () => '올바른 휴대전화번호 형식이 아닙니다.'
ko.messages.custom_email = () => `올바른 이메일 형식이 아닙니다.`
ko.messages.customer_name = (field) => `${field}은 숫자,한글,영문만 입력 가능합니다`
ko.messages.alpha_spaces_dash = (field, params, data) => {
  if (/^[^A-Za-z]/.test(data)) {
    return `${field}항목은 영문자로 시작해야 합니다`
  } else if (/[^A-Za-z]$/.test(data)) {
    return `${field}항목은 영문자로 끝나야 합니다`
  } else if (data.match(/- |[\s]{2,}|[-]{2,}| -/)) {
    return `'-' 공백 문자열은 연속해서 올 수 없습니다`
  }
  return `${field}항목에는 영문자,공백,'-' 만사용 가능합니다`
}

export default VeeValidate
export { ko }
