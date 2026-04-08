export const placesData = [
  {
    id: '1',
    category: 'Nature',
    title: {
      en: 'Bale Mountains National Park',
      am: 'የባሌ ተራሮች ብሔራዊ ፓርክ',
      or: 'Paarkii Biyyaalessaa Gaarreewwan Baale',
    },
    description: {
      en: 'Home to the Ethiopian wolf and stunning alpine scenery, perfect for high-altitude trekking.',
      am: 'የኢትዮጵያ ቀይ ቀበሮ የሚገኝበት እና አስደናቂ የተራራ እይታዎች ያሉት፣ ለከፍተኛ ተራራ ጉዞ ምርጥ ቦታ።',
      or: 'Bakka yaayyaa Itoophiyaa itti argamuu fi bifa lafa gaarrenii ajaa’ibsiisaa qabu, imala gaaraa olka’aaf baay’ee gaarii dha.',
    },
    travelTip: {
      en: 'Bring warm clothes as temperatures drop significantly at night. Wear hiking shoes.',
      am: 'ምሽት ላይ ቅዝቃዜው ስለሚጨምር ሞቅ ያሉ ልብሶችን ይዘው ይምጡ። የጉዞ ጫማ ይልበሱ።',
      or: 'Halkan qabbanni waan dabaluuf uffata ho’aa qabadhaa. Kophii daandii uffadhab.',
    },
    image: require('../assets/images/bale_mountains.png'),
    coordinates: {
      latitude: 6.7025,
      longitude: 39.7186,
    },
  },
  {
    id: '2',
    category: 'Culture',
    title: {
      en: 'Dodola Horse Market',
      am: 'የዶዶላ የፈረስ ገበያ',
      or: 'Gabaa Fardaa Dodolaa',
    },
    description: {
      en: 'Experience the vibrant local culture where traditional horse trading has happened for generations.',
      am: 'ለትውልድ ሲተላለፍ የቆየውን ባህላዊ የፈረስ ንግድ እና ደማቅ የአካባቢውን ባህል ይለማመዱ።',
      or: 'Aadaa naannoo dammaqaa daldalli fardaa aadaa dhalootaaf itti raawwatamaa ture muuxannoo godhadha.',
    },
    travelTip: {
      en: 'The market is most active early Saturday mornings. Visit early morning.',
      am: 'ገበያው ቅዳሜ ጠዋት በጠዋት በጣም ይደመቃል። ጠዋት በመጀመር ይጎብኙ።',
      or: 'Gabaan kun sa’aatii ganamatti guyyaa Sanbataa baay’ee ho’aa dha. Ganama dursee daawwadhu.',
    },
    image: require('../assets/images/horse_market.png'),
    coordinates: {
      latitude: 6.9833,
      longitude: 39.1833,
    },
  },
  {
    id: '3',
    category: 'Nature',
    title: {
      en: 'Tulu Gudu Waterfall',
      am: 'የቱሉ ጉዱ ፏፏቴ',
      or: 'Faafataa Tulluu Gudduu',
    },
    description: {
      en: 'A hidden gem deep in the forest, offering a refreshing break for trekkers.',
      am: 'በጫካው ውስጥ የተደበቀ ውብ ፏፏቴ፣ ለእግር ተጓዦች እረፍት የሚሰጥ።',
      or: 'Badhaadhina Bosona keessatti dhokate, imaltoota miilaatiif boqonnaa qabbaneessaa kan kennu.',
    },
    travelTip: {
      en: 'Wear waterproof hiking shoes for the slippery trails.',
      am: 'ለሚያንሸራትተው መንገድ ውሃ የማይያስገቡ የጫካ ጫማዎችን ያድርጉ።',
      or: 'Daandiiwwan mucucaatan dabalataaf kophee bishaan hin galchine uffadhaa.',
    },
    image: require('../assets/images/waterfall.png'),
    coordinates: {
      latitude: 6.9500,
      longitude: 39.2000,
    },
  },
  {
    id: '4',
    category: 'Trekking',
    title: {
      en: 'Dodola Forest Trails',
      am: 'የዶዶላ የጫካ መንገዶች',
      or: 'Daandiiwwan Bosona Dodolaa',
    },
    description: {
      en: 'Ancient juniper and hagenia forests with well-maintained trails for all levels of hikers.',
      am: 'ጥንታዊ የጽድና የቆሶ ዛፎች ያሉበት ጫካ፣ ለማንኛውም ደረጃ ተጓዦች የሚሆኑ መንገዶች ያሉት።',
      or: 'Bosona hindheessaa fi qasoo durii daandiiwwan namoota miilaan deeman sadarkaa hundaaf qophaa’an qabu.',
    },
    travelTip: {
      en: 'Always hire a local guide to learn more about the diverse plant life.',
      am: 'ስለ የተለያዩ ዕፅዋት የበለጠ ለማወቅ ሁልጊዜ የአካባቢውን አስጎብኝ ይቅጠሩ።',
      or: 'Qabeenya biqiltuu garagaraa barachuuf yeroo hunda qajeelchaa naannoo qajjeelfadhaa.',
    },
    image: require('../assets/images/dodola_forest.png'),
    coordinates: {
      latitude: 6.9700,
      longitude: 39.1500,
    },
  },
  {
    id: '5',
    category: 'Culture',
    title: {
      en: 'Traditional Harsade Dance',
      am: 'ባህላዊ የሀርሳዴ ጭፈራ',
      or: 'Sirba Aadaa Harsaadee',
    },
    description: {
      en: 'Witness the energetic traditional dances of the Arsi Oromo people during local celebrations.',
      am: 'በአካባቢው በዓላት ወቅት የአርሲ ኦሮሞ ተወላጆችን ደማቅ ባህላዊ ጭፈራ ይመልከቱ።',
      or: 'Ayyaana naannoo irratti sirba aadaa namoota Oromoo Arsii dammaqina qabu daawwadhaa.',
    },
    travelTip: {
      en: 'Ask for permission before taking close-up photos of performers.',
      am: 'የተወላጆቹን የቅርብ ፎቶ ከመነሳትዎ በፊት ፈቃድ ይጠይቁ።',
      or: 'Waraabbii suuraa dhiyeenyatti fudhachuu dura hayyama gaafadhaa.',
    },
    image: require('../assets/images/traditional_dance.png'),
    coordinates: {
      latitude: 6.9850,
      longitude: 39.1850,
    },
  },
];
