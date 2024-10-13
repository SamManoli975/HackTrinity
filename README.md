Project Overview: Verdict Predict
Team Members
Shaunak
Sam
Seyi
Bohdan
Problem Statement
Lawyers often spend a significant amount of time conducting research to find precedents and relevant case law to support their arguments. Verdict Predict aims to streamline this process, enabling lawyers to compare their arguments to similar past cases quickly. By leveraging advanced AI and API technology, this tool will enhance legal research efficiency and effectiveness.


![image](https://github.com/user-attachments/assets/d3723250-92f7-4a40-b8ff-06be985e497e)

Technical Architecture
1. Front End
Framework: ReactJS
Components:
Search Bar: To input the legal argument or case details.
Case Comparison: A component to display similar cases based on the input.
Summary Section: Shows a concise summary of the case law.
Loading Spinner: Indicates that the app is processing the request.
Error Handling: Displays any errors encountered during the API calls.
![image](https://github.com/user-attachments/assets/9f9594ed-eddb-4443-bc89-7fc3c85d3c35)

3. Back End
API Integration: Perplexity API
Functionality: Utilizes the Perplexity API to retrieve and analyze similar legal cases based on user input.
Data Processing: The API will return data that the front end can display, including summaries, verdicts, and relevant legal points from prior cases.
Implementation Steps
Front End Development
Setting Up React Application: Use Create React App to scaffold the project.

bash
Copy code
npx create-react-app verdict-predict
Creating Components:

SearchBar.js: Input for the user's legal argument.
CaseList.js: Renders a list of similar cases returned from the API.
Summary.js: Displays case summaries.
API Integration:

Create a service (e.g., apiService.js) to handle API calls to the Perplexity API.
Use Axios for making HTTP requests.
State Management: Use React hooks (useState, useEffect) to manage input state and fetched data.

Styling: Use CSS modules or styled-components for better modular styles.

Back End Development
API Key Management: Ensure you have a valid API key for Perplexity.
Data Processing: Implement a function to format the API response into a user-friendly structure.
