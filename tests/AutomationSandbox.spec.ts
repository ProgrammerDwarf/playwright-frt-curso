import { test, expect, Locator, Page } from "@playwright/test";

test.describe("Pruebas UI en el sandbox de FRT", () => {
  test("Hago click en el elemento web", async ({ page }) => {
    await test.step("Voy a la pagina de FRT sandbox", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("Hago clic en el boton de ID dinamico", async () => {
      const botonIDDinamico: Locator = page.getByRole("button", {
        name: "Hacé click para generar un ID",
      });
      await botonIDDinamico.click();
      await expect(
        page.getByText("OMG, aparezco después de 3", { exact: false }),
        "El texto no se motró de manera efectiva"
      ).toBeVisible();
    });
  });

  test("Verificamos que el campo de texto esté vacío y puede ser escrito", async ({
    page,
  }) => {
    await test.step("Vamos al Sandbox de FRT", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    await test.step("Ahora, verificamos que el campo de texto esté vacío y es editable", async () => {
      const campoDeTexto = page.getByRole("textbox", {
        name: "Un aburrido texto",
      });
      await expect(campoDeTexto, {
        message: "El campo de texto no está vacío",
      }).toBeEmpty();
      await expect(campoDeTexto, {
        message: "El campo de texto no es editable",
      }).toBeEditable();
    });
  });

  test("Se verfica que los checkbox son visibles, se pueden marcar y desmarcar", async ({
    page,
  }) => {
    let checkboxesAVerificar: {text: string}[]  = [
      { text: "Pizza 🍕" },
      { text: "Hamburguesa 🍔" },
      { text: "Pasta 🍝" },
      { text: "Helado 🍧" },
      { text: "Torta 🍰" },
    ];

    await test.step("Vamos al sandbox de FRT", async () => {
      await page.goto(
        "https://thefreerangetester.github.io/sandbox-automation-testing/"
      );
    });

    for (const checkbox of checkboxesAVerificar) {
      const checkboxLocator: Locator = page.getByRole("checkbox", {
        name: checkbox.text,
      });

      await test.step("Verificar que el checkbox es visible", async () => {
        await expect(checkboxLocator, {
          message: `Este checkbox "${checkbox.text}" no es visible`,
        }).toBeVisible();
      });

      await test.step(`Verificar que el checkbox "${checkbox.text}"puede ser marcado`, async () => {
        if (!(await checkboxLocator.isChecked())) {
          await checkboxLocator.check();
        }
        await expect(checkboxLocator, {
          message: `El checkbox ${checkbox.text} no ha podido ser marcado`,
        }).toBeChecked();
      });

      await test.step(`Verificar que el checkbox ${checkbox.text} puede ser desmarcado`, async () => {
        if (await checkboxLocator.isChecked()) {
          await checkboxLocator.uncheck();
        }
        await expect(checkboxLocator).not.toBeChecked();
      });
    }
  });

  test("Validamos que los radio button pueden ser marcados", async ({
    page,
  }) => {

    let radioButtons: { text: string}[] = [
      { text: 'Si'},
      { text: 'No'}
    ]; 

    await test.step("vamos a la pagina de FRT sandbox", async() => {
      await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/");
    });

    for (const radioButton of radioButtons) {
      const radioButtonLocator: Locator = page.getByRole('radio',
         { name: radioButton.text }
        );

      await test.step("Verificamos que el ambos radio buttons son visibles", async() => {
        await expect(radioButtonLocator, {message: `El rabio button "${radioButton.text}" no es visible`}).toBeVisible();
      });

      await test.step("Validamos que el radio button se puede marcar", async () => {
        if(!(await radioButtonLocator.isChecked())) {
          await radioButtonLocator.check();
        }

        await expect(radioButtonLocator, {message: `El radiobutton "${radioButton.text}" no ha podido marcarse`}).toBeChecked();
      });
    };
  });

  test("Validamos que el dropdown funciona como corresponde", async ({ page }) => {
    await test.step('Dado que voy a la pagina', async () => {
      await page.goto(`https://thefreerangetester.github.io/sandbox-automation-testing`);
    });
    
    await test.step("Entonce seleccionamos un deporte del dropdown", async() => {
      const locator_dropwdown: Locator = page.getByRole('combobox', 
        {name: "Dropdown"}
      );

      // const dropdown_options = [
      //   {text: 'Futbol'},
      //   {text: 'Tennis'},
      //   {text: 'Basketball'},
      // ];

      // for (dd)
      
    await locator_dropwdown.selectOption('Tennis');
    });
  });
});
