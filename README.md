# TODO-river
5. unit test
6. msw pros and cons

## Table of Contents
- [Guide](#guide)
- [Getting Started](#getting-started)
- [A. My Solution](#a-my-solution)
- [B. MSW](#b-msw)
    - [Implement MSW](#implement-msw)
    - [MSW with Vitest](#msw-with-vitest)
    - [Pros & Cons](#pros-and-cons)
- [Mock-data Pros & Cons](#mock-data-pros-and-cons)

## Guide
This is a guide for how to use mock-data in a react project.

## Getting Started

First, run the development server:

```bash
npm run dev
```
</br>

Second, install packages
- axios
- tanstack-query

- (msw)
- (for testing)
    - @testing-library/jest-dom
    - @testing-library/react
    - jsdom
    - vitest



</br>

## A. My Solution

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
</br>

## B. MSW

:link: https://mswjs.io/

> [!NOTE]  
> MSW (Mock Service Worker) is an API mocking library that allows you to write client-agnostic mocks and reuse them across any frameworks, tools, and environments.

</br>

### Implement MSW

1. Install package -> ```npm install msw@latest --save-dev```
2. Auto generate mock server worker -> ```npx msw init ./public --save``` 
3. Create `msw` folder in service, and add `handler.ts` file. Add mock-data, coresponded apis in `handler.ts` file
4. Create `msw` folder in `libs` folder, and  `woker.ts` file to import all handlers and set global handlers.
5. In `main.tsx`, add `enableMocking` function, and start mock server worker when `isLocal` is true.

    ```Typescript
    async function enableMocking() {
       // if in production, do not enable mocking
       if (!isLocal) return;

       const { worker } = await import('./libs/msw/woker.ts');

       return worker.start();
    }



    enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
        <App />
        </StrictMode>
    );
    });
    ```
6. Now you can simply switch `isLocal` flag to get mock-data and fetch real apis!!


</br>

### MSW with Vitest

1. Install testing related packages
2. Create `server.ts` in `msw/libs` to import all handlers and set global handlers.
3. Create `setupTests.ts` in `tests` folder, import module and start mock server worker.
4. Modify `tsconfig.app.json` to include `setupTests.ts`, add `test` config in `vite.config.ts`. Add npm script for testing.
5. Add `home.test.tsx`.
6. Run `npm run test` to see the result.

</br>

### Pros & Cons

#### Pros
1. 方便 mock api 的回傳資料、狀態、header、cookie 等
2. 可以根據不同的 request(query string, body...) 回傳相對應假資料

#### Cons
1. 學習成本
2. 若是沒有要測試、或是設定複雜型態的回傳資料，就不太需要用到





</br>
</br>

## Mock-data Pros & Cons


### Pros
1. 跟後端分離：若是後端壞掉的時候，前端仍然可以繼續開發
2. 輕鬆修改 mock-data 內容（如：error 狀態），藉由 mock-data 的回傳內容進行除錯
3. 方便對元件進行測試

### Cons
1. 需要額外時間寫（不過現在可以叫 AI 工具產生，很方便）
2. 若是 mock-data 之間有相依性，需要花時間設定
3. 小心不要把 isLocal = true 推上 production





