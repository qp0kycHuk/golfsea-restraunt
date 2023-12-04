import AirDatepicker from 'air-datepicker'
import { hasTouch } from 'detect-touch'

AirDatepicker.defaults.isMobile = hasTouch
// @ts-ignore
window.AirDatepicker = AirDatepicker

function init() {
  //
}

export default { init }
