// PARA EJECUTAR ESTA PRUEBA HAY QUE BORRAR EL AFTER ALL DE LA ANTERIOR 
// ESO HACE QUE EL REPO SE MANTENGA Y PUEDA CREAR EL NUEVO ISSUE
import { test, expect, APIRequestContext } from '@playwright/test';

const REPO:string = 'REPO-LOCO';
const USER:string = 'ProgrammerDwarf';

let apiContext: APIRequestContext;

test.beforeAll( async({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: `https://api.github.com`,
        extraHTTPHeaders: {
            'Accept': 'application/vnd.github+json',
            'Authorization': `token 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`,
        },
    });
});

test.afterAll(async({ }) => {
    await apiContext.dispose();
});

test('El ultimo issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que diga hola el nuevo feat',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.getByRole('link', {name: '[Feature] Que diga hola el nuevo feat'}).first();
    await expect(firstIssue).toHaveText('[Feature] Que diga hola el nuevo feat');
});