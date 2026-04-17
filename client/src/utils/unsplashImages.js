// Alternative: Use Unsplash for real Nike shoe images
// Sign up at https://unsplash.com/developers for free API key

const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

export async function fetchNikeImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=nike+shoes&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results.map(img => ({
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description
    }));
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return [];
  }
}
