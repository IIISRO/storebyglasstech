let productSection = document.getElementById('products')



function displayResults(results) {
  console.log(results.products);
  let products = document.querySelector("#products");
  products.innerHTML = "";
  for (const product of results.products) {
    products.innerHTML += `
      <div class="col-sm-6 col-lg-3">
            <div class="product-item">
              <a href="">
                <div class="product-item-img">
                  <img
                  src="${product.image}"
                  alt="">
                </div>
                </a>
                <div class="product-col-info p-2">
                  
                  <h3 class="product-item-title mt-2"><a href="">${product.title}</a></h3>
                  <div class="product-item-price-section">
                    <div class="product-item-price d-flex align-items-center">
                    ${(function Items() {
        let items = []

        if (product.has_discount) {
          items.push(`
                        ${(function Items2() {
              let items2 = []
              if (product.discount_type == 'Precent') {
                items2.push(`<div class="stage"><a href="">${product.discount_amount}%</a></div>`)
              }
              else {
                items2.push(`<div class="stage"><a href="">${product.discount_amount}$</a></div>`)
              }
              return items2.join('')
            })()}
                        
                     <div class="d-flex flex-column">
                      <del>${product.price}$</del>
                      <span>${product.actual_price}$</span>
                     </div>
                    </div>
                        `)
        }
        else {
          items.push(` <span>${product.price}$</span>`)
        }
        return items.join('')
      }
      )()
      }
                     
                  </div>
                </div>
             
            </div>
          </div>
      `
  }



}



function updateTypeUI(selectedType) {
  document.querySelectorAll('.type-list li').forEach(typeItem => {
    const typeValue = typeItem.getAttribute('data-value');
    const typeText = typeItem.querySelector('span');
    console.log(selectedType);
    if (selectedType != undefined) {
      console.log("Aaaaa");
      if (typeValue === selectedType) {
        typeItem.classList.add('col-10', 'bg-light');
        typeItem.classList.remove('col-6');
        typeText.classList.remove('d-none');
      } else {
        typeItem.classList.add('col-2');
        typeItem.classList.remove('col-6', 'col-10', 'bg-light');
        typeText.classList.add('d-none');
      }
    }
  });
}


async function filterProducts(category, filters) {
  let apiUrl = new URL(`${location.origin}/api/v1/products/${category}/?`);

  for (let key in filters) {
    if (Array.isArray(filters[key])) {
      apiUrl.searchParams.append(key, filters[key].join(','));
    } else if (filters[key]) {
      apiUrl.searchParams.append(key, filters[key]);
    }
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  let responseData = await response.json();
  console.log(responseData);
  displayResults(responseData);

  const newUrl = `${location.origin}/products/${category}/${apiUrl.search}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}



function handleFilterChange() {
  const category = document.querySelector('.categories-list .selected').textContent.trim();

  const filters = {};

  const selectedType = document.querySelector('.type-list li.selected');
  if (selectedType) {
    filters['type'] = selectedType.querySelector('span').textContent.trim();
  }

  const selectedArtists = Array.from(document.querySelectorAll('.checkbox-artist:checked')).map(checkbox => checkbox.value);
  if (selectedArtists.length > 0) {
    filters['artist'] = selectedArtists;
  }

  filterProducts(category, filters);
  updateTypeUI(filters['type']);
}



document.querySelectorAll('.categories-list li a').forEach(categoryItem => {
  categoryItem.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.categories-list li a').forEach(item => {
      item.classList.remove('selected');
    });
    categoryItem.classList.add('selected');
    handleFilterChange();
  });
});



document.querySelectorAll('.type-list li').forEach(typeItem => {
  typeItem.addEventListener('click', () => {
    document.querySelectorAll('.type-list li').forEach(item => {
      item.classList.remove('selected');
    });
    typeItem.classList.add('selected');
    handleFilterChange();
  });
});



function preselectFiltersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const categoryItem = document.querySelector(`.categories-list li a[data-value="${categoryParam}"]`);
    if (categoryItem) {
      categoryItem.classList.add('selected');
    }
  }

  const typeParam = urlParams.get('type');
  if (typeParam) {
    // Preselect type
    const typeItem = document.querySelector(`.type-list li[data-value="${typeParam}"]`);
    if (typeItem) {
      typeItem.classList.add('selected');
    }
    updateTypeUI(typeParam);
  } else {
    // Reset type UI if no typeParam
    updateTypeUI(null);
  }

  const artistParams = urlParams.getAll('artist');
  artistParams.forEach(artistParam => {
    const artistCheckbox = document.querySelector(`.checkbox-artist[value="${artistParam}"]`);
    if (artistCheckbox) {
      artistCheckbox.checked = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  preselectFiltersFromURL();
  handleFilterChange();
});


document.querySelectorAll('.checkbox-artist').forEach(checkbox => {
  checkbox.addEventListener('change', handleFilterChange);
});



function preselectFiltersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  if (categoryParam) {
    const categoryItem = document.querySelector(`.categories-list li a[data-value="${categoryParam}"]`);
    if (categoryItem) {
      categoryItem.classList.add('selected');
    }
  }

  const typeParam = urlParams.get('type');
  if (typeParam) {
    const typeItem = document.querySelector(`.type-list li[data-value="${typeParam}"]`);
    if (typeItem) {
      typeItem.classList.add('selected');
    }
  }

  const artistParams = urlParams.get('artist');
  if (artistParams) {
    const artists = artistParams.split(',');
    artists.forEach(artistParam => {
      const artistCheckbox = document.querySelector(`.checkbox-artist[value="${artistParam}"]`);
      if (artistCheckbox) {
        artistCheckbox.checked = true;
      }
    });
  }
}



document.addEventListener('DOMContentLoaded', () => {
  preselectFiltersFromURL();
  handleFilterChange();
});