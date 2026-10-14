// プリセット記事（段落ごとの英文＋日本語訳）
const ARTICLES = [
  {
    id: "webb",
    title: "James Webb Space Telescope",
    titleJa: "ジェームズ・ウェッブ宇宙望遠鏡",
    emoji: "🔭",
    grad: ["#1e1b4b", "#7c3aed"],
    sections: [
      {
        en: "The James Webb Space Telescope is the largest and most powerful telescope ever sent into space. It was launched on December 25, 2021. Its giant golden mirror is as wide as a small giraffe is tall.",
        ja: "ジェームズ・ウェッブ宇宙望遠鏡は、これまで宇宙に送られた中で最大かつ最も強力な望遠鏡です。2021年12月25日に打ち上げられました。その巨大な金色の鏡は、小さなキリンの背丈ほどの幅があります。"
      },
      {
        en: "Webb does not orbit Earth. Instead, it sits about 1.5 million kilometers away, in a spot where the Sun, Earth, and Moon are all in the same direction. A huge sunshield keeps its instruments very cold.",
        ja: "ウェッブは地球の周りを回っていません。代わりに、太陽・地球・月がすべて同じ方向にある、約150万キロ離れた場所にいます。巨大な日よけが機器をとても冷たく保っています。"
      },
      {
        en: "Webb sees infrared light, which our eyes cannot see. This lets it look through clouds of dust and gas. Scientists can now watch new stars being born inside these clouds.",
        ja: "ウェッブは私たちの目には見えない赤外線を見ます。これにより、ガスや塵の雲を通り抜けて観測できます。科学者たちは、その雲の中で新しい星が生まれる様子を見られるようになりました。"
      },
      {
        en: "Light from very distant galaxies takes billions of years to reach us. So when Webb looks far away, it also looks back in time. It has already found galaxies that formed just after the universe began.",
        ja: "とても遠い銀河の光が私たちに届くには何十億年もかかります。そのため、ウェッブが遠くを見るとき、同時に過去も見ています。宇宙が始まった直後に生まれた銀河も、すでに発見されています。"
      },
      {
        en: "Webb can also study the air around planets far from our solar system. It looks for gases like water and carbon dioxide. One day, this may help us find a planet where life could exist.",
        ja: "ウェッブは太陽系の外にある惑星の大気も調べられます。水や二酸化炭素などのガスを探します。いつか、生命が存在できる惑星を見つける手助けになるかもしれません。"
      }
    ]
  },
  {
    id: "squid",
    title: "The Giant Squid of the Deep Sea",
    titleJa: "深海の巨大イカ",
    emoji: "🦑",
    grad: ["#082f49", "#0891b2"],
    sections: [
      {
        en: "Deep in the ocean, where sunlight cannot reach, lives one of the biggest animals on Earth. The giant squid can grow as long as a school bus. For hundreds of years, people thought it was only a sea monster from old stories.",
        ja: "太陽の光が届かない深い海の底に、地球最大級の動物の一つが住んでいます。ダイオウイカはスクールバスほどの長さに成長します。何百年もの間、人々はそれを昔話の中の海の怪物だと思っていました。"
      },
      {
        en: "The giant squid has the largest eyes in the animal kingdom. Each eye is about the size of a soccer ball. These big eyes help it see faint flashes of light in the dark water.",
        ja: "ダイオウイカは動物の中で最大の目を持っています。それぞれの目はサッカーボールほどの大きさです。この大きな目のおかげで、暗い水の中のかすかな光を見つけられます。"
      },
      {
        en: "It has eight arms and two extra-long tentacles. The tentacles shoot out quickly to grab food, such as fish and other squid. Then the arms pull the food toward its sharp beak.",
        ja: "8本の腕と、2本のとても長い触腕があります。触腕は素早く伸びて、魚や他のイカなどの獲物をつかみます。それから腕が獲物を鋭いくちばしへ引き寄せます。"
      },
      {
        en: "The giant squid's greatest enemy is the sperm whale. Whales dive deep to hunt them, and many whales carry round scars from squid suckers. These scars show that the fights can be fierce.",
        ja: "ダイオウイカの最大の天敵はマッコウクジラです。クジラは深く潜ってイカを狩り、多くのクジラの体にはイカの吸盤による丸い傷あとが残っています。この傷は戦いが激しいことを物語っています。"
      },
      {
        en: "In 2012, scientists finally filmed a living giant squid in its home in the deep sea. It was the first time humans had seen one swimming in the wild. There is still much more to learn about this mysterious animal.",
        ja: "2012年、科学者たちはついに、深海にすむ生きたダイオウイカの撮影に成功しました。人間が野生で泳ぐ姿を見たのは初めてのことでした。この神秘的な動物については、まだまだ知らないことがたくさんあります。"
      }
    ]
  },
  {
    id: "chameleon",
    title: "The Secret of Chameleon Colors",
    titleJa: "カメレオンの変色の秘密",
    emoji: "🦎",
    grad: ["#14532d", "#84cc16"],
    sections: [
      {
        en: "Many people believe that chameleons change color to hide. That is only part of the story. Chameleons mostly change color to talk to each other and to react to heat and light.",
        ja: "多くの人は、カメレオンは隠れるために色を変えると信じています。でもそれは話の一部にすぎません。カメレオンは主に、仲間と「会話」したり、熱や光に反応したりするために色を変えます。"
      },
      {
        en: "A chameleon's skin has special cells called iridophores. These cells hold tiny crystals that bounce light. When the chameleon changes the space between the crystals, the color of the skin changes too.",
        ja: "カメレオンの皮ふには、虹色素胞と呼ばれる特別な細胞があります。この細胞には光を反射する小さな結晶が入っています。結晶の間隔を変えると、皮ふの色も変わります。"
      },
      {
        en: "Males often turn bright colors to show off or to scare away rivals. Females may show dark colors to say \"stay away.\" Colors can tell others if a chameleon is angry, scared, or ready to find a mate.",
        ja: "オスは自分を見せつけたり、ライバルを追い払ったりするために鮮やかな色になることがよくあります。メスは「近づかないで」と伝えるために暗い色を見せることがあります。色は、怒っているか、怖がっているか、相手を探す準備ができているかを伝えます。"
      },
      {
        en: "Temperature matters, too. A cold chameleon may turn darker to soak up more heat from the Sun. A hot chameleon may turn lighter to reflect the sunlight and stay cool.",
        ja: "温度も大切です。体が冷えたカメレオンは、太陽の熱をより多く吸収するために暗い色になることがあります。暑いカメレオンは、日光を反射して涼しく保つために明るい色になることがあります。"
      },
      {
        en: "Chameleons have other amazing tricks. Their eyes can move in two different directions at the same time. And their long, sticky tongues can shoot out faster than you can blink!",
        ja: "カメレオンには他にもすごい特技があります。両目をそれぞれ別の方向に同時に動かせます。そして長くてねばねばした舌は、まばたきするより速く飛び出します！"
      }
    ]
  }
];

// おすすめサイト
const SITES = [
  { name: "National Geographic Kids – Animals", desc: "動物の写真と豆知識がいっぱい", url: "https://kids.nationalgeographic.com/animals", emoji: "🐾" },
  { name: "National Geographic Kids – Space", desc: "宇宙のふしぎをやさしい英語で", url: "https://kids.nationalgeographic.com/space", emoji: "🪐" },
  { name: "NASA Space Place / Kids' Club", desc: "NASAの子ども向け科学ページ", url: "https://spaceplace.nasa.gov/", emoji: "🚀" },
  { name: "Science News Explores", desc: "最新の科学ニュースを学生向けに", url: "https://www.snexplores.org/", emoji: "🔬" },
  { name: "BBC Earth Kids", desc: "自然・生き物の読みもの", url: "https://www.bbc.co.uk/newsround/", emoji: "🌍" }
];
