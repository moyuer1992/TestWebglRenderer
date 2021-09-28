import WebglUtils from './WebglUtils'

class Model {
  constructor (vshader_source, fshader_source, options) {
    this.vshader_source = vshader_source
    this.fshader_source = fshader_source
    this.options = options
  }
  init () {
    let gl = this.gl
    let {
      vshader,
      fshader,
      program
    } = WebglUtils.initShaders(gl, this.vshader_source, this.fshader_source)
    this.vshader = vshader
    this.fshader = fshader
    this.program = program
  }
  setGl (gl) {
    this.gl = gl
  }
  use () {
    this.gl.useProgram(this.program)
  }
}

export default Model