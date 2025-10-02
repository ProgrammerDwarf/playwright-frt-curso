 import { test, expect } from '@playwright/test';

 const REPO = 'playwright-frt-curso';
 const USER = 'ProgrammerDwarf';

 test('Se puede crear un Issue en el repositorio de Github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] reporte algo nuevo',
            body: 'Descripcion del bug',
        }
    });

    expect(newIssue.status()).toBe(201);

     const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
     expect(issues.ok()).toBeTruthy();
     expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] reporte algo nuevo',
        body: 'Descripcion del bug',
     }));
 });
 