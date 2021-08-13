export class ChannelsList {
	constructor() {
		this.parentNode = document.querySelector('.channels-list');
		this.item = document.createElement('div');
		this.name = document.createElement('h4');
		this.button = document.createElement('button');
	}
	create(name) {
		console.log(this);
		this.item.append(this.name);
		this.item.append(this.button);
		this.parentNode.append(this.item);
		this.item.classList.add('channels-list-item');
		this.name.classList.add('channels-list-item_name');
		this.button.classList.add('channels-list-item_delete-button');
		this.name.innerText = name;
		this.button.innerText = '🗑️';
		this.button.addEventListener('click', () => {
			this.item.remove();
		})
	}
}