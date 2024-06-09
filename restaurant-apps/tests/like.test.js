import * as TestFactory from './helper/test-factory.js';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb.js';

describe('Liking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    it('should show the like button when the restaurant has not been liked before', async () => {
        await TestFactory.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="like this restaurant"]'))
            .toBeTruthy();
    });

    it('should not show the unlike button when the restaurant has not been liked before', async () => {
        await TestFactory.createLikeButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
            .toBeFalsy();
    });

    it('should be able to like the restaurant', async () => {
        await TestFactory.createLikeButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
        expect(restaurant).toEqual({ id: 1 });

        FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('should not add a restaurant again when its already liked', async () => {
        await TestFactory.createLikeButtonPresenterWithRestaurant({ id: 1 });

        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

        FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('should not add a restaurant when it has no id', async () => {
        await TestFactory.createLikeButtonPresenterWithRestaurant({});

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});
