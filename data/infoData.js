export const services = {
  public: {
    type: 'flat',
    coverImage: require('../assets/images/dir_public.png'),
    items: [
      {
        id: 'p1',
        title: {
          en: 'Dodola Police Station',
          am: 'ዶዶላ ፖሊስ ጣቢያ',
          or: 'Buufata Poolisii Dodolaa'
        },
        icon: 'local-police',
        phone: '+251464140000'
      },
      {
        id: 'p2',
        title: {
          en: 'Dodola General Hospital',
          am: 'ዶዶላ አጠቃላይ ሆስፒታል',
          or: 'Hospitaala Waliigalaa Dodolaa'
        },
        icon: 'local-hospital',
        phone: '+251464140123'
      },
      {
        id: 'p3',
        title: {
          en: 'Ethiopian Red Cross (Dodola)',
          am: 'የኢትዮጵያ ቀይ መስቀል ማህበር',
          or: 'Fannoo Diimaa Itiyoophiyaa'
        },
        icon: 'healing',
        phone: null
      },
      {
        id: 'p4',
        title: {
          en: 'Local Administrator Office',
          am: 'አካባቢ አስተዳደር ቢሮ',
          or: 'Waajjira Bulchiinsaa'
        },
        icon: 'account-balance',
        phone: null
      }
    ]
  },
  education: {
    type: 'nested',
    coverImage: require('../assets/images/dir_education.png'),
    subcategories: {
      highSchools: [
        { id: 'e1', title: { en: 'Ifa Boru Special Boarding School', am: 'ኢፋ ቦሩ ልዩ አዳሪ ትምህርት ቤት', or: 'Mana Barumsaa Bultii Addaa Ifa Boruu' }, icon: 'school' },
        { id: 'e2', title: { en: 'Hawiko Academy Secondary School', am: 'ሃዊኮ አካዳሚ 2ኛ ደረጃ', or: 'Akkaadaamii Haawikoo Sad. 2ffaa' }, icon: 'school' },
        { id: 'e3', title: { en: 'Abdi Boru Boarding School', am: 'አብዲ ቦሩ አዳሪ ትምህርት ቤት', or: 'Mana Barumsaa Bultii Abdi Boru' }, icon: 'school' },
        { id: 'e4', title: { en: 'Dodola High School', am: 'ዶዶላ 2ኛ ደረጃ ትምህርት ቤት', or: 'Mana Barumsaa Sad. 2ffaa Dodolaa' }, icon: 'school' }
      ],
      elementarySchools: [
        { id: 'e5', title: { en: 'Hawiko Academy Primary', am: 'ሃዊኮ አካዳሚ አንደኛ ደረጃ', or: 'Akkaadaamii Haawikoo Sad. 1ffaa' }, icon: 'menu-book' },
        { id: 'e6', title: { en: 'Melestengna Primary', am: 'መለስተኛ አንደኛ ደረጃ', or: 'Mana Barumsaa Melestengna' }, icon: 'menu-book' },
        { id: 'e7', title: { en: 'Denebe Primary', am: 'ደነበ አንደኛ ደረጃ', or: 'Mana Barumsaa Denebe' }, icon: 'menu-book' },
        { id: 'e8', title: { en: 'Mujeema Primary', am: 'ሙጄማ አንደኛ ደረጃ', or: 'Mana Barumsaa Mujeema' }, icon: 'menu-book' },
        { id: 'e9', title: { en: 'G/Kirstos Primary', am: 'ገ/ክርስቶስ አንደኛ ደረጃ', or: 'Mana Barumsaa G/Kirstos' }, icon: 'menu-book' },
        { id: 'e10', title: { en: 'Mekaneyeus Primary', am: 'መካነ ኢየሱስ አንደኛ ደረጃ', or: 'Mana Barumsaa Mekaneyeus' }, icon: 'menu-book' }
      ],
      colleges: [
        { id: 'e11', title: { en: 'Dodola TVET College', am: 'ዶዶላ ቴክኒክና ሙያ ኮሌጅ', or: 'Koolleejjii TVET Dodolaa' }, icon: 'business' }
      ]
    }
  },
  banking: {
    type: 'flat',
    coverImage: require('../assets/images/dir_banking.png'),
    items: [
      { id: 'b1', title: { en: 'Commercial Bank of Ethiopia', am: 'የኢትዮጵያ ንግድ ባንክ', or: 'Baankii Daldala Itiyoophiyaa' }, icon: 'account-balance' },
      { id: 'b2', title: { en: 'Cooperative Bank of Oromia', am: 'የኦሮሚያ ህብረት ስራ ባንክ', or: 'Baankii Hojii Gamtaa Oromiyaa' }, icon: 'account-balance' },
      { id: 'b3', title: { en: 'Oromia International Bank', am: 'ኦሮሚያ ኢንተርናሽናል ባንክ', or: 'Baankii Idil-Addunyaa Oromiyaa' }, icon: 'account-balance' },
      { id: 'b4', title: { en: 'Awash Bank', am: 'አዋሽ ባንክ', or: 'Baankii Awaash' }, icon: 'account-balance' },
      { id: 'b5', title: { en: 'Dashen Bank', am: 'ዳሸን ባንክ', or: 'Baankii Daashen' }, icon: 'account-balance' },
      { id: 'b6', title: { en: 'Bank of Abyssinia', am: 'አቢሲንያ ባንክ', or: 'Baankii Abisiiniyaa' }, icon: 'account-balance' },
      { id: 'b7', title: { en: 'Nib International Bank', am: 'ንብ ኢንተርናሽናል ባንክ', or: 'Baankii Idil-Addunyaa Nib' }, icon: 'account-balance' },
      { id: 'b8', title: { en: 'Buna Bank', am: 'ቡና ባንክ', or: 'Baankii Bunaa' }, icon: 'account-balance' },
      { id: 'b9', title: { en: 'Enat Bank', am: 'እናት ባንክ', or: 'Baankii Enaat' }, icon: 'account-balance' },
      { id: 'b10', title: { en: 'Gadaa Bank', am: 'ገዳ ባንክ', or: 'Baankii Gadaa' }, icon: 'account-balance' },
      { id: 'b11', title: { en: 'Sinqee Bank (Iinqe)', am: 'ሲንቄ ባንክ', or: 'Baankii Siinqee' }, icon: 'account-balance' }
    ]
  },
  hospitality: {
    type: 'nested',
    coverImage: require('../assets/images/dir_hospitality.png'),
    subcategories: {
      hotels: [
        { id: 'h1', title: { en: 'Rose Hotel & Apartment', am: 'ሮዝ ሆቴልና አፓርትመንት', or: 'Hoteelaafi Apaartimantii Rooz' }, icon: 'hotel' },
        { id: 'h2', title: { en: 'TG Hotel', am: 'ቲጂ ሆቴል', or: 'TG Hoteela' }, icon: 'hotel' },
        { id: 'h4', title: { en: 'Ker Amin Hotel', am: 'ኬር አሚን ሆቴል', or: 'Hoteela Keer Amiin' }, icon: 'hotel' },
        { id: 'h5', title: { en: 'Bale Mountains Hotel', am: 'ባሌ ማውንቴንስ ሆቴል', or: 'Hoteela Gaarreewwan Baale' }, icon: 'hotel' },
        { id: 'h6', title: { en: 'Yeronke Hotel', am: 'የሮንኬ ሆቴል', or: 'Hoteela Yaronkee' }, icon: 'hotel' },
        { id: 'h7', title: { en: 'Addis Hotel', am: 'አዲስ ሆቴል', or: 'Hoteela Addis' }, icon: 'hotel' },
        { id: 'h8', title: { en: 'Meraf 1 Hotel', am: 'ምዕራፍ 1 ሆቴል', or: 'Hoteela Meraaf 1ffaa' }, icon: 'hotel' },
        { id: 'h9', title: { en: 'Lasta Hotel', am: 'ላስታ ሆቴል', or: 'Hoteela Laastaa' }, icon: 'hotel' }
      ],
      guestRooms: [
        { id: 'h3', title: { en: 'Lekko Guest Rooms', am: 'ሌኮ የእንግዳ ማረፊያ', or: 'Kutaawwan Keessummaa Lekkoo' }, icon: 'meeting-room' }
      ],
      localEats: [
        { id: 'h10', title: { en: 'Tesfaye Butcher', am: 'ተስፋዬ ስጋ ቤት', or: 'Foon Qalaa Tesfaayee' }, icon: 'restaurant' }
      ],
      cafes: [
        { id: 'h11', title: { en: 'AMAZON Cafe', am: 'አማዞን ካፌ', or: 'Kaaffee AMAZON' }, icon: 'local-cafe' }
      ]
    }
  },
  utilities: {
    type: 'nested',
    coverImage: require('../assets/images/dir_utilities.png'),
    subcategories: {
      gasStations: [
        { id: 'g1', title: { en: 'Africa Gas Station', am: 'አፍሪካ ነዳጅ ማደያ', or: 'Buufata Boba\'aa Afrikaa' }, icon: 'local-gas-station', phone: null, description: { en: 'Located on the main road, a central hub for long-distance trucks and buses.', am: 'በዋናው መንገድ ላይ የሚገኝ፣ ለረጅም ርቀት የጭነት መኪናዎች እና አውቶቡሶች ማዕከል ነው።', or: 'Daandii guddaa irratti kan argamu, iddoo giddu gala konkolaattota fe\'umsa fi awutoobusoota fageenya dheeraa deeman ti.' } },
        { id: 'g2', title: { en: 'Olibya (Libya Oil)', am: 'ኦሊቢያ ነዳጅ ማደያ', or: 'Buufata Boba\'aa Olibiyaa' }, icon: 'local-gas-station', phone: null, description: { en: 'Known for reliable fuel and service quality.', am: 'አስተማማኝ የነዳጅ እና የአገልግሎት ጥራት በመስጠት የታወቀ።', or: 'Boba\'aa amansiisaa fi qulqullina tajaajilaatiin beekama.' } },
        { id: 'g3', title: { en: 'NOC Gas Station (Gash Ariya)', am: 'ኤን ኦ ሲ (ጋሽ አሪያ)', or: 'NOC (Gaash Ariyaa)' }, icon: 'local-gas-station', phone: null, description: { en: 'This is a key landmark; locals know it primarily as Gash Ariya.', am: 'ይህ ቁልፍ መለያ ምልክት ነው፤ የአካባቢው ሰዎች በዋናነት ጋሽ አሪያ ብለው ያውቁታል።', or: 'Kun mallattoo iddoo barbaachisaa dha; uummanni naannoo irra caalaa Gaash Ariyaa jedhanii beeku.' } },
        { id: 'g4', title: { en: 'TotalEnergies (Station 1)', am: 'ቶታል (ጣቢያ 1)', or: 'Total (Buufata 1)' }, icon: 'local-gas-station', phone: null, description: { en: 'Traditional high-service station.', am: 'ባህላዊ የከፍተኛ አገልግሎት መስጫ ጣቢያ።', or: 'Buufata tajaajila olaanaa aadaa kennu.' } },
        { id: 'g5', title: { en: 'TotalEnergies (Gash Beriso)', am: 'ቶታል (ጋሽ በሪሶ)', or: 'Total (Gaash Berisoo)' }, icon: 'local-gas-station', phone: null, description: { en: 'The second major Total station, commonly referred to by locals as Gash Beriso.', am: 'በአካባቢው ነዋሪዎች ዘንድ ባብዛኛው ጋሽ በሪሶ እየተባለ የሚጠራው ሁለተኛው ዋናው የቶታል ማደያ።', or: 'Buufata Total guddicha lammaffaa ta\'ee, yeroo baay\'ee uummata naannootiin Gaash Berisoo jedhamee waamama.' } }
      ]
    }
  }
};
