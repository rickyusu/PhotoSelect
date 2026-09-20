    // --- EASY PASTE CONFIGURATION ---
    // Just paste your raw list of file names or URLs inside the backticks below.
    // One name per line. No quotes or commas needed!
    const rawPhotoList = `
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
    // --------------------------------

    // Base URL path to your pCloud folder (e.g., your pCloud Public folder link)
    // Example: "https://pcloud.link..."
    const pCloudFolderBaseUrl = "https://filedn.com/lTh0v2Bogc301OgoFen42cL/ToDelete/"; 

    const grid = document.getElementById('photoGrid');
    const selectedPhotos = new Set();

    // Clean up the text list and turn it into a working array
    const photoLines = rawPhotoList.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    photoLines.forEach((fileName, index) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.dataset.name = fileName;

        const img = document.createElement('img');
        
        // If your list contains full links, use them directly. Otherwise, combine with base URL.
        if (fileName.startsWith('http://') || fileName.startsWith('https://')) {
            img.src = fileName;
        } else {
            // Adjust this joining logic depending on how your pCloud links look
            img.src = pCloudFolderBaseUrl + fileName; 
        }
        
        img.loading = "lazy";

        const label = document.createElement('div');
        label.className = 'photo-label';
        label.innerText = fileName;

        card.appendChild(img);
        card.appendChild(label);

        card.addEventListener('click', () => {
            if (selectedPhotos.has(fileName)) {
                selectedPhotos.delete(fileName);
                card.classList.remove('selected');
            } else {
                selectedPhotos.add(fileName);
                card.classList.add('selected');
            }
        });

        grid.appendChild(card);
    });

    function generateList() {
        if (selectedPhotos.size === 0) {
            alert("Please select at least one photo to delete!");
            return;
        }
        const sortedArray = Array.from(selectedPhotos).sort();
        const textarea = document.getElementById('listText');
        textarea.value = `Please delete these photos:\n\n${sortedArray.join('\n')}`;
        document.getElementById('resultModal').style.display = 'flex';
    }

    // (Keep the same copyAndClose function from before)
    function copyAndClose() {
        const textarea = document.getElementById('listText');
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(textarea.value);
        alert("List copied to clipboard!");
        document.getElementById('resultModal').style.display = 'none';
    }



async function sendListToEmail() {
  alert("1. Button connection is working!");

  // Step A: Safely check if the photo list variable exists
  let photosArray = [];
  
  try {
    // If you use a different variable name, change 'selectedPhotos' below to match it
    if (typeof selectedPhotos !== 'undefined') {
      photosArray = selectedPhotos;
    } else {
      alert("❌ Error: The variable 'selectedPhotos' does not exist in your code. We need to find out what your photo list is named.");
      return;
    }
  } catch (e) {
    alert("❌ Error reading variables: " + e.message);
    return;
  }

  // Step B: Check if any photos are actually selected
  if (!photosArray || photosArray.length === 0) {
    alert("⚠️ The list is empty! Please select some photos first before submitting.");
    return;
  }

  alert("2. Found " + photosArray.length + " selected photos. Sending email now...");

  // Step C: Format and send the data
  const photoList = Array.isArray(photosArray) ? photosArray.join('\n- ') : photosArray; 

  const formData = {
    access_key: "3dda0e4c-6471-46d2-81b4-37a9fc909736", // 👈 Double check that your key is pasted here
    subject: "📸 New Photo Selection Received!",
    from_name: "Photo Selector Webpage",
    message: "A user has selected the following photos:\n\n- " + photoList
  };

  try {
    const response = await fetch('https://web3forms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert("🎉 Success! The list has reached your email inbox."); 
    } else {
      alert("❌ Web3Forms rejected it: " + result.message); 
    }
  } catch (error) {
    alert("❌ Network Error: Could not connect to the email server.");
  }
}

// -----------------


function prepareAndMarkDeleted(event) {
  // 1. Stop the browser from instantly breaking/reloading
  if (event) {
    event.preventDefault();
  }

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

  // 📸 Pop up your custom selection list message box
  alert("You have selected the following photos:\n\n" + photoListText + "\n\nProcessing selection...");

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
  // If we are on the live web (http/https), send the email!
  if (window.location.protocol.startsWith('http')) {
    alert("Internet Test Mode: Selection list saved and images grayed out successfully!");
    // document.getElementById('photoForm').submit();
  } else {
    // If testing locally (file:///), skip the live submit so the browser doesn't crash
    alert("💻 Local Test Mode: Selection list saved and images grayed out successfully! (Email submission skipped until pushed to GitHub)");
  }
}


function resetPageMemory() {
  if (confirm("Are you sure you want to restore all photos and clear your selection history?")) {
    localStorage.removeItem('deletedPhotos');
    window.location.reload();
  }
}

window.addEventListener('DOMContentLoaded', applyDimmingEffects);
