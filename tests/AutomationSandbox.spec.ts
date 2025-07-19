import { test, expect } from '@playwright/test';

test.describe('Pruebas UI en el sandbox de FRT', () => {
    test('Hago click en el elemento web', async ({ page }) => {
        await test.step('Voy a la pagina de FRT sandbox', async () => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

        });

        await test.step('Hago clic en el boton de ID dinamico', async () => {
            const botonIDDinamico = page.getByRole('button', {name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto', exact: true}); //FORMA RECOMENDADA DE DECLARAR UN OBJETO LOCATOR
            botonIDDinamico.click();

            //await page.getByRole('button', {name: "Hacé click para generar un ID dinámico y mostrar el elemento oculto", exact: true }).click();  FORMA DE DECLARAR ANTERIOR MENTE 
        })
    });

});