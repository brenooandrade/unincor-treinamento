https://github.com/brenooandrade/unincor-treinamento

Etapa 1 - Subindo banco de dados:
  - Provisionar instância EC2 na AWS
  - Instalar Docker
  - Subir MySQL via Docker Compose
    https://docs.docker.com/engine/install/ubuntu/ 
    https://docs.docker.com/compose/install/
  - git clone https://github.com/brenooandrade/unincor-treinamento.git
  - docker exec -it 149 bash
  - cd /var/test_db/
  - mysql -u root -p < employees.sql

Etapa 2 - Criando API:
  - Criar AWS credentials (Access Key and Secret Key)
  - Instalar NodeJS/NPM 
  - Instalar framework serverless ->
     npm install -g serverless
     https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/
  - Instalar dependências -> npm install
  - Configurar serverless para apontar para conta AWS desejada -> https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials
    ```serverless config credentials --provider AWS --key AKIAV7VSAXYFXB4ACLYE --secret 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```
  - Testes locais
    ```serverless offline -s dev```
  - Deploy em produção
    ```serverless deploy -s prod```
  - Criar secret key para API

Etapa 3 - Criando aplicação WEB:
  - a. Iniciar project react JS
  ```
  npx create-react-app react-unincor

  # Navegue para o diretório do projeto
  cd react-unincor

  # Instale o Material-UI
  npm install @mui/material @emotion/react @emotion/styled

  # Instale a biblioteca axios para fazer chamadas de API
  npm install axios
  ```

  - b. Estrutura do Projeto:
  ```
  npm install react-router-dom@^6.0.0

  react-spa/
  |-- src/
  |   |-- components/
  |   |   |-- Dashboard.js
  |   |   |-- Departments.js
  |   |   |-- Positions.js
  |   |   |-- Employees.js
  |   |-- services/
  |   |   |-- api.js
  |   |-- App.js
  |   |-- index.js

  ```

Etapa 4 - Publicando no S3:

  a. 
  ```
  npm run build
  ```

  b.
  Abra o AWS S3, crei um novo bucket.
  Depois que seu bucket for criado, selecione-o no painel do S3.
  Vá para a guia “Propriedades” e clique em “Hospedagem de site estático”.
  Escolha a opção “Usar este intervalo para hospedar um site”.
  Defina o “documento de índice” como “index.html” ou o ponto de entrada do seu aplicativo React.
  Opcionalmente, especifique um "documento de erro" para lidar com erros 404.
  Salve a configuração.

  c.
  ```
  Clique em “Política de Bucket” e cole a seguinte política, que permite acesso público ao conteúdo do seu bucket:
  {
      "Versão": "17/10/2012",
      "Declaração": [
          {
              "Sid": "PublicReadGetObject",
              "Efeito": "Permitir",
              "Diretor": "*",
              "Ação": "s3:GetObject",
              "Recurso": "arn:aws:s3:::react-demo-test-breno/*"
          }
      ]
  }
  ```