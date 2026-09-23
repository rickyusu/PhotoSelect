    // --- EASY PASTE CONFIGURATION ---
    // Just paste your raw list of file names or URLs inside the backticks below.
    // One name per line. No quotes or commas needed!

// 1. Function to extract the 100 photos for the current pageconst pCloudFolderBaseUrl = "https://filedn.com/lTh0v2Bogc301OgoFen42cL/ToDelete/"; 


// 1. KEEP YOUR ORIGINAL SETUPS
const pCloudFolderBaseUrl = "https://filedn.com/lTh0v2Bogc301OgoFen42cL/ToDelete/"; 
const selectedPhotos = new Set(); // Keeps track of selections across pages
const WebMAIL_access_key = "3dda0e4c-6471-46d2-81b4-37a9fc909736";        // 1. UPDATE YOUR ADMIN EMAIL HERE

// 2. TURN YOUR TEXT LIST INTO THE WORKING ARRAY
let rawPhotoList = [];

// 3. ADD THE NEW PAGINATION STATE Variables
let currentPage = 1;
const photosPerPage = 100;
let totalPages = 1;

// rawPhotoListText
async function initPhotoFiles() {
    try {
        // Fetch your text file with a cache-buster
        const response = await fetch('https://rickyusu.github.io/PhotoSelect/photolist.txt');
        if (!response.ok) throw new Error("Could not find or read photolist.txt");
        
        const textData = await response.text();
        // 2. Assign the cleaned list directly to your global variable
        rawPhotoList = textData.split('\n')
                                    .map(line => line.trim())
                                    .filter(line => line.length > 0);

                if (rawPhotoList.length === 0) {
                    alert("Your videolist.txt file is empty. Please add filenames to it");
                    return;
                }
        //console.log("Global list successfully loaded!", rawPhotoList);
        // Call your UI building functions here, now that the global variable is filled
        // buildVideoUI(); 
        totalPages = Math.ceil(rawPhotoList.length / photosPerPage);
    } catch (err) {
        console.error("Error loading file:", err.message);
    }
  displayPhotos();
}


// 4. COMBINE WRAPPED INSIDE THE NEW FUNCTION
function displayPhotos() {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = ''; // Clear out the old 100 photos before loading new ones

    // Calculate the 100 items for this specific page
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const currentPhotos = rawPhotoList.slice(startIndex, endIndex);

    // Run YOUR ORIGINAL loop logic, but only on the 100 'currentPhotos'  
    currentPhotos.forEach((fileName) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.dataset.name = fileName;

        if (selectedPhotos.has(fileName)) {
            card.classList.add('selected'); 
        }

        // 1. Your original image creation
        const img = document.createElement('img');
        img.src = pCloudFolderBaseUrl + fileName;

        // 2. ADD THESE LINES: Create a text element for the filename
        const label = document.createElement('div');
        label.className = 'photo-label'; // You can style this in CSS later
        label.innerText = fileName;       // This puts the file name text inside it

        // Your click listeners stay the same...
        card.addEventListener('click', () => {
            if (selectedPhotos.has(fileName)) {
                selectedPhotos.delete(fileName);
                card.classList.remove('selected');
            } else {
                selectedPhotos.add(fileName);
                card.classList.add('selected');
            }
        });

        // 3. Append BOTH the image and the label to the card
        card.appendChild(img);
        card.appendChild(label); // Adds the text right under or over the photo
        
        grid.appendChild(card);
    });

    // Update your page buttons text & disabled states
    document.getElementById('pageIndicator').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = (currentPage === 1);
    document.getElementById('nextBtn').disabled = (currentPage === totalPages);
}


// 4. Function called when Next or Prev buttons are clicked
function changePage(direction) {
  currentPage += direction;
  updatePageVisuals();
  displayPhotos(); // Re-render the grid with the new 100 photos
  window.scrollTo(0, 0); // Optional: Scroll back to top of the page

  // updatePageVisuals();
}

// Initial load on page opening// Replace your old "displayPhotos();" line at the bottom with this:
window.onload = function() {
  initPhotoFiles();
  // displayPhotos();
};

// -----------------


function resetPageMemory() {
  if (confirm("Are you sure you want to restore all photos and clear your selection history?")) {
    localStorage.removeItem('selectedPhotos');
    selectedPhotos.clear();
    window.location.reload();
  }
}


// OK: submitAllSelectedPhotos()
function submitAllSelectedPhotos() {
  
    // 1. Convert the Set into a clean array of strings
    const allSelectedFiles = Array.from(selectedPhotos);

    // 2. Safety check: Check if they selected anything at all
    if (allSelectedFiles.length === 0) {
        alert("Please select at least one photo before submitting.");
        return;
    }

    // 3. Process the entire list (Example: Log it or pass it to your backend)
    console.log("Submitting all selected files across all pages:", allSelectedFiles);

    // ---- YOUR ACTUAL SUBMISSION LOGIC HERE ----
    // If you are formatting the text to copy/paste, you can do this:
    const outputText = allSelectedFiles.join('\n');
    
    // text out
    alert("ALL: Selected photos:\n\n" + outputText + "\n\nList copied to clipboard!");
    // Package names for Web3Forms email delivery
    document.getElementById('hiddenAllPhotoList').value = outputText; 

      
    // 🛠️ SMART ENVIRONMENT CHECK:
    if (window.location.protocol.startsWith('http')) {
      alert("Internet Test Mode: Selection list saved and will sent out by email!");
      // Delay sending email
      document.getElementById('realSubmitAllBtn').click();
    } else {
      // If testing locally (file:///), skip the live submit so the browser doesn't crash
      alert("💻 Local Test Mode: Selection list saved, copied successfully!");
    }

}

// Run this immediately after the new page cards are added to the DOM
function updatePageVisuals() {
    // 1. Find all photo cards currently visible on the screen
    const visibleCards = document.querySelectorAll('photo-card'); // Use your actual class name here
        
    visibleCards.forEach(card => {
        const fileName = card.dataset.filename; 

        // 1. Check selection state
        if (selectedPhotos.has(fileName)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}




        // End of file