class CelestialObject {
  radius;
  center;
  rotatesArround;
  lookAt;
  angularVelocity = 12;

  onChange;

  constructor(radius, center, rotatesArround, imgSrc, lookAt) {
    this.center = center;
    this.radius = radius;
    this.rotatesArround = rotatesArround;
    this.lookAt = lookAt;

    this.imageObj = new Image();
    this.imageObj.src = imgSrc;
  }

  drawPath(ctx) {
    const d = Math.sqrt(
      Math.pow(this.rotatesArround.y - this.center.y, 2) +
        Math.pow(this.rotatesArround.x - this.center.x, 2)
    );
    if (d > 0) {
      ctx.beginPath();

      ctx.arc(this.rotatesArround.x, this.rotatesArround.y, d, 0, 2 * Math.PI);

      ctx.lineWidth = 1;
      ctx.strokeStyle = '#aaa';

      ctx.stroke();
    }
  }

  drawImg(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.drawImage(
      this.imageObj,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.translate(-this.center.x, -this.center.y);
    ctx.restore();
  }

  draw(ctx) {
    this.drawPath(ctx);
    this.drawImg(ctx);
  }

  rotate() {}

  revolve() {
    const lc = this.center.clone();
    HelperUtil.rotatePoint(
      this.center,
      this.rotatesArround,
      -this.angularVelocity
    );
    if (this.onChange) this.onChange(lc, this.center);
  }
}

class EarthCelestialObject extends CelestialObject {
  eAngle = 0;
  rotationalVelocity = 1.0;
  drawImg(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    this.eAngle -= this.rotationalVelocity;
    this.eAngle = this.eAngle % 360;

    ctx.rotate((this.eAngle * Math.PI) / 180.0);
    ctx.drawImage(
      this.imageObj,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.translate(-this.center.x, -this.center.y);
    ctx.restore();
  }
}

class MoonCelestialObject extends CelestialObject {
  moonShadow = HelperUtil.createImage('images/moon-shadow.png');
  drawShadow(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    if (this.lookAt) {
      const angle = HelperUtil.angleBetween(
        this.center,
        this.lookAt,
        new Point(this.center.x + 100, this.center.y)
      );
      ctx.rotate((angle * Math.PI) / 180.0);
    }
    ctx.globalAlpha = 0.4;
    ctx.drawImage(
      this.moonShadow,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.translate(-this.center.x, -this.center.y);
    ctx.restore();
  }

  drawImg(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    const angle = HelperUtil.angleBetween(
      this.rotatesArround,
      this.center,
      new Point(this.rotatesArround.x + 100, this.rotatesArround.y)
    );
    ctx.rotate((angle * Math.PI) / 180.0);
    ctx.drawImage(
      this.imageObj,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.translate(-this.center.x, -this.center.y);
    ctx.restore();
    this.drawShadow(ctx);
  }
}

class GeoCentricPanchangaTithiApp {
  sunRadius = 60;
  moonRadius = 30;
  earthRadius = 40;

  tithis = new Tithis().tithis;
  selectedTithi = ko.observable();

  speed = ko.observable(0.1);
  animate = ko.observable(false);

  sun = new CelestialObject(
    this.sunRadius,
    new Point(500, 400),
    new Point(500, 400),
    'images/sun.png'
  );

  earth = new EarthCelestialObject(
    this.earthRadius,
    new Point(850, 400),
    this.sun.center,
    'images/earth.png'
  );

  moon = new MoonCelestialObject(
    this.moonRadius,
    new Point(700, 400),
    this.earth.center,
    'images/moon2.png',
    this.sun.center
  );

  celestialObjects = [this.earth, this.moon, this.sun];

  constructor() {
    this.selectedTithi(this.tithis[0]);
    this.updateSpeed();
    setTimeout(() => this.renderAnimation(true), 1000);

    this.earth.onChange = (oCenter, nCenter) => {
      this.moon.center.move(
        new Point(nCenter.x - oCenter.x, nCenter.y - oCenter.y)
      );
    };
  }

  updateSpeed() {
    this.earth.angularVelocity = this.speed() * 1.0;
    this.moon.angularVelocity = this.earth.angularVelocity * 13.186;
    this.earth.rotationalVelocity = this.earth.angularVelocity * 365.25;
  }

  doToggleAnimate() {
    this.animate(!this.animate());
  }

  doSpeedUp() {
    this.speed(Math.min(this.speed() * 1.2, 20));
    this.updateSpeed();
  }

  doSpeedDown() {
    this.speed(Math.max(this.speed() / 1.2, 0.1));
    this.updateSpeed();
  }

  renderAnimation(force) {
    const c = $('.tithi-container canvas')[0];
    const ctx = c.getContext('2d');
    const bgImg = HelperUtil.createImage('images/bg.jpg');

    if (this.animate() || force) {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.drawImage(bgImg, 0, 0, c.width, c.height);

      ctx.fillStyle = '#333';

      const angle = Math.floor(
        HelperUtil.angleBetween(
          this.earth.center,
          this.sun.center,
          this.moon.center
        )
      );
      ctx.fillStyle = '#fff';
      ctx.font = '18px serif';
      ctx.fillText(`moon is leading sun by ${angle}°`, 10, 20);
      const tithi = this.tithis[Math.floor(angle / 12)];
      if (tithi !== this.selectedTithi()) {
        this.selectedTithi(tithi);
      }
      if (tithi) {
        ctx.fillText(`${tithi.tithi} (${tithi.paksha})`, 10, 45);
      }

      HelperUtil.drawLine(ctx, this.earth.center, this.sun.center, 'yellow');
      HelperUtil.drawLine(ctx, this.sun.center, this.moon.center, 'yellow');
      HelperUtil.drawLine(ctx, this.moon.center, this.earth.center, 'yellow');

      this.celestialObjects.forEach((x) => x.draw(ctx));

      HelperUtil.drawLit(ctx, this.sun.center, this.moon.center);

      this.celestialObjects.forEach((x) => {
        x.rotate();
        x.revolve();
      });

      if (tithi) {
        ctx.drawImage(tithi.moon, 900, 0, 100, 100);
      }
    }
    setTimeout(() => this.renderAnimation(), 100);
  }
}

$(document).ready(() => {
  const vm = new GeoCentricPanchangaTithiApp();
  ko.applyBindings(vm, $('body')[0]);
});
