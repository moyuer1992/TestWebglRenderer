const WebglUtils = {
  getWebGLContext: (canvas) => {
    let gl = null
    try {
      gl = canvas.getContext('webgl')
    } catch (e) {
      console.error(e)
    }
    return gl
  },
  initShaders: (gl, vshader_source, fshader_source) => {
    let vshader = gl.createShader(gl.VERTEX_SHADER)
    let fshader = gl.createShader(gl.FRAGMENT_SHADER)
    if (vshader == null || fshader === null) {
      console.error('unable to create shader')
      return null
    }
    gl.shaderSource(vshader, vshader_source)
    gl.shaderSource(fshader, fshader_source)
    gl.compileShader(vshader)
    gl.compileShader(fshader)
    let vcompiled = gl.getShaderParameter(vshader, gl.COMPILE_STATUS)
    let fcompiled = gl.getShaderParameter(fshader, gl.COMPILE_STATUS)
    if (!vcompiled) {
      let error = gl.getShaderInfoLog(vshader)
      console.error('Failed to compile shader: ' + error)
      gl.deleteShader(vshader)
      return null
    }
    if (!fcompiled) {
      let error = gl.getShaderInfoLog(fshader)
      console.error('Failed to compile shader: ' + error)
      gl.deleteShader(vshader)
      return null
    }
    let program = gl.createProgram()
    if (!program) {
      return null
    }

    gl.attachShader(program, vshader)
    gl.attachShader(program, fshader)
    gl.linkProgram(program)

    let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!linked) {
    let error = gl.getProgramInfoLog(program)
      console.error('Failed to link program: ' + error)
      gl.deleteProgram(program)
      gl.deleteShader(vshader)
      gl.deleteShader(fshader)
      return null
    }
    return {
      program,
      vshader,
      fshader,
    }
  }
}

export default WebglUtils