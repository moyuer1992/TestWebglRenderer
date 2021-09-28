import WebglUtils from './WebglUtils'

class Engine {
  constructor (canvas) {
    this.models = []
    this.gl = null
    this.canvas = canvas
    this.camera = null
  }
  init () {
    this.gl = WebglUtils.getWebGLContext(this.canvas)
  }
  addModel (model) {
    model.setGl(this.gl)
    this.models.push(model)
  }
  setCamera (camera) {
    this.camera = camera
  }
  render () {
    let gl = this.gl
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    for (let model of this.models) {
      model.init()
      model.use()

      let attributes_data = model.options.attributes_data
      let buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, attributes_data, gl.STATIC_DRAW)
      let FSIZE = attributes_data.BYTES_PER_ELEMENT
      for (let attribute of model.options.attributes) {
        let attribute_name = attribute.name
        let a = gl.getAttribLocation(model.program, attribute_name)
        gl.vertexAttribPointer(
          a,
          3,
          gl.FLOAT,
          false,
          FSIZE * model.options.attribute_stride,
          FSIZE * attribute.offset
        )
        gl.enableVertexAttribArray(a)
      }

      for (let uniform of model.options.uniforms) {
        let uniform_name = uniform.name
        let uniform_data = null
        if (uniform_name === 'u_ViewMatrix' && uniform.data_idx === -1) {
          uniform_data = this.camera.viewMatrix.elements
        } else if (uniform_name === 'u_ProjectionMatrix' && uniform.data_idx === -1) {
          uniform_data = this.camera.projectionMatrix.elements
        } else {
          uniform_data = model.options.uniforms_data[uniform.data_idx]
        }
        let u = gl.getUniformLocation(model.program, uniform_name)
        gl.uniformMatrix4fv(u, false, uniform_data)
      }
      let { mode, first, count } = model.options
      let _mode = null
      switch (mode) {
        case 'triangles':
          _mode = gl.TRIANGLES
      }
      gl.drawArrays(_mode, first, count)
    }
  }
}

export default Engine