// === ARQUIVO 3: run.js ===
// Script de demonstração das duas abordagens lado a lado
// Parte 1: UserRepository diretamente (dados brutos)
// Parte 2: UserService (dados formatados)
// Use console.table() para exibir e try/catch em ambas

import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';

// Função principal para demonstrar as abordagens
async function demonstrarAbordagens() {
  console.log('=== PARTE 1: UserRepository diretamente (dados BRUTOS) ===');
  try {
    const repositorio = new UserRepository();
    const usuariosBrutos = await repositorio.getUsers();
    console.table(usuariosBrutos);
    console.log(`\nTotal de usuários brutos: ${usuariosBrutos.length}`);
  } catch (erro) {
    console.error('Erro na Parte 1:', erro.message);
  }

  console.log('\n=== PARTE 2: UserService (dados FORMATADOS: id, name, email) ===');
  try {
    const repositorio = new UserRepository();
    const servico = new UserService(repositorio);
    const usuariosFormatados = await servico.getUsers();
    console.table(usuariosFormatados);
    console.log(`\nTotal de usuários formatados: ${usuariosFormatados.length}`);
  } catch (erro) {
    console.error('Erro na Parte 2:', erro.message);
  }
}

// Executa a demonstração
(async () => {
  await demonstrarAbordagens();
})();

/*
INSTRUÇÕES PARA EXECUTAR:
1. Crie uma pasta e salve os 3 arquivos.
2. Crie package.json com: {"type": "module"}
3. Rode: node run.js (Node.js 18+ com fetch nativo)
*/
