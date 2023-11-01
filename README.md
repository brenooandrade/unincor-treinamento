Etapa 1:
  - Provisionar instância EC2 na AWS
  - Instalar Docker
  - Subir MySQL via Docker Compose
    https://docs.docker.com/engine/install/ubuntu/ 
    https://docs.docker.com/compose/install/
  - git clone https://github.com/brenooandrade/unincor-treinamento.git
  - docker exec -it 149 bash
  - cd /var/test_db/
  - mysql -u root -p < employees.sql

Etapa 2:
  - Criar AWS credentials (Access Key and Secret Key)
  - Instalar NodeJS/NPM
  - Instalar framework serverless -> https://www.serverless.com/framework/docs/providers/aws/cli-reference/create/
  - Instalar dependências -> npm install
  - Configurar serverless para apontar para conta AWS desejada -> https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials
    ```serverless config credentials --provider AWS --key XXXXXX --secret XXXXXXX```
  - Testes locais
    ```serverless offline -s dev```
  - Deploy em produção
    ```serverless deploy -s prod```
