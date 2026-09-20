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


async function prepareAndSend(event) {
  // 1. Stop the browser from using the old native page redirection
  if (event) event.preventDefault();

  // 2. Scan the webpage for your selected items
  const selectedElements = document.querySelectorAll('.selected');
  
  if (selectedElements.length === 0) {
    alert("Please select at least one photo before submitting.");
    return;
  }

  let photoListArray = [];

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
      photoListArray.push(decodeURIComponent(nameFound));
    }
  });

  const photoListText = photoListArray.join('\n'); 

  // 3. Use standard FormData structure (fixes network/CORS blocks)
  const formData = new FormData();
  formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // 👈 Make sure your actual key is pasted here
  formData.append("subject", "📸 New Photo Selection Received!");
  formData.append("from_name", "Photo Selector Webpage");
  formData.append("message", photoListText);

  // 4. Send the data silently first
  try {
    const response = await fetch('https://web3forms.com', {
      method: 'POST',
      body: formData // Sending as FormData bypasses strict JSON cross-origin checks
    });

    const result = await response.json();

    if (result.success) {
      // 5. ✨ SUCCESS: Dim the images AFTER the email goes through successfully
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

      // Show the success message on your screen
      alert("🎉 Email sent successfully! Your selections are now marked as sent."); 
    } else {
      alert("❌ Web3Forms error: " + result.message);
    }
  } catch (error) {
    console.error("Network log error:", error);
    alert("❌ Network Error: The browser blocked the background connection. Check your access key or try turning off privacy extensions/adblockers.");
  }
}

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
      deletedPhotosList.push(cleanName); 
    }
  });

  // 1. Package clean filenames for the email delivery
  document.getElementById('hiddenPhotoList').value = photoListArray.join('\n'); 
  
  // 2. ✨ OPTION 1 INTEGRATION: Smart Local vs. Web Redirection Fix
  // This automatically rewrites the redirect URL to match exactly where you are viewing the file
  const redirectInput = document.querySelector('input[name="redirect"]');
  if (redirectInput) {
    const currentUrlBase = window.location.href.split('?')[0];
    redirectInput.value = currentUrlBase + "?status=success";
  }
  
  // 3. Queue selections into temporary browser memory 
  localStorage.setItem('pendingDeletions', JSON.stringify(photoListArray));
}

// Automatically processes dimming and fires alerts when page reloads/returns
function checkUrlAndApplyDimming() {
  const urlParams = new URLSearchParams(window.location.search);
  let savedDeletions = JSON.parse(localStorage.getItem('deletedPhotos')) || [];
  
  // If we just got redirected back from a successful form submission
  if (urlParams.get('status') === 'success') {
    const pending = JSON.parse(localStorage.getItem('pendingDeletions')) || [];
    if (pending.length > 0) {
      savedDeletions = [...new Set([...savedDeletions, ...pending])];
      localStorage.setItem('deletedPhotos', JSON.stringify(savedDeletions));
      localStorage.removeItem('pendingDeletions');
      
      // Clean up the URL bar text beautifully
      window.history.replaceState({}, document.title, window.location.pathname);
      
      alert("🎉 Email sent successfully! Your selections are now marked as deleted.");
    }
  }

  // Force-apply gray and dim visual rules to any matched element
  const allItems = document.querySelectorAll('img, .photo-box'); // Add your custom class if needed
  allItems.forEach(element => {
    let name = "";
    if (element.tagName === 'IMG' && element.src) name = element.src.split('/').pop();
    else if (element.querySelector('img')) name = element.querySelector('img').src.split('/').pop();

    if (savedDeletions.includes(decodeURIComponent(name))) {
      element.classList.remove('selected');
      element.style.setProperty('opacity', '0.2', 'important');
      element.style.setProperty('filter', 'grayscale(100%)', 'important');
      element.style.setProperty('pointer-events', 'none', 'important');
    }
  });
}

// Trigger state layout check on execution
window.addEventListener('DOMContentLoaded', checkUrlAndApplyDimming);

