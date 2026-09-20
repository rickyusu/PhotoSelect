    // --- EASY PASTE CONFIGURATION ---
    // Just paste your raw list of file names or URLs inside the backticks below.
    // One name per line. No quotes or commas needed!

// This works perfectly no matter the size of rawPhotoList
const rawPhotoListText  = `
B30C_P00002.jpg
B30C_P00006.jpg
B30C_P00007.jpg
B30C_P00010.jpg
B30C_P00011.jpg
B30C_P00013.jpg
B30C_P00014.jpg
B30C_P00015.jpg
B30C_P00017.jpg
B30C_P00018.jpg
B30C_P00019.jpg
B30C_P00021.jpg
B30C_P00022.jpg
B30C_P00023.jpg
B30C_P00024.jpg
B30C_P00025.jpg
B30C_P00027.jpg
B30C_P00029.jpg
B30C_P00030.jpg
B30C_P00031.jpg
B30C_P00032.jpg
B30C_P00033.jpg
B30C_P00034.jpg
B30C_P00035.jpg
B30C_P00036.jpg
B30C_P00037.jpg
B30C_P00038.jpg
B30C_P00039.jpg
B30C_P00040.jpg
B30C_P00041.jpg
B30C_P00042.jpg
B30C_P00044.jpg
B30C_P00046.jpg
B30C_P00048.jpg
B30C_P00049.jpg
B30C_P00050.jpg
B30C_P00051.jpg
B30C_P00052.jpg
B30C_P00053.jpg
B30C_P00054.jpg
B30C_P00055.jpg
B30C_P00057.jpg
B30C_P00058.jpg
B30C_P00059.jpg
B30C_P00060.jpg
B30C_P00062.jpg
B30C_P00064.jpg
B30C_P00065.jpg
B30C_P00066.jpg
B30C_P00068.jpg
B30C_P00070.jpg
B30C_P00071.jpg
B30C_P00072.jpg
B30C_P00073.jpg
B30C_P00074.jpg
B30C_P00075.jpg
B30C_P00076.jpg
B30C_P00077.jpg
B30C_P00078.jpg
B30C_P00079.jpg
B30C_P00081.jpg
B30C_P00083.jpg
B30C_P00084.jpg
B30C_P00085.jpg
B30C_P00087.jpg
B30C_P00088.jpg
B30C_P00089.jpg
B30C_P00092.jpg
B30C_P00093.jpg
B30C_P00095.jpg
B30C_P00096.jpg
B30C_P00098.jpg
B30C_P00104.jpg
B30C_P00105.jpg
B30C_P00106.jpg
B30C_P00107.jpg
B30C_P00108.jpg
B30C_P00109.jpg
B30C_P00110.jpg
B30C_P00112.jpg
B30C_P00113.jpg
B30C_P00114.jpg
B30C_P00115.jpg
B30C_P00116.jpg
B30C_P00118.jpg
B30C_P00119.jpg
B30C_P00120.jpg
B30C_P00121.jpg
B30C_P00122.jpg
B30C_P00123.jpg
B30C_P00124.jpg
B30C_P00125.jpg
B30C_P00127.jpg
B30C_P00128.jpg
B30C_P00129.jpg
B30C_P00130.jpg
B30C_P00132.jpg
B30C_P00134.jpg
B30C_P00135.jpg
B30C_P00139.jpg
B30C_P00140.jpg
B30C_P00141.jpg
B30C_P00142.jpg
B30C_P00145.jpg
B30C_P00146.jpg
B30C_P00147.jpg
B30C_P00148.jpg
B30C_P00149.jpg
B30C_P00150.jpg
B30C_P00152.jpg
B30C_P00153.jpg
B30C_P00156.jpg
B30C_P00157.jpg
B30C_P00158.jpg
B30C_P00160.jpg
B30C_P00161.jpg
B30C_P00162.jpg
B30C_P00163.jpg
B30C_P00164.jpg
B30C_P00165.jpg
B30C_P00166.jpg
B30C_P00169.jpg
B30C_P00171.jpg
B30C_P00172.jpg
B30C_P00174.jpg
B30C_P00175.jpg
B30C_P00176.jpg
B30C_P00177.jpg
B30C_P00178.jpg
B30C_P00179.jpg

    `;



// 1. Function to extract the 100 photos for the current pageconst pCloudFolderBaseUrl = "https://filedn.com/lTh0v2Bogc301OgoFen42cL/ToDelete/"; 


// 1. KEEP YOUR ORIGINAL SETUPS
const pCloudFolderBaseUrl = "https://filedn.com/lTh0v2Bogc301OgoFen42cL/ToDelete/"; 
const selectedPhotos = new Set(); // Keeps track of selections across pages

// 2. TURN YOUR TEXT LIST INTO THE WORKING ARRAY
const rawPhotoList = rawPhotoListText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

// 3. ADD THE NEW PAGINATION STATE Variables
let currentPage = 1;
const photosPerPage = 50;
const totalPages = Math.ceil(rawPhotoList.length / photosPerPage);

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
  displayPhotos(); // Re-render the grid with the new 100 photos
  window.scrollTo(0, 0); // Optional: Scroll back to top of the page
}

// Initial load on page opening// Replace your old "displayPhotos();" line at the bottom with this:
window.onload = function() {
  displayPhotos();
};

// -----------------

function prepareAndMarkDeleted() {
  const selectedElements = document.querySelectorAll('.selected');
  
  if (selectedElements.length === 0) {
    alert("Please select at least one photo before submitting.");
    return;
  }

  let photoListArray = [];
  let deletedPhotosList = JSON.parse(localStorage.getItem('deletedPhotos')) || [];

  selectedElements.forEach((element) => {
    let nameFound = "";

    if (element.tagName === 'IMG' && element.src) {
      nameFound = element.src.split('/').pop();
    } 
    else if (element.querySelector('img')) {
      const innerImg = element.querySelector('img');
      nameFound = innerImg.src.split('/').pop();
    } 
    else if (element.innerText) {
      nameFound = element.innerText.trim();
    }

    if (nameFound) {
      const cleanName = decodeURIComponent(nameFound);
      photoListArray.push(cleanName); 
      
      if (!deletedPhotosList.includes(cleanName.toLowerCase())) {
        deletedPhotosList.push(cleanName.toLowerCase());
      }
    }
  });

  const photoListText = photoListArray.join('\n'); 

  // 📋 1. COPY TO CLIPBOARD CODE (Runs on both Mobile and Computer)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(photoListText)
      .then(() => console.log("List copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  }

  // 📱 SMART MOBILE DETECTION
  // Checks if the user is on an iPhone, iPad, Android phone, or mobile browser
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile Flow: Alert shows clipboard confirmation, then opens text message
    alert("You have selected the following photos:\n\n" + photoListText + "\n\nList copied to clipboard! Opening text message...");

    // Replace +1234567890 with your actual phone number (include country code)
    const myPhoneNumber = "+19496482361"; 
    const smsBody = encodeURIComponent("Here are my selected photos:\n" + photoListText);
    
    // Open native messaging app
    window.location.href = `sms:${myPhoneNumber}?&body=${smsBody}`;
  } else {
    // Computer Flow: Alert confirms clipboard copy, completely skipping the phone app prompt!
    alert("You have selected the following photos:\n\n" + photoListText + "\n\n📋 List copied to your clipboard! You can now paste (Ctrl+V) it anywhere.");
  }

  // Package names for Web3Forms email delivery
  document.getElementById('hiddenPhotoList').value = photoListText; 
  
  // Commit to browser local storage memory immediately
  localStorage.setItem('deletedPhotos', JSON.stringify(deletedPhotosList));

  // Force visual grayscale dimming on screen instantly
  selectedElements.forEach((element) => {
    element.classList.remove('selected');
    
    element.style.setProperty('opacity', '0.2', 'important');
    element.style.setProperty('filter', 'grayscale(100%)', 'important');
    element.style.setProperty('pointer-events', 'none', 'important');

    const internalImg = element.tagName === 'IMG' ? element : element.querySelector('img');
    if (internalImg) {
      internalImg.style.setProperty('opacity', '0.2', 'important');
      internalImg.style.setProperty('filter', 'grayscale(100%)', 'important');
    }
  });


  // 🛠️ SMART ENVIRONMENT CHECK:
  // 1. Calculate how long to wait based on the device
const waitTime = isMobile ? 800 : 50;

  if (window.location.protocol.startsWith('http')) {
    alert("Internet Test Mode: Selection list saved and images grayed out successfully!");
    // Wait slightly for the SMS app redirection handoff before completing the email form submit
    setTimeout(() => {
      // Delay sending email
      // document.getElementById('realSubmitBtn').click();
    }, waitTime);
  } else {
    // If testing locally (file:///), skip the live submit so the browser doesn't crash
    alert("💻 Local Test Mode: Selection list saved, copied, and images grayed out successfully!");
  }
}



function resetPageMemory() {
  if (confirm("Are you sure you want to restore all photos and clear your selection history?")) {
    localStorage.removeItem('deletedPhotos');
    window.location.reload();
  }
}

window.addEventListener('DOMContentLoaded', applyDimmingEffects);


function submitSelectedPhotos() {
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
    
    // Example: If you have a text area to show the final list:
    // document.getElementById('outputTextArea').value = outputText;
}
