class Matrix4 {
  constructor (elements) {
    this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    if (elements) this.set(elements)
  }
  set (elements) {
    for (let i = 0; i < 16; i++) {
      this.elements[i] = elements[i]
    }
  }
  multiply (other) {
    let mat = new Float32Array(16)
    let p = this.elements
    let q = other.elements
    for (let i = 0; i < 4; i++) {
      mat[0 + i * 4] = p[0] * q[0 + 4 * i] + p[4] * q[1 + 4 * i] + p[8] * q[2 + 4 * i] + p[12] * q[3 + 4 * i]
      mat[1 + i * 4] = p[1] * q[0 + 4 * i] + p[5] * q[1 + 4 * i] + p[9] * q[2 + 4 * i] + p[13] * q[3 + 4 * i]
      mat[2 + i * 4] = p[2] * q[0 + 4 * i] + p[6] * q[1 + 4 * i] + p[10] * q[2 + 4 * i] + p[14] * q[3 + 4 * i]
      mat[3 + i * 4] = p[3] * q[0 + 4 * i] + p[7] * q[1 + 4 * i] + p[11] * q[2 + 4 * i] + p[15] * q[3 + 4 * i]
    }
    for (let i = 0; i < 16; i++) {
      this.elements[i] = mat[i]
    }
  }
  setRotate (x, y, z) {
    let e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs

    angle = Math.PI * angle / 180
    e = this.elements

    s = Math.sin(angle)
    c = Math.cos(angle)

    if (0 !== x && 0 === y && 0 === z) {
      // Rotation around X axis
      if (x < 0) {
        s = -s
      }
      e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0
      e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0
      e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1
    } else if (0 === x && 0 !== y && 0 === z) {
      // Rotation around Y axis
      if (y < 0) {
        s = -s
      }
      e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0
      e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0
      e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1
    } else if (0 === x && 0 === y && 0 !== z) {
      // Rotation around Z axis
      if (z < 0) {
        s = -s
      }
      e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0
      e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0
      e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0
      e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1
    } else {
      // Rotation around another axis
      len = Math.sqrt(x*x + y*y + z*z)
      if (len !== 1) {
        rlen = 1 / len
        x *= rlen
        y *= rlen
        z *= rlen
      }
      nc = 1 - c
      xy = x * y
      yz = y * z
      zx = z * x
      xs = x * s
      ys = y * s
      zs = z * s

      e[ 0] = x*x*nc +  c
      e[ 1] = xy *nc + zs
      e[ 2] = zx *nc - ys
      e[ 3] = 0;

      e[ 4] = xy *nc - zs
      e[ 5] = y*y*nc +  c
      e[ 6] = yz *nc + xs
      e[ 7] = 0

      e[ 8] = zx *nc + ys
      e[ 9] = yz *nc - xs
      e[10] = z*z*nc +  c
      e[11] = 0;

      e[12] = 0
      e[13] = 0
      e[14] = 0
      e[15] = 1
    }

    return this;

  }
  setScale () {

  }
  setTranslate (x, y, z) {
    let e = this.elements
    e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x
    e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1
    return this
  }
  rotate () {

  }
  scale () {

  }
  translate (x, y, z) {
    let e = this.elements
    e[12] += e[0] * x + e[4] * y + e[8]  * z
    e[13] += e[1] * x + e[5] * y + e[9]  * z
    e[14] += e[2] * x + e[6] * y + e[10] * z
    e[15] += e[3] * x + e[7] * y + e[11] * z
    return this;
  }
  setLookAt (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    let e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz

    fx = centerX - eyeX
    fy = centerY - eyeY
    fz = centerZ - eyeZ

    // Normalize f.
    rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz)
    fx *= rlf
    fy *= rlf
    fz *= rlf

    // Calculate cross product of f and up.
    sx = fy * upZ - fz * upY
    sy = fz * upX - fx * upZ
    sz = fx * upY - fy * upX

    // Normalize s.
    rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz)
    sx *= rls
    sy *= rls
    sz *= rls

    // Calculate cross product of s and f.
    ux = sy * fz - sz * fy
    uy = sz * fx - sx * fz
    uz = sx * fy - sy * fx

    // Set to this.
    e = this.elements
    e[0] = sx
    e[1] = ux
    e[2] = -fx
    e[3] = 0;

    e[4] = sy
    e[5] = uy
    e[6] = -fy
    e[7] = 0;

    e[8] = sz
    e[9] = uz
    e[10] = -fz
    e[11] = 0

    e[12] = 0
    e[13] = 0
    e[14] = 0
    e[15] = 1

    // Translate.
    return this.translate(-eyeX, -eyeY, -eyeZ)
  }
  setPerspective (fov, aspect, near, far) {
    let e, rd, s, ct

    if (near === far || aspect === 0) {
      throw 'null frustum'
    }
    if (near <= 0) {
      throw 'near <= 0'
    }
    if (far <= 0) {
      throw 'far <= 0'
    }

    fov = Math.PI * fov / 180 / 2
    s = Math.sin(fov)
    if (s === 0) {
      throw 'null frustum'
    }

    rd = 1 / (far - near)
    ct = Math.cos(fov) / s

    e = this.elements

    e[0]  = ct / aspect
    e[1]  = 0
    e[2]  = 0
    e[3]  = 0

    e[4]  = 0
    e[5]  = ct
    e[6]  = 0
    e[7]  = 0

    e[8]  = 0
    e[9]  = 0
    e[10] = -(far + near) * rd
    e[11] = -1

    e[12] = 0
    e[13] = 0
    e[14] = -2 * near * far * rd
    e[15] = 0

    return this
  }
//   setOrtho (left, right, bottom, top, near, far) {
//     var e, rw, rh, rd
// 
//     if (left === right || bottom === top || near === far) {
//       throw 'null frustum'
//     }
// 
//     rw = 1 / (right - left)
//     rh = 1 / (top - bottom)
//     rd = 1 / (far - near)
// 
//     e = this.elements
// 
//     e[0]  = 2 * rw
//     e[1]  = 0
//     e[2]  = 0
//     e[3]  = 0
// 
//     e[4]  = 0
//     e[5]  = 2 * rh
//     e[6]  = 0
//     e[7]  = 0
// 
//     e[8]  = 0
//     e[9]  = 0
//     e[10] = -2 * rd
//     e[11] = 0
// 
//     e[12] = -(right + left) * rw
//     e[13] = -(top + bottom) * rh
//     e[14] = -(far + near) * rd
//     e[15] = 1
// 
//     return this
//   }

  setOrtho (left, right, bottom, top, near, far) {
    const width = right - left;
    const height = top - bottom;
    const depth = far - near;

    this.set(new Float32Array([
      2 / width,               0.0,                      0.0,                   0.0,
      0.0,                     2 / height,               0.0,                   0.0,
      0.0,                     0.0,                      2 / depth,            0.0,
      -(left + right) / width, -(top + bottom) / height, -(near + far) / depth, 1.0
    ]));
    return this;
  }
}

export default Matrix4