import './blocks/index.css';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/CardsData';
import { UserData } from './components/UserData';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { testCards, testUser } from './utils/tempConstants';
import { CardsContainer } from './components/CardsContainer';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();

const cardsData = new CardData(events);
const userData = new UserData(events);

const cardTemplate: HTMLTemplateElement = document.querySelector('.card-template');

const cardsContainer = new CardsContainer(document.querySelector('.places__list'));

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

const card1 = new Card(cloneTemplate(cardTemplate), events);
const card2 = new Card(cloneTemplate(cardTemplate), events);
const cardsArray = [];
cardsArray.push(card1.render(testCards[0], testUser._id));
cardsArray.push(card2.render(testCards[1], testUser._id));

cardsContainer.render({catalog: cardsArray});

