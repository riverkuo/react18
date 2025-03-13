# TODO-river
5. unit test
6. msw pros and cons

## Guide
This is a guide for how to use mock-data in a react project.

## Getting Started

First, run the development server:

```bash
npm run dev
```
</br>

Second, install packages
1. axios
2. tanstack-query
3. msw(optional)

</br>

## Table of Contents
1. [My Solution](#my-solution)
2. [MSW](#msw)
3. [Mock-data Pros & Cons](#mock-data-pros-and-cons)

</br>

### My Solution
---
1. Add `.env` file, content should be same as testing environment, usually `sit`.
2. In `utils/mock-data-utils.ts`, add `isLocal`, `delay`, `getMockRes`.
    ```Typescript
    import { BaseResponse } from '@/libs/fetcher/fetcher';

    const env = process.env.NODE_ENV;

    export const isLocal = false;
    // export const isLocal = env === 'development'; 

    export const delay = (time = 1) => {
    return new Promise((res) => {
        setTimeout(res, time * 1000);
    });
    };

    /**
    *
    * @param mockData
    * @param time second, default = 1
    * @returns
    */
    export const getMockRes = async <T>(url: string, mockData: BaseResponse<T>, time = 1): Promise<BaseResponse<T>> => {
    await delay(time);
    return new Promise((res) => {
        console.log(`\x1b[1;36m[mock endpoint]:\x1b[1;36m`, url);
        console.log(`\x1b[1;91m[mock response]:\x1b[1;91m`, mockData.data);

        if (mockData.error) {
            rej(mockData); // 若 error 為 true，則回傳 mockData
        } else {
            res(mockData); 
        }
    });
    };

3. Add corresponded api mock-data in `service/food/mock-data.ts` 

4. In `service/food/index.tsx`, implement `isLocal` flag and `mock-data`. Now you can simply switch `isLocal` flag to get mock-data and fetch real apis!!

    ```Typescript
    import { getMockRes, isLocal } from '@/app/utils/mock-data-utils';

    /** Original Method */
    // export const getFood: QueryFunction<GetFoodItemResponse | null, [QueryKey.FOOD, GetFoodItemRequest]> = async ({
    //   queryKey,
    // }) => {
    //   const [, params] = queryKey;
    //   const endpoint = `/food`;
    //   const response = await fetcher(endpoint, {
    //     mode: 'get',
    //     params: generateParams(params),
    //   });

    //   return response.data;
    // };

    /** New Method: add isLocal flag and mock-data */
    export const getFood: QueryFunction<GetFoodItemResponse | null, [QueryKey.FOOD, GetFoodItemRequest]> = async ({
    queryKey,
    }) => {
    const [, params] = queryKey;
    const endpoint = `/food`;
    const response = isLocal
        ? await getMockRes(endpoint, mockFoodItemsResponse)
        : await fetcher(endpoint, {
            mode: 'get',
            params: generateParams(params),
        });

    return response.data;
    };


</br>

### MSW
---
:link: https://mswjs.io/

> MSW (Mock Service Worker) is an API mocking library that allows you to write client-agnostic mocks and reuse them across any frameworks, tools, and environments.

1. Install package -> ```npm install msw@latest --save-dev```
2. Auto generate mock server worker -> ```npx msw init ./public --save``` 
3. In `service/food` folder, create `msw` folder, and add `handler.ts` file. Add mock-data, coresponded apis in `handler.ts` file
4. Create `msw` folder in `libs` folder, and  `woker.ts` file to import all handlers and set global handlers.
5. In `main.tsx`, add `enableMocking` function, and start mock server worker when `isLocal` is true.
6. Now you can simply switch `isLocal` flag to get mock-data and fetch real apis!!





</br>

### Mock-data Pros & Cons
---

#### Pros
1. 跟後端分離：若是後端壞掉的時候，前端仍然可以繼續開發
2. 輕鬆修改 mock-data 內容（如：error 狀態），藉由 mock-data 的回傳內容進行除錯
3. 方便對元件進行測試

#### Cons
1. 需要額外時間寫（不過現在可以叫 AI 工具產生，很方便）
2. 若是 mock-data 之間有相依性，需要花時間設定
3. 小心不要把 isLocal = true 推上 production





