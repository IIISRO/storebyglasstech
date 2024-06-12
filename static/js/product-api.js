let productSection = document.getElementById('products')
let currentPage=1



function displayResults(results) {
  let products = document.querySelector("#products");
  products.innerHTML = "";
  if(results.products.length>0){
  for (const product of results.products) {
    products.innerHTML += `
      <div class="col-sm-6 col-lg-3">
            <div class="product-item">
              <a href="${product.url}">
                <div class="product-item-img">
                  <img
                  src="${product.image}"
                  alt="">
                  <span class="product-icon1"><i class="fa fa-search"></i></span>
                  <span class="product-icon2"><i class="fa fa-search"></i></span>
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
  createPagination(results.pagination.all_pages_num,currentPage)
}
else{
  products.innerHTML+=`<div class="alert alert-danger">Təəssüf ki,seçdiyiniz filterlərə uyğun məhsul tapılmadı!</div>`
}

}



function updateTypeUI(selectedType) {
  document.querySelectorAll('.type-list li').forEach(typeItem => {
    const typeValue = typeItem.getAttribute('data-value');
    const typeText = typeItem.querySelector('span');
    // console.log(selectedType);
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


async function filterProducts(category, filters,pageNumber) {
  let apiUrl = new URL(`${location.origin}/api/v1/products/${category}/?page=${pageNumber}`);

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
  console.log(newUrl);
  window.history.pushState({ path: newUrl }, '', newUrl);
}


function handleFilterChange() {
  const category = document.querySelector('.categories-list .selected').getAttribute("data-value").trim();

  const filters = {};

  const selectedType = document.querySelector('.type-list li.selected');
  if (selectedType) {
    filters['type'] = selectedType.querySelector('span').textContent.trim();
  }


  const selectedSort = document.querySelector('#filterSelect .selected');
  if (selectedSort!=="") {
    filters['sort'] = selectedSort.getAttribute('data-value').trim();
  }
  const searchQuery = new URLSearchParams(window.location.search).get('search');

  if(searchQuery){
    filters['search'] = searchQuery.trim()
  }
  
  const selectedArtists = Array.from(document.querySelectorAll('.checkbox-artist:checked')).map(checkbox => checkbox.value);
  if (selectedArtists.length > 0) {
    filters['artist'] = selectedArtists;
  }

  filterProducts(category, filters,currentPage);
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



function preselectFiltersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname; // '/products/vveten/'
  console.log(pathname);
  // Split the pathname to get the parts
  const pathParts = pathname.split('/');
  
  // The category name is the second last part in the path array
  const categoryParam = pathParts[pathParts.length - 2]; 
  if (categoryParam) {
    // Remove 'selected' class from all category items
    document.querySelectorAll('.categories-list li a').forEach(item => {
      item.classList.remove('selected');
    });

    // Add 'selected' class to the current category item
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


document.getElementById('filterSelect').addEventListener('change', function() {
  var options = this.options;
  for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
          options[i].classList.add('selected');
          
      } else {
          options[i].classList.remove('selected');
      }
  }
  handleFilterChange()

});


document.addEventListener('DOMContentLoaded', () => {

  preselectFiltersFromURL();
  handleFilterChange();
});


document.querySelectorAll('.checkbox-artist').forEach(checkbox => {
  checkbox.addEventListener('change', handleFilterChange);
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

function createPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const ul = document.createElement('ul');
  ul.className = 'pagination';

  const createPaginationItem = (pageNumber, text, isDisabled) => {
      const li = document.createElement('li');
      li.innerHTML = text;
      li.className = isDisabled ? 'disabled' : (currentPage === pageNumber ? 'active' : '');
      if (!isDisabled) {
          li.addEventListener('click', () => {
              if (currentPage !== pageNumber) {
                  updatePage(pageNumber);
              }
          });
      }
      return li;
  };

  const addItem = (pageNumber, text, isDisabled = false) => ul.appendChild(createPaginationItem(pageNumber, text, isDisabled));

  // Previous Button
  addItem(currentPage - 1, '<i class="fa fa-chevron-left"></i>', currentPage === 1);

  // First Page
  addItem(1, '1', false);

  // Dots before currentPage if necessary
  if (currentPage > 3) {
      ul.appendChild(document.createElement('li')).innerHTML = '...';
  }

  // Pages around currentPage
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      addItem(i, i, false);
  }

  // Dots after currentPage if necessary
  if (currentPage < totalPages - 2) {
      ul.appendChild(document.createElement('li')).innerHTML = '...';
  }

  // Last Page
  if (totalPages > 1) {
      addItem(totalPages, totalPages, false);
  }

  // Next Button
  addItem(currentPage + 1, '<i class="fa fa-chevron-right"></i>', currentPage === totalPages);

  paginationContainer.appendChild(ul);
}

function updatePage(pageNumber) {
  currentPage = pageNumber;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('page', pageNumber);
  const newUrl = `${location.pathname}?${urlParams.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
  handleFilterChange();
}

async function fetchAndDisplayResults(category, filters, pageNumber) {
  let apiUrl = new URL(`${location.origin}/api/v1/products/${category}/?page=${pageNumber}`);

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
  displayResults(responseData);
  createPagination(responseData.pagination.all_pages_num, pageNumber);
}

