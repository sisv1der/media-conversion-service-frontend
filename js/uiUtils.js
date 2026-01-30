const appendListItem = (list, value) => {
    const li = document.createElement('li');
    li.textContent = value;
    list.appendChild(li);
}

export const updateList = (list, items) => {
    clearList(list);

    items.forEach(element => appendListItem(list, element));
}

export const clearList = (list) => {
    while (list.lastChild) {
        list.removeChild(list.lastChild);
    }
}