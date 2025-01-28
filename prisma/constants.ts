export const categories = [
  { name: 'Пиццы' },
  { name: 'Завтрак' },
  { name: 'Закуски' },
  { name: 'Коктейли' },
  { name: 'Кофе' },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/sirniy_bortik.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/mozarella.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/siri_cheddar_i_parmezan.png',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/ostriy_perec_halapenio.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/nezhni_ciplyonok.png',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/shampinioni.png',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/vetchina.png',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/pikantnaya_pepperoni.png',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/ostraya_chorizo.png',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/marinovannie_ogyrchiki.png',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/svezhie_tomati.png',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/krasniy_luk.png',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/sochnie_ananasi.png',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/italyanskie_travi.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/sladkiy_perez.png',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/kubiki_brinzi.png',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/mitboli.png',
  },
  {
    name: 'Баварские колбаски',
    price: 129,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/bavarskie_kolbaski.png',
  },
  {
    name: 'Бекон',
    price: 79,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/bekon.png',
  },
  {
    name: 'Креветки',
    price: 199,
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/krevetki.png',
  },
  {
    name: 'Пряная говядина',
    price: 119,
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/ingredients/pryanaya_govyadina.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с ветчиной и грибами в пите',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/omlet_s_vetchinoi_i_gribami_v_pite.png',
    description:
      'Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла в пшеничной пите. Удобно взять с собой',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони в пите',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/omlet_s_pepperoni_v_pite.png',
    description:
      'Для тех, кто не пропускает завтраки — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла в пшеничной пите. Удобно взять с собой',
    categoryId: 2,
  },
  {
    name: 'Омлет с беконом',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/omlet_s_bekonom.png',
    description:
      'Классическое сочетание горячего омлета с поджаристой корочкой и бекона с добавлением моцареллы и томатов на завтрак',
    categoryId: 2,
  },
  {
    name: 'Омлет сырный',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/omlet_sirnii.png',
    description:
      'Горячий завтрак из омлета с поджаристой корочкой, моцарелла, кубики брынзы, сыры чеддер и пармезан',
    categoryId: 2,
  },
  {
    name: 'Сырники со сгущенным молоком',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/sirniki_so_sgushennim_molokom.png',
    description: 'Нежные сырники, приготовленные в печи, с порционным сгущенным молоком',
    categoryId: 2,
  },
  {
    name: 'Сырники с малиновым вареньем',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/sirniki_s_malinovim_vareniem.png',
    description:
      'Любимый десерт многих гостей — румяные сырники из печи с малиновым вареньем. Нежные, в меру сладкие и напоминающие детство',
    categoryId: 2,
  },
  {
    name: 'Завтрак на двоих',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/breakfast/zavtrak_na_dvoih.png',
    description: 'Горячий завтрак для двоих. 2 любые закуски и 2 напитка на выбор',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/denvich_vetchina_i_sir.png',
    description:
      'Поджаристая чиабатта и знакомое сочетание ветчины, цыпленка, моцареллы со свежими томатами, соусом ранч и чесноком',
    categoryId: 3,
  },
  {
    name: 'Дэнвич с говядиной',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/denvich_s_govyadinoy.png',
    description:
      'Хрустящая чиабатта с ароматной пряной говядиной и цыпленком с соусами бургер и барбекю, свежими томатами и моцареллой',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/kyrinie_naggetsi.png',
    description: 'Нежное куриное мясо в хрустящей панировке',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи с соусом',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/kartofel_iz_pechi_s_soysom.png',
    description: 'Запеченная в печи картошечка с пряными специями. В комплекте сырный соус',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/dodster.png',
    description:
      'Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/ostrii_dodster.png',
    description:
      'Горячая закуска с цыпленком, перчиком халапеньо, маринованными огурчиками, томатами, моцареллой и соусом барбекю в тонкой пшеничной лепешке',
    categoryId: 3,
  },
  {
    name: 'Додстер с ветчиной',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/dodster_s_vetchinoy.png',
    description:
      'Горячий завтрак с ветчиной, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке',
    categoryId: 3,
  },
  {
    name: 'Креветки',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/krevetki.png',
    description: 'Цельные креветки в хрустящей панировке',
    categoryId: 3,
  },
  {
    name: 'Паста Карбонара',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/pasta_karbonara.png',
    description:
      'Паста из печи с беконом, сырами чеддер и пармезан, томатами, моцареллой, фирменным соусом альфредо и чесноком',
    categoryId: 3,
  },
  {
    name: 'Паста Мясная',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/pasta_myasnaya.png',
    description:
      'Паста из печи с митболами, соусом бургер, моцареллой, фирменным томатным соусом и чесноком',
    categoryId: 3,
  },
  {
    name: 'Сырный Стартер',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/sirnii_starter.png',
    description:
      'Горячая закуска с очень сырной начинкой. Моцарелла, пармезан, чеддер и соус ранч в тонкой пшеничной лепешке',
    categoryId: 3,
  },
  {
    name: 'Грибной Стартер',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/gribnoy_starter.png',
    description:
      'Горячая закуска с шампиньонами, моцареллой и соусом ранч в тонкой пшеничной лепешке',
    categoryId: 3,
  },
  {
    name: 'Куриные кусочки',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/kyrinie_kysochki.png',
    description: 'Сочные кусочки цельного куриного филе с золотистой корочкой',
    categoryId: 3,
  },
  {
    name: 'Куриные крылья барбекю',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/kyrinie_kriliya_barbeku.png',
    description: 'Куриные крылышки со специями и ароматом копчения',
    categoryId: 3,
  },
  {
    name: 'Салат Цезарь',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/snacks/salat_cezar.png',
    description:
      'Цыпленок, свежие листья салата айсберг, томаты черри, сыры чеддер и пармезан, соус цезарь, пшеничные гренки, итальянские травы',
    categoryId: 3,
  },
  {
    name: 'Молочный коктейль Ежевика-малина',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/molochnii_kokteil_ezhevika-malina.png',
    description: 'Сливочная прохлада классического молочного коктейля с добавлением лесных ягод',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль Пина Колада',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/molochnii_kokteil_pina_kolada.png',
    description: 'Тропическое сочетание кокоса и ананаса в нежном милкшейке',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/molochnii_kokteil_s_pecheniem_oreo.png',
    description: 'То самое печенье «Орео» в удобном формате ледяного милкшейка',
    categoryId: 4,
  },
  {
    name: 'Классический молочный коктейль',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/klassicheskii_molochnii_kokteil.png',
    description: 'Это классика: молоко, мороженое и ничего лишнего',
    categoryId: 4,
  },
  {
    name: 'Шоколадный молочный коктейль',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/shokoladnii_molochnii_kokteil.png',
    description: 'Шоколадный милкшейк со сливочным мороженым и фирменным какао',
    categoryId: 4,
  },
  {
    name: 'Клубничный молочный коктейль',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/cocktails/klybnichnii_molochnii_kokteil.png',
    description: 'Лето всегда рядом: сироп из спелой клубники, молоко и мороженое',
    categoryId: 4,
  },
  {
    name: 'Кофе Капучино',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_kapychinno.png',
    description: 'Легендарный рецепт кофе: эспрессо, горячее молоко и плотная молочная пенка',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl:
      'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_karamelnii_kapuchino.png',
    description: 'Классический капучино с молочной пенкой и карамельным сиропом',
    categoryId: 5,
  },
  {
    name: 'Кофе Ореховый латте',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_orehovii_latte.png',
    description: 'Горячий латте с сиропом со вкусом фундука',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_kokosovii_latte.png',
    description: 'Горячий латте с кокосовым сиропом',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_amerikano.png',
    description: 'Горячий кофе для ценителей чистого вкуса',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    imageUrl: 'https://storage.yandexcloud.net/nextjs-pizza-shop/coffee/kofe_latte.png',
    description:
      'Идеально сбалансированное сочетание кофе, увеличенной порции молока и нежнейшей пенки',
    categoryId: 5,
  },
];
