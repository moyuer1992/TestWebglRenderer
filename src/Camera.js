import Matrix4 from './Matrix4'

class Camera {
  constructor () {
    this.pos = [0, 0, 0]
    this.at = [0, 0, 0]
    this.up = [0, 1, 0]
    this.viewMatrix = new Matrix4().setLookAt(
      this.pos[0], this.pos[1], this.pos[2],
      this.at[0], this.at[1], this.at[2],
      this.up[0], this.up[1], this.up[2],
    )
    this.projectionMatrix = new Matrix4()
  }
  lookAt (eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ) {
    this.pos = [eyeX, eyeY, eyeZ]
    this.at = [atX, atY, atZ]
    this.up = [upX, upY, upZ]
    this.viewMatrix = new Matrix4().setLookAt(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ)
    return this.viewMatrix
  }
}

export default Camera