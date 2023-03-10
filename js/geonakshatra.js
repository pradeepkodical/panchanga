class CelestialObject {
  radius;
  center;
  rotatesArround;
  lookAt;
  angularVelocity = 12;

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
    HelperUtil.rotatePoint(
      this.center,
      this.rotatesArround,
      this.angularVelocity
    );
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

class StarsCelestialObject1 extends CelestialObject {
  eAngle = 0;
  rotationalVelocity = 1.0;
  drawImg(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    this.eAngle += this.rotationalVelocity;
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

class StarsCelestialObject extends CelestialObject {
  eAngle = 0;
  rotationalVelocity = 1.0;

  drawBgImg(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);

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

  drawShape(ctx) {
    ctx.save();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i <= 27; i++) {
      let angle = i * (360.0 / 27);
      //angle += 360.0 / 27 / 3.0;
      const p = new Point(
        this.radius * Math.cos(((this.eAngle + angle) * Math.PI) / 180.0),
        this.radius * Math.sin(((this.eAngle + angle) * Math.PI) / 180.0)
      );
      HelperUtil.drawLine(
        ctx,
        this.center,
        this.center.clone().move(p),
        'orange'
      );
    }
    ctx.moveTo(this.center.x, this.center.y);
    //ctx.translate(-this.center.x, -this.center.y);
    ctx.restore();
  }

  drawImg(ctx) {
    this.eAngle += this.rotationalVelocity;
    this.eAngle = this.eAngle % 360;

    this.drawBgImg(ctx);
    this.drawShape(ctx);
  }
}

class GeoCentricPanchangaTithiApp {
  sunRadius = 30;
  moonRadius = 10;
  earthRadius = 20;
  starsRadius = 500;

  tithis = new Tithis().tithis;
  nakshatras = new Nakshatras().nakshatras;

  selectedTithi = ko.observable();
  selectedNakshatra = ko.observable();
  showAnimate = ko.observable(false);
  speed = ko.observable(1);
  animate = ko.observable(false);

  earth = new CelestialObject(
    this.earthRadius,
    new Point(500, 400),
    new Point(500, 400),
    'images/earth.png'
  );

  sun = new CelestialObject(
    this.sunRadius,
    new Point(800, 400),
    this.earth.center,
    'images/sun.png'
  );

  moon = new MoonCelestialObject(
    this.moonRadius,
    new Point(600, 400),
    this.earth.center,
    'images/moon2.png',
    this.sun.center
  );

  stars = new StarsCelestialObject(
    this.starsRadius,
    this.earth.center.clone(),
    this.earth.center,
    'images/nakshatra.png',
    this.earth.center
  );

  celestialObjects = [this.earth, this.moon, this.sun];

  constructor() {
    this.selectedTithi(this.tithis[0]);
    this.updateSpeed();
    setTimeout(() => this.renderAnimation(true), 1000);
  }

  updateSpeed() {
    this.sun.angularVelocity = this.speed();
    this.moon.angularVelocity =
      (this.sun.angularVelocity * (360.0 - 12.0)) / 360.0;

    this.stars.rotationalVelocity = this.sun.angularVelocity;
  }

  doToggleAnimate() {
    this.animate(!this.animate());
  }

  doSpeedUp() {
    this.speed(Math.min(this.speed() * 1.2, 20));
    this.updateSpeed();
  }

  doSpeedDown() {
    this.speed(Math.max(this.speed() / 1.2, 1));
    this.updateSpeed();
  }

  drawMetrics(ctx, nakshatra, tithi, angle) {
    ctx.fillStyle = '#333';

    ctx.fillStyle = '#fff';
    ctx.font = '18px serif';
    ctx.fillText(
      `From earth it appears like sun is leading moon by ${angle}??`,
      10,
      20
    );

    if (tithi !== this.selectedTithi()) {
      this.selectedTithi(tithi);
    }
    if (tithi) {
      ctx.fillText(`${tithi.tithi} (${tithi.paksha})`, 10, 45);
    }
    if (nakshatra) {
      ctx.fillText(`${nakshatra.name}`, 10, 65);
    }
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

      const angle = Math.floor(
        HelperUtil.angleBetween(
          this.earth.center,
          this.sun.center,
          this.moon.center
        )
      );
      const tithi = this.tithis[Math.floor(angle / 12)];
      const nakshatra = this.nakshatras[Math.floor(angle / 12)];

      this.selectedNakshatra(nakshatra);

      this.stars.draw(ctx);

      HelperUtil.drawLine(ctx, this.earth.center, this.sun.center, 'yellow');
      HelperUtil.drawLine(ctx, this.sun.center, this.moon.center, 'yellow');
      HelperUtil.drawLine(ctx, this.moon.center, this.earth.center, 'yellow');

      this.celestialObjects.forEach((x) => x.draw(ctx));

      this.stars.rotate();
      this.stars.revolve();
      this.celestialObjects.forEach((x) => {
        x.rotate();
        x.revolve();
      });

      if (tithi) {
        ctx.drawImage(tithi.moon, 900, 0, 100, 100);
      }

      this.drawMetrics(ctx, nakshatra, tithi, angle);
    }
    setTimeout(() => this.renderAnimation(), 100);
  }
}

$(document).ready(() => {
  const vm = new GeoCentricPanchangaTithiApp();
  ko.applyBindings(vm, $('body')[0]);
});
