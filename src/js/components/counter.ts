class Counter extends HTMLElement {
  min = 0
  max = 0
  value = 0
  inputEl: HTMLInputElement
  minusButton: HTMLButtonElement
  plusButton: HTMLButtonElement

  timeout?: NodeJS.Timeout
  timeoutIteration = 0
  defaultInterval = 420

  wrapperClassName = 'relative flex p-2.5 gap-6'
  inputClassName = 'absolute inset-0 w-full h-full text-center rounded input'
  minusClassName = 'btn z-[2] rounded btn-xs btn-black btn-light btn-icon'
  plusClassName = 'btn z-[2] rounded btn-xs btn-black btn-light btn-icon ml-auto'

  constructor() {
    super()

    this.inputEl = document.createElement('input')
    this.inputEl.className = this.inputClassName
    this.inputEl.addEventListener('input', this.changeHandler.bind(this))

    this.minusButton = document.createElement('button')
    this.minusButton.type = 'button'
    this.minusButton.className = this.minusClassName
    this.minusButton.innerHTML = '-'
    this.minusButton.addEventListener('click', this.decrement.bind(this))
    this.minusButton.addEventListener('pointerdown', this.touchStartHandler.bind(this, this.decrement.bind(this)))
    this.minusButton.addEventListener('pointercancel', this.touchEndHandler.bind(this))

    this.plusButton = document.createElement('button')
    this.plusButton.type = 'button'
    this.plusButton.className = this.plusClassName
    this.plusButton.innerHTML = '+'
    this.plusButton.addEventListener('click', this.increment.bind(this))
    this.plusButton.addEventListener('pointerdown', this.touchStartHandler.bind(this, this.increment.bind(this)))
    this.plusButton.addEventListener('pointercancel', this.touchEndHandler.bind(this))

    document.body.addEventListener('pointerleave', this.touchEndHandler.bind(this))
    document.body.addEventListener('pointerup', this.touchEndHandler.bind(this))
  }

  setValue(value: number | string) {
    this.value = Math.max(
      this.min,
      Math.min(this.max, isNaN(parseInt(value as string)) ? 0 : parseInt(value as string))
    )
    this.inputEl.value = this.value.toString()
  }

  decrement() {
    this.setValue(this.value - 1)
  }

  increment() {
    this.setValue(this.value + 1)
  }

  changeHandler(event: Event) {
    this.setValue((event.target as HTMLInputElement)?.value || '0')
  }

  connectedCallback() {
    this.classList.add(...this.wrapperClassName.split(' '))

    const min = parseInt(this.getAttribute('min') || '')
    const max = parseInt(this.getAttribute('max') || '')
    const value = parseInt(this.getAttribute('value') || '')
    const name = this.getAttribute('name') || ''

    this.min = isNaN(min) ? -Infinity : min
    this.max = isNaN(max) ? Infinity : max
    this.setValue(value)

    this.inputEl.setAttribute('name', name)
    this.appendChild(this.inputEl)
    this.appendChild(this.minusButton)
    this.appendChild(this.plusButton)
  }

  timeOut(callback: () => void) {
    this.timeout = setTimeout(() => {
      callback()
      this.timeoutIteration++
      this.timeOut(callback)
    }, Math.max(20, this.defaultInterval - this.timeoutIteration * 20))
  }

  touchStartHandler(callback: () => void) {
    this.timeoutIteration = 0
    this.timeOut(callback)
  }

  touchEndHandler() {
    this.timeoutIteration = 0
    clearTimeout(this.timeout)
  }

  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
    case 'value':
      {
        this.setValue(newValue)
      }

      break
    }
  }
}

function register() {
  customElements.define('c-counter', Counter)
}

export default { register }
