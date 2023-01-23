class Tithis {
  createImage(img) {
    const i = new Image();
    i.src = img;
    return i;
  }

  createTithi(p, t, m, d) {
    return {
      paksha: p,
      tithi: t,
      moon: this.createImage(m),
      description: d,
    };
  }

  tithis = [
    this.createTithi(
      'Shukla',
      'Pratipada',
      'images/moon-s-1.png',
      'Agni: Called the first or Pratham, this is the best time to conduct any auspicious or religious ritual. The Tithi is ruled by Agni, the Fire God.'
    ),
    this.createTithi(
      'Shukla',
      'Dwitiya',
      'images/moon-s-2.png',
      'Brahma: Known as Vidya, according to Vedic Astrology, foundations of buildings and structures can be laid down on this day. Brahma, the God of Creation rules this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Tritiya',
      'images/moon-s-3.png',
      'Gauri: The day is called Teej and termed most favorable for arranging the Mundan (tonsure) ceremony, cutting hair and nails. Goddess Gauri rules this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Chaturthi',
      'images/moon-s-4.png',
      'Yama: The Tithi is also termed Chauth and is an ideal day for getting rid of opponents or enemies. Ganesha and Yama, God of Death rule this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Panchami',
      'images/moon-s-5.png',
      'Naga: Any individual wanting medical consultation or seeking surgery can get it done on this day. The outcome will be positive and successful. The Tithi is ruled by Nag Dev.'
    ),
    this.createTithi(
      'Shukla',
      'Shashthi',
      'images/moon-s-6.png',
      'Kartikeya: The time is favorable for celebrating festivals, a special occasion or event. Kartikeya rules this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Saptami',
      'images/moon-s-7.png',
      'Surya: Anyone can make purchases on this day, or if an individual must undertake a journey, they can do so as they can expect favorable results. The Tithi is ruled by Surya Dev, the Sun God.'
    ),
    this.createTithi(
      'Shukla',
      'Ashtami',
      'images/moon-s-8.png',
      'Shiva: A person can emerge successful on any front on this day as it is ruled by Shiva. Worshipping Rudra, an incarnation of Shiva in the Krishna Paksha, is considered to be very auspicious. It is prohibited during Shukla Paksha.'
    ),
    this.createTithi(
      'Shukla',
      'Navami',
      'images/moon-s-9.png',
      'Avantika: People should not conduct any auspicious rituals or ceremonies on this day. Maa Avantika rules the Tithi, which is marked by violence and destruction.'
    ),
    this.createTithi(
      'Shukla',
      'Dashmi',
      'images/moon-s-10.png',
      'Dharmaraj: The day is considered auspicious for conducting any religious or spiritual ceremony. The Tithi is ruled by Dharmaraj.'
    ),
    this.createTithi(
      'Shukla',
      'Ekadashi',
      'images/moon-s-11.png',
      'Mahadev: Fasts and worshipping are carried out on this day as it is considered very auspicious for Hindus and Jains. Mahadev ruled this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Dwadashi',
      'images/moon-s-12.png',
      'Vishnu: People can conduct religious rituals and ceremonies as the day is ruled by Vishnu.'
    ),
    this.createTithi(
      'Shukla',
      'Triodashshi',
      'images/moon-s-13.png',
      'Kamadev: An individual can make friends and celebrate as this day is favorable for sensual pleasures. Kamadev, God of Love rules this day.'
    ),
    this.createTithi(
      'Shukla',
      'Chaturdashi',
      'images/moon-s-14.png',
      'Kali: This day is meant for getting rid of evil spirits and negative influences. One can attain enlightenment on this day. Maa Kali rules this Tithi.'
    ),
    this.createTithi(
      'Shukla',
      'Purnima',
      'images/moon-phase-full.png',
      'Moon: The day is ideal for conducting fasts and Yagnas. One can listen to and recite religious stories on this day and achieve well. The Tithi is ruled by the Moon.'
    ),
    this.createTithi(
      'Krishna',
      'Pratipada',
      'images/moon-k-1.png',
      'Agni: Called the first or Pratham, this is the best time to conduct any auspicious or religious ritual. The Tithi is ruled by Agni, the Fire God.'
    ),
    this.createTithi(
      'Krishna',
      'Dwitiya',
      'images/moon-k-2.png',
      'Brahma: Known as Vidya, according to Vedic Astrology, foundations of buildings and structures can be laid down on this day. Brahma, the God of Creation rules this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Tritiya',
      'images/moon-k-3.png',
      'Gauri: The day is called Teej and termed most favorable for arranging the Mundan (tonsure) ceremony, cutting hair and nails. Goddess Gauri rules this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Chaturthi',
      'images/moon-k-4.png',
      'Ganesha and Yama: The Tithi is also termed Chauth and is an ideal day for getting rid of opponents or enemies. Ganesha and Yama, God of Death rule this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Panchami',
      'images/moon-k-5.png',
      'Naga: Any individual wanting medical consultation or seeking surgery can get it done on this day. The outcome will be positive and successful. The Tithi is ruled by Nag Dev.'
    ),
    this.createTithi(
      'Krishna',
      'Shashthi',
      'images/moon-k-6.png',
      'Kartikeya: The time is favorable for celebrating festivals, a special occasion or event. Kartikeya rules this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Saptami',
      'images/moon-k-7.png',
      'Surya: Anyone can make purchases on this day, or if an individual must undertake a journey, they can do so as they can expect favorable results. The Tithi is ruled by Surya Dev, the Sun God.'
    ),
    this.createTithi(
      'Krishna',
      'Ashtami',
      'images/moon-k-8.png',
      'Rudra(Shiva): A person can emerge successful on any front on this day as it is ruled by Shiva. Worshipping Rudra, an incarnation of Shiva in the Krishna Paksha, is considered to be very auspicious. It is prohibited during Shukla Paksha.'
    ),
    this.createTithi(
      'Krishna',
      'Navami',
      'images/moon-k-9.png',
      'Avantika: People should not conduct any auspicious rituals or ceremonies on this day. Maa Avantika rules the Tithi, which is marked by violence and destruction.'
    ),
    this.createTithi(
      'Krishna',
      'Dashmi',
      'images/moon-k-10.png',
      'Dharmaraj: The day is considered auspicious for conducting any religious or spiritual ceremony. The Tithi is ruled by Dharmaraj.'
    ),
    this.createTithi(
      'Krishna',
      'Ekadashi',
      'images/moon-k-11.png',
      'Mahadev: Fasts and worshipping are carried out on this day as it is considered very auspicious for Hindus and Jains. Mahadev ruled this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Dwadashi',
      'images/moon-k-12.png',
      'Vishnu: People can conduct religious rituals and ceremonies as the day is ruled by Vishnu.'
    ),
    this.createTithi(
      'Krishna',
      'Triodashshi',
      'images/moon-k-13.png',
      'Kamadev: An individual can make friends and celebrate as this day is favorable for sensual pleasures. Kamadev, God of Love rules this day.'
    ),
    this.createTithi(
      'Krishna',
      'Chaturdashi',
      'images/moon-k-14.png',
      'Kali: This day is meant for getting rid of evil spirits and negative influences. One can attain enlightenment on this day. Maa Kali rules this Tithi.'
    ),
    this.createTithi(
      'Krishna',
      'Amavasya',
      'images/moon-phase-ama.png',
      'People dedicate this day to Gods and ancestors and indulge in activities to serve them. This can attain favorable results. An individual can fast on this Tithi.'
    ),
  ];
}
