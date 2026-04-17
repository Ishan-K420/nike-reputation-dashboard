// Real Nike product image URLs
export const PRODUCT_IMAGES = {
  'Air Force 1': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-jBrhbr.png',
  'Air Max 90': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-mens-shoes-6n0r2D.png',
  'Pegasus 40': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/pegasus-40-mens-road-running-shoes-wide-mr5jDn.png',
  'Jordan 1 Retro': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c5e4052-b431-4d9e-a238-6d6b5e36e9c3/air-jordan-1-retro-high-og-mens-shoes-Pz6fZ9.png',
  'Dunk Low': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-mens-shoes-t9dFhS.png',
  'Air Max 97': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-97-mens-shoes-VjCJLN.png',
  'Air Max 270': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/awjogtdnqxniqqk0wpgf/air-max-270-mens-shoes-KkLcGR.png',
  'Jordan 4 Retro': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3396f1a3-b9d4-4f1e-8b1e-8e1e8e1e8e1e/air-jordan-4-retro-mens-shoes-1e1e1e.png',
  'Blazer Mid 77': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/05856ac7-0129-4395-bd6e-2fe2669025fb/blazer-mid-77-vintage-mens-shoes-nw30B2.png',
  'Vaporfly 3': 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/zoomx-vaporfly-next-3-mens-road-racing-shoes-glLMZF.png',
};

export function getProductImage(productName) {
  if (PRODUCT_IMAGES[productName]) return PRODUCT_IMAGES[productName];
  for (const [key, url] of Object.entries(PRODUCT_IMAGES)) {
    if (productName.includes(key) || key.includes(productName)) return url;
  }
  return `https://via.placeholder.com/400x400/000000/FFFFFF?text=${encodeURIComponent(productName)}`;
}
