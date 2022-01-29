// van弹窗组件封装
// import { Notify } from 'vant'
import { Toast } from 'vant'
export const DNotify = ({ type, message }) => {
  // Notify({
  //   type,
  //   message
  // })
  if (type === 'success') {
    Toast({
      type,
      message
    })
  } else {
    Toast({
      type: 'fail',
      message
    })
  }
}
