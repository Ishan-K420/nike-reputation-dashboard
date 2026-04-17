// Real sentiment data integration options

// OPTION 1: Reddit API (Free, no auth needed)
export async function fetchRedditComments(productName) {
  try {
    const query = encodeURIComponent(`nike ${productName}`);
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${query}&limit=10&sort=new`
    );
    const data = await response.json();
    
    return data.data.children.map(post => ({
      text: post.data.title,
      author: post.data.author,
      score: post.data.score,
      timestamp: new Date(post.data.created_utc * 1000),
      url: `https://reddit.com${post.data.permalink}`
    }));
  } catch (error) {
    console.error('Reddit fetch failed:', error);
    return [];
  }
}

// OPTION 2: Twitter/X API (Requires API key)
// Sign up at: https://developer.twitter.com/
export async function fetchTwitterMentions(productName, apiKey) {
  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=nike%20${productName}&max_results=10`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Twitter fetch failed:', error);
    return [];
  }
}

// OPTION 3: YouTube Comments API
// Get API key from: https://console.cloud.google.com/
export async function fetchYouTubeComments(productName, apiKey) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=nike+${productName}+review&key=${apiKey}&maxResults=5`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('YouTube fetch failed:', error);
    return [];
  }
}

// OPTION 4: News API (Product mentions in news)
// Get free API key from: https://newsapi.org/
export async function fetchNewsArticles(productName, apiKey) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=nike+${productName}&apiKey=${apiKey}&pageSize=10&sortBy=publishedAt`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('News fetch failed:', error);
    return [];
  }
}
