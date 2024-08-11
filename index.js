const fs = require('fs');
const csv = require('csv-parser');

if (!fs.existsSync('result')) {
    fs.mkdirSync('result'); // Create the 'result' directory if it doesn't exist
}

// Task 1: Read the CSV file and normalize breed names
function extractUniqueBreeds(filePath) {
    const breedsSet = new Set(); // Set to store unique breed names

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const breed = row.Breed.trim().toLowerCase(); // Normalize breed name
                breedsSet.add(breed); // Add to the set
            })
            .on('end', () => {
                const uniqueBreeds = Array.from(breedsSet); // Convert set to array
                resolve(uniqueBreeds); // Resolve the promise with the array of unique breeds
            })
            .on('error', reject); // Reject the promise if an error occurs
    });
}

// Task 2: Count the number of licenses by license type for each unique breed
function countLicensesByType(filePath) {
    const licensesByBreed = {}; // Object to store the count of licenses by breed and type

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const breed = row.Breed.trim().toLowerCase(); // Normalize breed name
                const licenseType = row.LicenseType; // Get the license type

                if (!licensesByBreed[breed]) {
                    licensesByBreed[breed] = {}; // Initialize the object for the breed if it doesn't exist
                }

                if (!licensesByBreed[breed][licenseType]) {
                    licensesByBreed[breed][licenseType] = 0; // Initialize the count for the license type if it doesn't exist
                }

                licensesByBreed[breed][licenseType]++; // Increment the count
            })
            .on('end', () => {
                resolve(licensesByBreed); // Resolve the promise with the licenses data
            })
            .on('error', reject); // Reject the promise if an error occurs
    });
}

// Task 3: Find the top 5 most popular dog names
function findTopDogNames(filePath) {
    const dogNamesCount = {}; // Object to store the count of each dog name

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const dogName = row.DogName.trim().toLowerCase(); // Normalize dog name

                if (!dogNamesCount[dogName]) {
                    dogNamesCount[dogName] = 0; // Initialize the count if it doesn't exist
                }

                dogNamesCount[dogName]++; // Increment the count
            })
            .on('end', () => {
                const sortedNames = Object.entries(dogNamesCount)
                    .sort((a, b) => b[1] - a[1]) // Sort names by count in descending order
                    .slice(0, 5); // Get the top 5 names

                resolve(sortedNames); // Resolve the promise with the top 5 names
            })
            .on('error', reject); // Reject the promise if an error occurs
    });
}

// Bonus: Method to retrieve licenses by date range
function getLicensesByDateRange(filePath, startDate, endDate) {
    const licensesInRange = []; // Array to store licenses within the date range

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const validDate = new Date(row.ValidDate); // Convert the date string to a Date object

                // Check if the date falls within the specified range
                if (validDate >= new Date(startDate) && validDate <= new Date(endDate)) {
                    licensesInRange.push(row); // Add the license to the array
                }
            })
            .on('end', () => {
                resolve(licensesInRange); // Resolve the promise with the licenses in the date range
            })
            .on('error', reject); // Reject the promise if an error occurs
    });
}

// Function calls and result handling
const filePath = '2017.csv'; // Specify the path to your file

extractUniqueBreeds(filePath).then(breeds => {
    fs.writeFileSync('result/uniqueBreeds.json', JSON.stringify(breeds, null, 2)); // Write unique breeds to a JSON file
});

countLicensesByType(filePath).then(licenses => {
    fs.writeFileSync('result/licensesByBreedAndType.json', JSON.stringify(licenses, null, 2)); // Write license counts to a JSON file
});

findTopDogNames(filePath).then(topNames => {
    fs.writeFileSync('result/topDogNames.json', JSON.stringify(topNames, null, 2)); // Write top 5 dog names to a JSON file
});

getLicensesByDateRange(filePath, '2017-01-01', '2017-12-31').then(licenses => {
    fs.writeFileSync('result/licensesInDateRange.json', JSON.stringify(licenses, null, 2)); // Write licenses within the date range to a JSON file
});
