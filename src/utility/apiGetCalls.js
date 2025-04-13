export async function getEvents() {
  try {
    const response = await fetch("https://localhost:7262/api/Events");

    if (!response.ok) {
      console.error(`Error: ${response.statusText} (${response.status})`);
      return null;
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
}

export async function getOrgs() {
  try {
    const response = await fetch("https://localhost:7262/api/Organizations");

    if (!response.ok) {
      console.error(`Error: ${response.statusText} (${response.status})`);
      return null;
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error fetching orgs:", error);
    return null;
  }
}

export async function getNews() {
  try {
    const response = await fetch("https://localhost:7262/api/News");

    if (!response.ok) {
      console.error(`Error: ${response.statusText} (${response.status})`);
      return null;
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}
