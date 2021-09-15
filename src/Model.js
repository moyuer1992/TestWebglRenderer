import WebglUtils from './WebglUtils'

class Model {
  constructor (vshader_source, fshader_source, options) {
    this.vshader_source = vshader_source
    this.fshader_source = fshader_source
    this.attributes_data = options.attributes_data ? options.attributes_data : null
    this.uniforms_data = options.uniforms_data ? options.uniforms_data : null
    this.options = options
  }
  init () {
    let gl = this.gl
    let attributes_data = this.attributes_data, uniforms_data = this.uniforms_data
    let {
      vshader,
      fshader,
      program
    } = WebglUtils.initShaders(gl, this.vshader_source, this.fshader_source)

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, attributes_data, gl.STATIC_DRAW)

    let attributes = [], uniforms = []
    let FSIZE = attributes_data.BYTES_PER_ELEMENT
    for (let attribute of this.options.attributes) {
      let attribute_name = attribute.name
      let a = gl.getAttribLocation(program, attribute_name)
      attributes.push(a)
      gl.vertexAttribPointer(a, 3, gl.FLOAT, false, FSIZE * options.attribute_stride, FSIZE * attribute.offset)
      gl.enableVertexAttribArray(a)
    }
    this.vshader = vshader
    this.fshader = fshader
    this.program = program
    this.attributes = attributes
    this.uniforms = uniforms
  }
  setGl (gl) {
    this.gl = gl
  }
  use () {
    this.gl.useProgram(this.program)
  }
}

export default Model