import { IEvents } from './base/events';
import { cloneTemplate } from '../utils/utils';
import { ICard } from '../types';

export class Card {
	protected element: HTMLElement;
	protected events: IEvents;
	protected likeButton: HTMLButtonElement;
	protected likeCount: HTMLElement;
	protected deleteButton: HTMLButtonElement;
	protected cardImage: HTMLDivElement;
	protected cardTitle: HTMLElement;
	protected cardId: string;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		this.events = events;
		this.element = cloneTemplate(template);

		this.likeButton = this.element.querySelector('.card__like-button');
		this.likeCount = this.element.querySelector('.card__like-count');
		this.deleteButton = this.element.querySelector('.card__delete-button');
		this.cardImage = this.element.querySelector('.card__image');
		this.cardTitle = this.element.querySelector('.card__title');

		this.cardImage.addEventListener('click', () => {
			this.events.emit('card:select', {card: this});
		});

		this.deleteButton.addEventListener('click', () => {
			this.events.emit('card:delete', {card: this});
		});

		this.likeButton.addEventListener('click', () => {
			this.events.emit('card:like', {card: this, isLike: this.isLiked()});
		});
	}

	isLiked() {
		return this.likeButton.classList.contains('card__like-button_is-active');
	}

	setData(cardData: ICard, userId: string) {
		this.cardId = cardData._id;

		const cardIsLiked = cardData?.likes.some((like) => like._id === userId);
		this.likeButton.classList.toggle('card__like-button_is-active', cardIsLiked);

		this.likeCount.textContent = String(cardData.likes.length);

		if (cardData.owner._id !== userId) {
			this.deleteButton.remove();
		}

		this.cardImage.style.backgroundImage = `url(${cardData.link})`;
		this.cardTitle.textContent = cardData.name;
	}

	get id() {
		return this.cardId;
	}

	deleteCard() {
		this.element.remove();
		this.element = null;
	}

	render() {
		return this.element;
	}
}