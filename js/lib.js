class Line {
  p1;
  p2;
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  translate(d) {
    const p1 = this.p1;
    const p2 = this.p2;
    const slope = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    const p12 = new Point(d * Math.cos(slope), d * Math.sin(slope)).move(p1);

    p2.x = p12.x;
    p2.y = p12.y;

    return this;
  }
}

class Point {
  x = 0;
  y = 0;

  clone() {
    return new Point(this.x, this.y);
  }
  move(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class HelperUtil {
  static createImage(img) {
    const i = new Image();
    i.src = img;
    return i;
  }

  static rotatePoint(pointToRotate, centerPoint, angleInDegrees) {
    const angleInRadians = angleInDegrees * (Math.PI / 180);

    const cosTheta = Math.cos(angleInRadians);
    const sinTheta = Math.sin(angleInRadians);

    const X =
      cosTheta * (pointToRotate.x - centerPoint.x) -
      sinTheta * (pointToRotate.y - centerPoint.y) +
      centerPoint.x;
    const Y =
      sinTheta * (pointToRotate.x - centerPoint.x) +
      cosTheta * (pointToRotate.y - centerPoint.y) +
      centerPoint.y;

    pointToRotate.x = X || 0;
    pointToRotate.y = Y || 0;
  }

  static angleBetween(c, p1, p2) {
    const firstAngle = Math.atan2(p1.x - c.x, p1.y - c.y);
    const secondAngle = Math.atan2(p2.x - c.x, p2.y - c.y);
    let angle = secondAngle - firstAngle;
    angle = (angle * 180.0) / Math.PI;
    if (angle < 0) {
      return 360.0 + angle;
    } else {
      return angle;
    }
  }

  static drawLine(ctx, p1, p2, c) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = c || '#333';
    ctx.stroke();
  }

  static drawLit(ctx, s, m) {
    const p1 = new Point(s.x, s.y);
    HelperUtil.rotatePoint(p1, m, -90);
    const l1 = new Line(m.clone(), p1.clone()).translate(15);
    HelperUtil.drawLine(ctx, l1.p1, l1.p2, 'orange');

    HelperUtil.rotatePoint(p1, m, 180);
    const l2 = new Line(m.clone(), p1.clone()).translate(15);
    HelperUtil.drawLine(ctx, l2.p1, l2.p2, 'orange');
  }
}
