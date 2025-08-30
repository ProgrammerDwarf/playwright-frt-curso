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
    let checkboxesAVerificar: { text: string }[] = [
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

    let radioButtons: { text: string }[] = [
      { text: 'Si' },
      { text: 'No' }
    ];

    await test.step("vamos a la pagina de FRT sandbox", async () => {
      await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/");
    });

    for (const radioButton of radioButtons) {
      const radioButtonLocator: Locator = page.getByRole('radio',
        { name: radioButton.text }
      );

      await test.step("Verificamos que el ambos radio buttons son visibles", async () => {
        await expect(radioButtonLocator, { message: `El rabio button "${radioButton.text}" no es visible` }).toBeVisible();
      });

      await test.step("Validamos que el radio button se puede marcar", async () => {
        if (!(await radioButtonLocator.isChecked())) {
          await radioButtonLocator.check();
        }

        await expect(radioButtonLocator, { message: `El radiobutton "${radioButton.text}" no ha podido marcarse` }).toBeChecked();
      });
    };
  });

  test("Validamos que el dropdown funciona como corresponde", async ({ page }) => {
    const opcionesDeportesEsperadas: string[] = [
        'Seleccioná un deporte',
        'Tennis',
        'Fútbol',
        'Basketball',
      ];

    await test.step('Dado que voy a la pagina de sandbox', async () => {
      await page.goto(`https://thefreerangetester.github.io/sandbox-automation-testing`);
    });

    await test.step("Cuando visualizo el dropdown, valido que las opciones son las esperadas", async () => {
      const dropdownDeportes: Locator = page.getByRole('combobox',
        { name: "Dropdown" }
      );
      const opcionesDeportes: Locator = dropdownDeportes.getByRole('option');
        
      await expect(dropdownDeportes).toBeVisible();
      await expect(opcionesDeportes, `La cantidad esperada es ${opcionesDeportesEsperadas.length} y la cantidad obtenida es ${opcionesDeportes.count()}`).toHaveCount(opcionesDeportesEsperadas.length);
      
      for (const deporte of opcionesDeportesEsperadas) {
        const deporteLocator: Locator = dropdownDeportes.getByRole('option', {name: deporte});
        await expect(deporteLocator).toHaveCount(1);
      };
      //OTRA OPCION QUE VERIFICA QUE AMBAS LISTAS TIENEN EL CONTENIDO QUE SE ESPERA
      // const textoDeOpciones = await page.$$eval('select#formBasicSelect > option', (opciones) =>{
      //   return opciones.map(opcion => opcion.textContent);
      // });

      // //se ordena la lista 
      // const opcionesDeportesEsperadasOrdenados = [...opcionesDeportesEsperadas].sort();
      // const textoDeOpcionesOrdenados = [...textoDeOpciones.sort()];

      // await expect(textoDeOpcionesOrdenados).toEqual(opcionesDeportesEsperadasOrdenados)
    });

    await test.step('Entonces selecciono una opcion y verifico que se mantieen', async () => {
      const dropdownLocator: Locator = page.locator('select#formBasicSelect');
     
      for (const deporte of opcionesDeportesEsperadas){
        await dropdownLocator.selectOption({label: deporte});
        await expect(dropdownLocator.locator('option:checked')).toHaveText(deporte);
      };
    });
    
  });

  test("Verificamos que la lista desplegable de días funciona", async ({ page }) =>{
    await test.step('Dado que voy a la pagina de sandbox', async () => {
      await page.goto(`https://thefreerangetester.github.io/sandbox-automation-testing`);
    });
  
    await test.step('Cuando hacemos clic en el botón ', async () => {
      const dias_dropdown: Locator = page.getByRole('button', { name: 'Día de la semana' });
    });

    await test.step('Y seleccionamos un día de la semana', async () => {
      const diasDropdown: Locator = page.getByRole('button', { name: 'Día de la semana' });
      let diasDeLaSemana: {text: string}[] = [
        {text: 'Lunes'},
        {text: 'Martes'},
        {text: 'Miércoles'},
        {text: 'Jueves'},
        {text: 'Viernes'},
        {text: 'Sábado'},
        {text: 'Domingo'},
      ];
       
      for (const dias of diasDeLaSemana){
        
        await diasDropdown.click();
        
        const diaOpcion: Locator = page.getByRole('link', { name: dias.text });

        await diaOpcion.click();
      };
    });
    
  });

  test("Verificamos el que el pop up se despliega tal cual esperamos", async ({page}) => {
    await test.step('Dado que voy al sandbox de freerangetester', async()=>{
      await page.goto(`https://thefreerangetester.github.io/sandbox-automation-testing/`);
    });

    await test.step('Cuando hago click en el botón', async () => {
      let boton_locator: Locator = page.getByRole('button', { name: 'Mostrar popup' });

      await boton_locator.click();

      let titulo_en_modal: Locator = page.locator('div').filter({ hasText: 'Popup de ejemplo' }).nth(3);
      let mensaje_dentro_modal: Locator = page.getByText('¿Viste? ¡Apareció un Pop-up!')
      let boton_cerrar: Locator = page.getByRole('button', { name: 'Cerrar' });

      await expect(titulo_en_modal).toHaveText('Popup de ejemplo');
      await expect(mensaje_dentro_modal).toHaveText('¿Viste? ¡Apareció un Pop-up!');
      await expect(boton_cerrar).toBeVisible();
      await expect(boton_cerrar).toHaveText('Cerrar');

      await boton_cerrar.click();
    });
    
  });

  test('Verificamos los valores de la tabla estática', async ({ page }) => {
    await test.step('Dado que navego a la página de sandbox de freerangetester', async () => {
      await page.goto(`https://thefreerangetester.github.io/sandbox-automation-testing/`);
    });

    await test.step('Cuando valido los valores de la tabla', async () => {
      const nombresEsperados: string[] = ['Messi', 'Ronaldo', 'Mbappe'];
      const nombresEnTabla: string[] = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)',
        nombres => nombres.map(nombre => nombre.textContent)
       );
      
       expect(nombresEnTabla).toEqual(nombresEsperados);
    });
  });

  test('Verificamos datos en la tabla dinámica', async ({ page }) => {
    await test.step('Dado que navego a la página de sandbox', async () => {
      await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/");
    });
    
    await test.step('Cuando valido los datos de la tabla dinamica', async () => {
      const datosTabla: string[] = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',
        datos => datos.map(dato => dato.textContent) // $$eval sirve para extraer data de un elemento y además le pasamos una función que interacturá con esa data
      );


      await page.reload();

      const datosTablaRefreshed: string[] = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',
        datos => datos.map(dato => dato.textContent)
      );
      
      expect(datosTablaRefreshed).not.toEqual(datosTabla);
    });
    
  })
  
  
});
