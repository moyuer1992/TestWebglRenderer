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

    let attributes_data = this.options.attributes_data || null
    let uniforms_data = this.options.uniforms_data || null
    let attributes = this.options.attributes || null
    let uniforms = this.options.uniforms || null

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, attributes_data, gl.STATIC_DRAW)

    let FSIZE = attributes_data.BYTES_PER_ELEMENT
    for (let attribute of attributes) {
      let attribute_name = attribute.name
      let a = gl.getAttribLocation(program, attribute_name)
      gl.vertexAttribPointer(a, 3, gl.FLOAT, false, FSIZE * options.attribute_stride, FSIZE * attribute.offset)
      gl.enableVertexAttribArray(a)
    }
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