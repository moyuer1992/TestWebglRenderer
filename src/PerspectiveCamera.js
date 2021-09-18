import Matrix4 from './Matrix4'

class PerspectiveCamera {
  constructor (fov, aspect, near, far) {
    this.fov = fov
    this.aspect = aspect
    this.near = near
    this.far = far
    this.position = [0, 0, 0]
    this.at = [0, 0, 0]
    this.up = [0, 1, 0]
    this.viewMatrix = new Matrix4().setLookAt(
      this.position[0], this.position[1], this.position[2],
      this.at[0], this.at[1], this.at[2],
      this.up[0], this.up[1], this.up[2],
    )
    this.projectionMatrix = new Matrix4().setPerspective(fov, aspect, near, far)
  }
  lookAt (atX, atY, atZ) {
    this.at = [atX, atY, atZ]
    this.viewMatrix = new Matrix4().setLookAt(
      this.position[0],
      this.position[1],
      this.position[2],
      atX,
      atY,
      atZ,
      this.up[0],
      this.up[1],
      this.up[2],
    )
    return this.viewMatrix
  }
}

export default PerspectiveCamera