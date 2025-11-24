import { runBenchmarked } from './benchmarking.js';

async function fetchTopStories() {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=30&orderBy="$key"`;
    return fetchJson(url);
}

async function fetchItem(id) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    return fetchJson(url);
}

async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error('Failed to fetch', url, e.message);
        return null;
    }
}

async function fetchChildren(item, limit = 1) {
    const childIds = Array.isArray(item?.kids) ? item.kids.slice(0, limit) : [];
    return Promise.all(childIds.map(fetchItem));
}

async function fetchStoryWithComments(storyId) {
    const story = await fetchItem(storyId);
    if (!story) return null;

    const [comment] = await fetchChildren(story, 1);
    const comments = [];

    if (comment) {
        const [reply] = await fetchChildren(comment, 1);
        comments.push({
            id: comment.id,
            by: comment.by,
            text: comment.text,
            replies: reply ? [{
                id: reply.id,
                by: reply.by,
                text: reply.text
            }] : []
        });
    }

    return {
        id: story.id,
        title: story.title,
        by: story.by,
        url: story.url,
        score: story.score,
        comments
    };
}

async function scrapeHackerNews() {
    const topStoryIds = await fetchTopStories();
    if (!Array.isArray(topStoryIds)) {
        console.error('Could not retrieve top stories');
        return [];
    }

    const stories = await Promise.all(topStoryIds.slice(0, 30).map(fetchStoryWithComments));
    return stories.filter(Boolean);
}

const stories = await runBenchmarked({
    name: 'hackernews_scraper',
    runs: 2,
    run: scrapeHackerNews
});

console.log(JSON.stringify(stories, null, 2));
