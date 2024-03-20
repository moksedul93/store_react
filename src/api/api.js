// api.js
export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://epicvirtualsolution.com/linkskill/api/frontend.php"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};
