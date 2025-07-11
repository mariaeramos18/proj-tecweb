/**
 * Classe Calcado para gerenciamento de estoque de calçados
 */
class Calcado {
    constructor() {
        this.codigo = '';          // Código do calçado
        this.modelo = '';          // Modelo/descrição
        this.cor = '';             // Cor do calçado
        this.tamanho = 0;          // Tamanho numérico
        this.quantidade = 0;       // Quantidade em estoque (atributo numérico)
    }

    /**
     * Cadastra todos os atributos do calçado
     */
    cadastrar(codigo, modelo, cor, tamanho, quantidade) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.cor = cor;
        this.tamanho = Number(tamanho);
        this.quantidade = Number(quantidade);
        this._salvar();
    }

    /**
     * Adiciona quantidade ao estoque
     */
    adicionarEstoque(qtde) {
        qtde = Number(qtde);
        if (isNaN(qtde) || qtde <= 0) {
            throw new Error('Quantidade inválida para adição');
        }
        this.quantidade += qtde;
        this._salvar();
        return this.quantidade;
    }

    /**
     * Remove quantidade do estoque
     */
    removerEstoque(qtde) {
        qtde = Number(qtde);
        if (isNaN(qtde)) {
            throw new Error('Quantidade inválida');
        }
        if (qtde <= 0) {
            throw new Error('Quantidade deve ser positiva');
        }
        if (qtde > this.quantidade) {
            throw new Error('Quantidade indisponível em estoque');
        }
        this.quantidade -= qtde;
        this._salvar();
        return this.quantidade;
    }

    /**
     * Retorna os dados do calçado
     */
    obterDados() {
        this._carregar();
        return this;
    }

    /**
     * Limpa os dados da sessão
     */
    limparDados() {
        sessionStorage.removeItem('calcado');
        this.codigo = '';
        this.modelo = '';
        this.cor = '';
        this.tamanho = 0;
        this.quantidade = 0;
    }

    // Método privado para salvar na sessão
    _salvar() {
        const dados = {
            codigo: this.codigo,
            modelo: this.modelo,
            cor: this.cor,
            tamanho: this.tamanho,
            quantidade: this.quantidade
        };
        sessionStorage.setItem('calcado', JSON.stringify(dados));
    }

    // Método privado para carregar da sessão
    _carregar() {
        const dados = sessionStorage.getItem('calcado');
        if (dados) {
            const obj = JSON.parse(dados);
            this.codigo = obj.codigo || '';
            this.modelo = obj.modelo || '';
            this.cor = obj.cor || '';
            this.tamanho = Number(obj.tamanho) || 0;
            this.quantidade = Number(obj.quantidade) || 0;
        }
        return this;
    }
}