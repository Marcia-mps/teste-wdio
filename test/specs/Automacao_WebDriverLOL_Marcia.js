describe('WebDriverLOL - Cadastro e Login ponta a ponta', () => {
    it('deve realizar cadastro e login com sucesso', async () => {
        const email = 'marcia.teste@ebac.com'
        const password = '12345678'

        const clickByText = async (text, timeout = 10000) => {
            const el = await $(`//*[@text="${text}"]`)
            await el.waitForDisplayed({ timeout })
            await el.click()
        }

        const getVisibleInputs = async (expectedCount, timeout = 10000) => {
            const start = Date.now()

            while (Date.now() - start < timeout) {
                const inputs = await $$('//android.widget.EditText')
                const visible = []

                for (const input of inputs) {
                    if (await input.isDisplayed()) {
                        visible.push(input)
                    }
                }

                if (visible.length >= expectedCount) {
                    return visible
                }

                await browser.pause(500)
            }

            throw new Error(`Não encontrei ${expectedCount} campos visíveis a tempo.`)
        }

        // Abre o app
        await driver.activateApp('com.wdiodemoapp')
        await browser.pause(4000)

        // Vai para a tela Login do menu inferior
        await clickByText('Login')
        await browser.pause(1500)

        // Vai para a aba Sign up do formulário
        await clickByText('Sign up')
        await browser.pause(1500)

        // Preenche cadastro usando apenas campos visíveis
        let signUpInputs = await getVisibleInputs(3)
        await signUpInputs[0].setValue(email)
        await signUpInputs[1].setValue(password)
        await signUpInputs[2].setValue(password)

        // Fluxo opcional
        const toggles = await $$('~input-toggle')
        for (const toggle of toggles) {
            if (await toggle.isDisplayed()) {
                await toggle.click()
                break
            }
        }

        // Cadastra
        await clickByText('SIGN UP')
        await browser.pause(1500)

        // Fecha popup de sucesso
        await clickByText('OK')
        await browser.pause(1500)

        // Volta para a aba Login do formulário
        await clickByText('Login')
        await browser.pause(1500)

        // Preenche login usando apenas campos visíveis
        let loginInputs = await getVisibleInputs(2)
        await loginInputs[0].setValue(email)
        await loginInputs[1].setValue(password)

        // Envia login
        await clickByText('LOGIN')
        await browser.pause(2000)

        // Validação final
        const successTexts = [
            'You are logged in!',
            'You are successfully logged in!'
        ]

        let validated = false
        for (const text of successTexts) {
            const els = await $$(`//*[@text="${text}"]`)
            for (const el of els) {
                if (await el.isDisplayed()) {
                    validated = true
                    break
                }
            }
            if (validated) break
        }

        if (!validated) {
            throw new Error('Login final não foi validado na tela.')
        }
    })
})