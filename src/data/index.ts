export interface ISwiper {
  image: string;
  content: string;
  br: string;
}

const dataSwiper: ISwiper[] = [
  {
    image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/slide31.jpg?v=1629543119',
    content: 'Đèn bàn Fliegenbein',
    br: 'Ưu đãi đặc biệt đồ nội thất hiện đại.',
  },
  {
    image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/slide32.jpg?v=1629543119',
    content: 'Ghế văn phòng gỗ tối giản',
    br: 'Giảm thêm 40% ngay bây giờ.',
  },
  {
    image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/slide33.jpg?v=1629543119',
    content: 'Bình giữ nhiệt Nordic Kitchen',
    br: 'Giảm giá lớn 70%.',
  },
];
export interface IProduct {
  product_image: string;
  product_image_placehoder: string;
  product_name: string;
  product_price: number;
  product_sale_price?: number;
  variety_product?: string[];
}

const product: IProduct[] = [
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/21_1_360x.jpg?v=1598253084',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/21_2.jpg?v=1598253084',
    product_name: 'Arctander Chair',
    product_price: 39.0,
    variety_product: [
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/21_1_small.jpg?v=1598253084',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/2_1_44d927bb-269a-4f5c-be70-61963ee51dd0_small.jpg?v=1598253084',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/18_2_small.jpg?v=1598253084',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/2_2_764f9b85-a5ed-415a-8231-214d7e9ac586_small.jpg?v=1598253084',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/21_2_small.jpg?v=1598253084',
    ],
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/28_540x.jpg?v=1586316960',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/28_540x.jpg?v=1586316960',
    product_name: 'Stainless steel teapot',
    product_price: 57.0,
    product_sale_price: 39.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/29_540x.jpg?v=1586316900',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/29_2.jpg?v=1586316900',
    product_name: 'Beoplay A1',
    product_price: 57.0,
    product_sale_price: 39.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/30_540x.jpg?v=1586316781',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/30_1.jpg?v=1586316781',
    product_name: 'Turning Table',
    product_price: 59.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/3_1_540x.jpg?v=1586316386',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/3_2.jpg?v=1586316386',
    product_name: 'Side Table',
    product_price: 59.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/20_1_540x.jpg?v=1586314636',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/20_2.jpg?v=1586314636',
    product_name: 'Pia Chair',
    product_price: 59.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/15.jpg?v=1586245185',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/15_2.jpg?v=1586245185',
    product_name: 'Iconic Rocking Horse',
    product_price: 89.0,
    variety_product: [
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/15.jpg?v=1586245185',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/15_2.jpg?v=1586245185',
    ],
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/2_1.jpg?v=1586245114',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/2_2.jpg?v=1586245114',
    product_name: 'Outdoor Dining Table',
    product_price: 59.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/14_800x.jpg?v=1586245038',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/14_800x.jpg?v=1586245038',
    product_name: 'Victo pedant lamp',
    product_price: 79.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/26_800x.jpg?v=1586244888',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/26_800x.jpg?v=1586244888',
    product_name: 'Mogens koch Bookcase',
    product_price: 175.0,
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/1_1.jpg?v=1586244828',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/1_2.jpg?v=1586244828',
    product_name: 'Storm Small Jug',
    product_price: 27.0,
    variety_product: [
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/1_1.jpg?v=1586244828',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/1_2.jpg?v=1586244828',
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/1_3.jpg?v=1586244828',
    ],
  },
  {
    product_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/7_800x.jpg?v=1586244467',
    product_image_placehoder:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/products/7_800x.jpg?v=1586244467',
    product_name: 'Langue Stack Chair',
    product_price: 29.0,
  },
];

export interface IBlog {
  blog_image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

const ourBlog: IBlog[] = [
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/8_540x.jpg?v=1585986872',
    author: 'Mr. John.',
    date: 'May 20, 2020',
    title: 'How to make your home look expensive',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/10_540x.jpg?v=1585986913',
    author: 'Mr. Vela.',
    date: 'Apr 04, 2020',
    title: 'Anteposuerit litterarum formas.',
    description:
      'Diga, Koma and Torus are three kitchen utensils designed for Ommo, a new design-oriented brand introduced at the Ambiente show in February...',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/9_540x.jpg?v=1585986892',
    author: 'Mrs. Hikao.',
    date: 'Mar 16, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/7_540x.jpg?v=1585986856',
    author: 'Mrs. Shi. ',
    date: 'Feb 18, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/5_540x.jpg?v=1585986814',
    author: 'Mr. Dawm. ',
    date: 'July 19, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/4_540x.jpg?v=1585986796',
    author: 'Mr. Bob. ',
    date: 'April 4, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    blog_image:
      '	https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/3_540x.jpg?v=1585986762',
    author: 'Mrs. Hanakoisi. ',
    date: 'Feb 18, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    blog_image:
      'https://cdn.shopify.com/s/files/1/0376/9440/6700/articles/2_540x.jpg?v=1585986704',
    author: 'Mrs. Lee. ',
    date: 'Jan 28, 2020',
    title: 'Diga: three kitchen utensils designed for Ommo',
    description:
      'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
];

const partner: string[] = [
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand1.jpg?v=1613723877',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand2.jpg?v=1613723877',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand3.jpg?v=1613723883',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand4.jpg?v=1613723884',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand5.jpg?v=1613723884',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/brand6.jpg?v=1613723884',
];

const photoSamples: string[] = [
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/10_360x.jpg?v=1629543350',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/9_360x.jpg?v=1629543350',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/7_360x.jpg?v=1613757421',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/3_360x.jpg?v=1629543350',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/4_360x.jpg?v=1629543350',
  'https://cdn.shopify.com/s/files/1/0376/9440/6700/files/2_360x.jpg?v=1629543350',
];

//BLOG

const categories: string[] = [
  'Music',
  'Education',
  'Construction',
  'Travel',
  'Apps',
  'Text',
  'Tech',
  'Social',
  'Uncategorized',
];

const tags: string[] = [
  'Apps',
  'Conference',
  'Developers',
  'Enterprise',
  'Startups',
];

export {
  categories,
  dataSwiper,
  ourBlog,
  partner,
  photoSamples,
  product,
  tags,
};
