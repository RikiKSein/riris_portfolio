const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_USERNAME = 'RikiKSein'; // Your GitHub username

export const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }
    
    const projects = await response.json();
    
    // Filter and transform the projects
    return projects
      .filter(project => !project.fork) // Exclude forked repositories
      .map(project => ({
        id: project.id,
        title: project.name,
        description: project.description || '',
        url: project.html_url,
        homepage: project.homepage,
        language: project.language,
        stars: project.stargazers_count,
        forks: project.forks_count,
        topics: project.topics || [],
        createdAt: new Date(project.created_at).toLocaleDateString(),
        updatedAt: new Date(project.updated_at).toLocaleDateString(),
      }))
      .sort((a, b) => b.stars - a.stars); // Sort by stars
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};

export const fetchProjectDetails = async (repoName) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch project details');
    }
    
    const project = await response.json();
    
    // Fetch languages
    const languagesResponse = await fetch(project.languages_url);
    const languages = await languagesResponse.json();
    
    // Fetch readme content
    const readmeResponse = await fetch(`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/readme`);
    const readmeData = await readmeResponse.json();
    const readmeContent = atob(readmeData.content);
    
    return {
      ...project,
      languages,
      readme: readmeContent,
    };
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
}; 