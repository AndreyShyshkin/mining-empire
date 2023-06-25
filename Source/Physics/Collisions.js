export class Collisions {
    static AABBtoAABB(col1, col2) {
      let axmin = col1[0].X
      let axmax = col1[1].X
      let aymin = col1[0].Y
      let aymax = col1[1].Y
      let bxmin = col2[0].X
      let bxmax = col2[1].X
      let bymin = col2[0].Y
      let bymax = col2[1].Y
      if (axmin <= bxmax && bxmin <= axmax && aymin <= bymax && bymin <= aymax) {
        return true
      } else {
        return false
      }
    }
  }
  