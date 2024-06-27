document.addEventListener('DOMContentLoaded', function() {
  const itemsContainer = document.querySelector('.cart');
  const addItemBt = document.getElementById('add-item-bt');
  let itemCount = document.querySelectorAll('.item').length;

  function updateTotal() {
    const totalPriceElement = document.querySelector('.total-price');
    let totalPrice = 0;
    document.querySelectorAll('.item').forEach(item => {
      const quantity = parseInt(item.querySelector('.quantity-value').textContent);
      const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
      totalPrice += quantity * price;
    });
    totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
  }

  function setupItemEvents(item) {
    const quantityValue = item.querySelector('.quantity-value');
    const incrementBt = item.querySelector('.increment-bt');
    const decrementBt = item.querySelector('.decrement-bt');
    const deleteBt = item.querySelector('.delete-bt');
    const likeBt = item.querySelector('.like-bt');

    incrementBt.addEventListener('click', function() {
      let quantity = parseInt(quantityValue.textContent);
      quantity++;
      quantityValue.textContent = quantity;
      updateTotal();
    });

    decrementBt.addEventListener('click', function() {
      let quantity = parseInt(quantityValue.textContent);
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
        updateTotal();
      }
    });

    deleteBt.addEventListener('click', function() {
      item.remove();
      updateTotal();
    });

    likeBt.addEventListener('click', function() {
      likeBt.classList.toggle('liked');
    });
  }

  document.querySelectorAll('.item').forEach(item => {
    setupItemEvents(item);
  });

  addItemBt.addEventListener('click', function() {
    itemCount++;
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
      <span class="item-name">Item ${itemCount}</span>
      <button class="like-bt"></button>
      <button class="delete-bt">Delete</button>
      <div class="quantity">
        <button class="decrement-bt">-</button>
        <span class="quantity-value">1</span>
        <button class="increment-bt">+</button>
      </div>
      <span class="item-price">$10.00</span>
    `;
    itemsContainer.appendChild(newItem);
    setupItemEvents(newItem);
    updateTotal();
  });
});