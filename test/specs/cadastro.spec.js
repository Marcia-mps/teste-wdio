describe('Cadastro WebDriverLOL', () => {
    it('Deve realizar cadastro com sucesso', async () => {

        // Abrir aplicação (vamos trocar pelo link correto depois)
        await browser.url('https://webdriver.io');

        // Garantir que a página carregou
        await browser.pause(2000);

    });
});