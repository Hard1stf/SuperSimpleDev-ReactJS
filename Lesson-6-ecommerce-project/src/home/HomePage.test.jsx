/**
 * Test suite for the HomePage component.
 * 
 * This suite includes tests for:
 * - Displaying products correctly by mocking API calls and verifying product containers and names.
 * - Adding products to the cart by simulating user clicks on "Add to Cart" buttons,
 *   verifying API calls to add items, and ensuring the loadCart function is called.
 * 
 * Uses Vitest for testing, @testing-library/react for rendering and interactions,
 * and mocks axios for API calls.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePages';
import axios from 'axios';

vi.mock('axios');

describe('HomePage Component', () => {
  let loadCart;
  let user; // initialize the user. 

  beforeEach(() => {
    loadCart = vi.fn();

    user = userEvent.setup(); // define user to make it global and make it an event.

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return {
          data: [
            {
              id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
              name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ['socks', 'sports', 'apparel'],
            },
            {
              id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              image: 'images/products/intermediate-composite-basketball.jpg',
              name: 'Intermediate Size Basketball',
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ['sports', 'basketballs'],
            },
          ]
        };
      }
    });
  });

  // create new test.
  it('displays the products correct', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    ); // render the HomePage component within the temporary Router to simulate the real Router. 

    // Load all the product containers, this will be an array.
    const productContainers = await screen.findAllByTestId('product-container');

    // test the initial two product containers length on the HomePage.
    expect(productContainers.length).toBe(2);

    // access and test each product's name.
    expect(
        within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();
    expect(
        within(productContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
    
  });

  it('add a product to the cart', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId('product-container');
    
    // Load quantity selector in the product container [0], and trigger user event with value 2.
    const quantitySelector1 = within(productContainers[0]).getByTestId('product-quantity-selector');
    await user.selectOptions(quantitySelector1, '2')
    
    const addToCartButton1 = within(productContainers[0]).getByTestId('add-to-cart-btn');
    await user.click(addToCartButton1); // click first add to card button.
    
    // Load quantity selector in the product container [1], and trigger user event with value 3.
    const quantitySelector2 = within(productContainers[1]).getByTestId('product-quantity-selector');
    await user.selectOptions(quantitySelector2, '3')

    const addToCartButton2 = within(productContainers[1]).getByTestId('add-to-cart-btn');
    await user.click(addToCartButton2); // click second add to card button.

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    }); // 

    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 3,
    });

    // Test if the Load Cart function runs twice.
    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
