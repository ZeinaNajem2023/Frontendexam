function addToSpecificList() {
    var inputValue = document.getElementById('text').value;
    var radioChecked = document.querySelector('input[name="fruit"]:checked');

    if (inputValue.trim() === '' || !radioChecked) {
        alert('Please enter all the details and choose one of the options');
    } else {
        var listContainer;
        var targetListClass;

        if (radioChecked.value === 'fruit') {
            listContainer = document.querySelector('.listoffruits');
            targetListClass = 'listoffruits';
        } else if (radioChecked.value === 'legume') {
            listContainer = document.querySelector('.listoflegumes');
            targetListClass = 'listoflegumes';
        }

        if (listContainer) {
            addItemToList(listContainer, inputValue, targetListClass, radioChecked);
        }
    }
}

function addToGeneralList() {
    var inputValue = document.getElementById('text').value;
    var radioChecked = document.querySelector('input[name="fruit"]:checked');

    if (inputValue.trim() === '' || !radioChecked) {
        alert('Please enter all the details and choose one of the options');
    } else {
        var listContainer = document.querySelector('.listoffruitslegumes');
        var targetListClass = radioChecked.value === 'fruit' ? 'listoffruits' : 'listoflegumes';

        if (listContainer) {
            addItemToList(listContainer, inputValue, targetListClass, radioChecked);
        }
    }
}

function addItemToList(listContainer, inputValue, targetListClass, radioChecked) {
    var newItem = document.createElement('li');
    newItem.className = 'list-group-item list-group-item-success';
    newItem.textContent = radioChecked.value.charAt(0).toUpperCase() + radioChecked.value.slice(1) + '! - ' + inputValue;
    listContainer.querySelector('ul').appendChild(newItem);

    newItem.addEventListener('click', function () {
        moveListItem(newItem, targetListClass);
    });
}


function searchItems() {
    var inputText = document.getElementById('searchInput').value.toLowerCase();

    if (inputText.trim() === '') {
        alert('Please enter search details');
        return;
    }

    var allListItems = document.querySelectorAll('.listoffruits li, .listoffruitslegumes li, .listoflegumes li');

    allListItems.forEach(function (item) {
        var itemText = item.textContent.toLowerCase();
        var shouldDisplay = itemText.includes(inputText);

        if (shouldDisplay) {
            item.style.backgroundColor = 'rgb(160, 0, 0)';
            item.style.color = 'white';
        } else {
            item.style.backgroundColor = '';
            item.style.color = '';
        }
    });
}

function deleteSelectedItems() {
    var inputText = document.getElementById('searchInput').value.toLowerCase();
    var itemsToDelete = document.querySelectorAll('.listoffruits li, .listoffruitslegumes li, .listoflegumes li');

    itemsToDelete.forEach(function (item) {
        var itemText = item.textContent.toLowerCase();

        if (itemText.includes(inputText)) {
            item.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var listoffruitslegumesUl = document.querySelector('.listoffruitslegumes ul');

    if (listoffruitslegumesUl) {
        listoffruitslegumesUl.addEventListener('click', function (event) {
            var clickedItem = event.target.closest('li');

            if (!clickedItem) {
                return;
            }

            var textContent = clickedItem.textContent.trim();

            if (textContent.startsWith('Fruits')) {
                moveListItem(clickedItem, 'listoffruits');
            } else if (textContent.startsWith('Legumes')) {
                moveListItem(clickedItem, 'listoflegumes');
            }
        });
    }
});

function moveListItem(item, targetListClass) {
    item.remove();

    var targetListContainer = document.querySelector('.' + targetListClass + ' ul');

    if (targetListContainer) {
        var newItem = document.createElement('li');
        newItem.className = 'list-group-item list-group-item-success';
        newItem.textContent = item.textContent;

        targetListContainer.appendChild(newItem);
    }
}

