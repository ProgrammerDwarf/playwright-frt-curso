import { test, expect, Locator } from "@playwright/test";

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
});
