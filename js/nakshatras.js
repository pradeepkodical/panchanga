class Nakshatras {
  createImage(img) {
    const i = new Image();
    i.src = img;
    return i;
  }

  createNakshatra(p, t, m, d) {
    return {
      name: p,
      description: d,
    };
  }

  nakshatras = [
    this.createNakshatra('Ashwini'),
    this.createNakshatra('Bharani'),
    this.createNakshatra('Krittika'),
    this.createNakshatra('Rohini'),
    this.createNakshatra('Mrigasira'),
    this.createNakshatra('Ardra'),
    this.createNakshatra('Punarvasu'),
    this.createNakshatra('Pushya'),
    this.createNakshatra('Ashlesha'),
    this.createNakshatra('Magha'),
    this.createNakshatra('Purva Phalguni'),
    this.createNakshatra('Uttara Phalguni'),
    this.createNakshatra('Hasta'),
    this.createNakshatra('Chitra'),
    this.createNakshatra('Swati'),
    this.createNakshatra('Vishaka'),
    this.createNakshatra('Anuradha'),
    this.createNakshatra('Jyestha'),
    this.createNakshatra('Moola'),
    this.createNakshatra('Purvashada'),
    this.createNakshatra('Uttarashada'),
    this.createNakshatra('Shravana'),
    this.createNakshatra('Dhanistha'),
    this.createNakshatra('Satabhisha'),
    this.createNakshatra('Purvabhadra'),
    this.createNakshatra('Uttarabhadra'),
    this.createNakshatra('Revati'),
  ];
}
