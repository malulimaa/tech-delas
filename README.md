# Tech Delas — primeira versão

Site estático para GitHub Pages: página de apresentação, formulário de participação e uma página inicial de conteúdo. A integração do formulário usa Google Apps Script para gravar nome, e-mail e data em uma planilha privada da responsável.

## Arquivos

- `index.html`: apresentação do projeto.
- `cadastro.html`: formulário de entrada.
- `conteudo.html`: página simples após o cadastro.
- `script.js`: valida o formulário e envia os dados. A URL do serviço fica em `REGISTRATION_ENDPOINT`.
- `google-apps-script.gs`: código do endpoint que grava os envios.

## Ativar a lista privada

1. Entre na conta Google em que deseja manter a lista e crie uma planilha nova. Deixe o compartilhamento restrito à sua conta.
2. Copie o ID da planilha: é o trecho entre `/d/` e `/edit` no endereço dela.
3. Na planilha, abra **Extensões → Apps Script**. Cole o conteúdo de `google-apps-script.gs` no editor e troque `COLE_AQUI_O_ID_DA_PLANILHA` pelo ID copiado. Salve.
4. No Apps Script, escolha a função `setup` e clique em **Executar** uma vez para criar a aba e os cabeçalhos. Autorize o script quando solicitado.
5. Clique em **Implantar → Nova implantação → App da web**. Execute como **Eu**. Em “Quem pode acessar”, escolha **Qualquer pessoa** para que visitantes do site possam enviar o formulário sem entrar na conta Google.
6. Copie a URL do App da web que termina em `/exec`.
7. Abra `script.js` e cole essa URL entre as aspas de `REGISTRATION_ENDPOINT`.
8. Publique os arquivos do site no GitHub Pages. Faça um envio de teste e confirme se a linha apareceu na planilha. Se alterar o código Apps Script depois da implantação, edite a implantação para usar a nova versão.

O endpoint recebe envios públicos, mas não oferece uma função pública para ler a planilha. Mantenha a planilha e a conta Google protegidas e confira o acesso periodicamente. A resposta do Apps Script é enviada em modo sem leitura da resposta pelo navegador; após o envio, o site segue para a página de conteúdo. Confirme os testes na planilha antes de usar em uma apresentação.

## Prévia local

Abra `index.html` no navegador. Sem preencher `REGISTRATION_ENDPOINT`, o formulário valida os campos e explica que a integração precisa ser ativada; não finge gravar dados.

## Personalização

Edite textos, cores e cards em `index.html` e `styles.css`. Os cards numéricos foram deixados como eixos do projeto, sem números apresentados como estatísticas. As fontes são carregadas do Google Fonts; o site continua legível com fontes locais se estiver offline.
