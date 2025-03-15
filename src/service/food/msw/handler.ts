import { http, HttpResponse } from 'msw';
import { mockMswFoodItemResponse } from './mock-data';

export const foodMswHandler = [
  // ================================
  /**  1. Mocking json response with status code */
  http.get(`*/food`, ({ request }) => {
    // Note that you DON'T have to stringify the JSON!
    return HttpResponse.json(mockMswFoodItemResponse, { status: 200 });
  }),

  // console.log('request', request);
  // const url = new URL(request.url);
  // const order = url.searchParams.get('order');
  // console.log('order', order);
  // if (order === 'desc') {
  //   return HttpResponse.json(mockMswFoodItemResponse, { status: 200 });
  // } else if (order === 'asc') {
  //   return HttpResponse.json(mockMswFoodItemResponse.reverse(), { status: 200 });
  // }

  // ================================
  /** 2. Mocking errors and error message */
  // http.get(`*/food`, () => {
  //   return HttpResponse.json(null, {
  //     // Mocking status code
  //     status: 403,
  //     statusText: 'Custom Forbidden Message', // this is debatable
  //   });
  // }),
  // ================================
  /** 3. Mocking response headers json reponse */
  // http.get(`*/food`, () => {
  //   /** stringify the json response */
  //   return HttpResponse.json(mockMswFoodItemResponse, {
  //     headers: {
  //       'Set-Cookie': 'mySecret=abc-123',
  //       'X-Custom-Header': 'yes',
  //     },
  //   });
  // }),
];
