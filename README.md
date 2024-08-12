# CSV File Test Project

## Project Description

This project was developed to automate the processing of large datasets often used in QA. The main goal of the project is to analyze data, normalize text, calculate statistics, and find the most popular dog names. The project also includes additional functionality for filtering licenses by date range.

## Functionality

The project includes the following features:

1. **Dog Breed Normalization**:
   - Read the CSV file and extract the provided dog breeds.
   - Normalize the breed names by removing all whitespace and converting them to lowercase.
   - Create a list of unique breeds without duplicates.

2. **License Type Analysis**:
   - Calculate the number of licenses by LicenseType for each unique breed.

3. **Popular Dog Names Search**:
   - Identify the top 5 most popular dog names.
   - Create a list of these names along with the count of dogs having those names.

4. **Bonus Functionality**:
   - A method to filter licenses by date range.

## How to Use

1. **Clone the Repository**:
   - Use the command `git clone https://github.com/Andrii-Podunai/csvFileTest.git` to clone the repository to your local machine.

2. **Install Dependencies**:
   - Ensure that Node.js is installed on your machine.
   - Run the command `npm install` to install all necessary dependencies.

3. **Run the Scripts**:
   - Use the command `node index.js` to run the main script, which will perform the CSV file analysis and display the results.

4. **Filter Licenses by Date**:
   - The date filtering method can be used within the script by providing the required date range in the format `YYYY-MM-DD`.

The project includes comments for each method that explain the logic and purpose of the code.

## Requirements

- Node.js version 14 or higher.
- The `2017.csv` file placed in the root folder of the project.
