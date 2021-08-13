export function addChannelToList(channelName) {
	const root = document.querySelector('.channels-list');
	const listItemDiv = document.createElement('div');
	const listItemName = document.createElement('h4');
	const listItemDelBtn = document.createElement('button');
	listItemDiv.append(listItemName);
	listItemDiv.append(listItemDelBtn);
	listItemDiv.classList.add('channels-list-item');
	listItemName.classList.add('channels-list-item_name');
	listItemDelBtn.classList.add('channels-list-item_delete-button');
	listItemName.innerText = channelName;
	listItemDelBtn.innerText = '🗑️';
	root.prepend(listItemDiv);
	listItemDelBtn.addEventListener('click', function () {
		this.parentNode.remove();
	}
	)
}
