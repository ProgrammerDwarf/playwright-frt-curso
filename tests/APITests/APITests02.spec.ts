 import { test, expect, } from '@playwright/test';

 const REPO = 'REPO-LOCO';
 const USER = 'ProgrammerDwarf';

 const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

 test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
 })
 
 test('Se puede crear un Issue en el repositorio de Github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] reporte algo nuevo',
            body: 'Descripcion del bug',
        }
    });

    expect(newIssue.status()).toBe(201);

    await sleep(3000);

     const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
     expect(issues.ok()).toBeTruthy();
     expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] reporte algo nuevo',
        body: 'Descripcion del bug',
     }));
 });

//  test.afterAll(async ({ request }) => {
//     const response = await request.delete(`/repos/${USER}/${REPO}`);
//     expect(response.ok()).toBeTruthy();
//  });
 
 