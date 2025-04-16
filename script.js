const searchInput = document.getElementById('search');
const searchButton = document.getElementById('btn');
const imageContainer = document.querySelector('.image');

const apiKey = 'NUKb2_jh__jY0dGUMlda0q7tfOD8bw3phe9BJRTV_qo';

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      
        console.log('Enter key pressed');
        search(searchInput.value.trim());
    }
});

searchButton.addEventListener("click", () => {
   
    console.log('Search button clicked');
    search(searchInput.value.trim());
});


async function search(query) {
    if (!query) {
        alert('Please enter a search term');
        return;
    }

    try {
        console.log("Fetching images for query:", query);

        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=10`);

        const data = await response.json();

        console.log("API response data:", data);

        imageContainer.innerHTML = "";

        document.body.style.height="";

        if (data.results.length !==0) {
            
            data.results.map(item => {
                let img = document.createElement('img');
                img.id = "image";
                img.src = item.urls.full; 
                img.alt = item.alt_description || 'Image';
                img.style.width = "250px";
                img.style.height = "250px";
                let imgLink = document.createElement('a');
                imgLink.href = item.links.html;
                imgLink.target = "_blank"; 

                imgLink.appendChild(img);

                imageContainer.appendChild(imgLink);
            });
        } else {
            let p = document.createElement('p');
            p.innerText = `No images found for "${query}"`;
            imageContainer.appendChild(p);
            console.log("No results found");
        }
    } catch (err) {
        console.error("Error fetching data:");
        alert('Something went wrong. Please check the console for details.');
    }
}
