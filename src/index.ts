import './blocks/index.css';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { testUser } from './utils/tempConstants';

const events = new EventEmitter();

const cardsData = new CardData(events);
const userData = new UserData(events);

const cardTemplate: HTMLTemplateElement = document.querySelector('.card-template');

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

Promise.all([api.getUser(), api.getCards()])
	.then(([userInfo, cards]) => {
		console.log(userInfo);
		console.log(cards);
	})
	.catch((err) => {
		console.log(err);
	})

const testSection = document.querySelector('.places');

const card = new Card(cardTemplate, events);
testSection.append(card.render({name: "alex"}, 'dbfe53c3c4d568240378b0c6'))
card.render({owner: testUser}, 'dbfe53c3c4d568240378b0c6');



events.onAll((event) => {
	console.log(event.eventName, event.data);
})